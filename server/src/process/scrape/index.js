/* eslint-disable one-var */
const io = require( "socket.io" );
const server = io.listen( process.env.PORT_SCRAPE_SOCKET );

const ScrapeServer = require( ".././../models/ScrapeServer.model" );

const startScrapeSocket = async () => {
  // Clean before start
  await ScrapeServer.deleteMany( {} );
  
  server.on( "connection", ( socket ) => {
    console.info(
      "[SCRAPE SERVER][SOCKET] A scrape server has CONNECTED"
    );
  
    socket.on( "scrape-server-info", async ( data ) => {
      const connectSession = {
        "session_id": socket.id,
        "name": data.name,
        "url": data.url
      };
  
      await new ScrapeServer( connectSession ).save();
      console.log( "[SCRAPE SERVER][SOCKET] Infomation:", connectSession );
    } );
  
    socket.on( "disconnect", async() => {
      await ScrapeServer.deleteOne( { "session_id": socket.id } );
      console.info(
        "[SCRAPE SERVER][SOCKET] Scrape server has DISCONNECTED"
      );
    } );
  } );
};


const init = () => {
  startScrapeSocket();
};

init();
