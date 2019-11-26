/* eslint-disable one-var */
const io = require( "socket.io" );
const server = io.listen( process.env.PORT_SOCKET );

const ScrapeServer = require( ".././../models/ScrapeServer.model" );
const PostServer = require( ".././../models/PostServer.model" );

const startSocket = async () => {
  // Clean before start
  await ScrapeServer.deleteMany( {} );
  await PostServer.deleteMany( {} );

  server.on( "connection", ( socket ) => {
    socket.on( "server-info", async ( data ) => {
      if ( data.server_type === "scrape" ) {
        console.info(
          "[SOCKET][SCRAPE SERVER] A scrape server has CONNECTED"
        );
        const connectSession = {
          "session_id": socket.id,
          "name": data.name,
          "url": data.url
        };

        await new ScrapeServer( connectSession ).save();
        console.log( "[SOCKET][SCRAPE SERVER] Infomation:", connectSession );

        socket.on( "disconnect", async () => {
          await ScrapeServer.deleteOne( { "session_id": socket.id } );
          console.info(
            `[SOCKET][SCRAPE SERVER] A server with session ${socket.id} has DISCONNECTED`
          );
        } );
      }
      
      if ( data.server_type === "post" ) {
        console.info(
          "[SOCKET][POST SERVER] A post server has CONNECTED"
        );
        const connectSession = {
          "session_id": socket.id,
          "name": data.name,
          "uid": data.uid
        };

        await new PostServer( connectSession ).save();
        console.log( "[SOCKET][POST SERVER] Infomation:", connectSession );

        socket.on( "disconnect", async () => {
          await PostServer.deleteOne( { "session_id": socket.id } );
          console.info(
            `[SOCKET][POST SERVER] A server with session ${socket.id} has DISCONNECTED`
          );
        } );
      }

    } );

  } );
};


const init = () => {
  startSocket();
};

init();
