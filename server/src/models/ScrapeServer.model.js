const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  ScrapeServerSchema = new Schema( {
    "session_id": String,
    "name": String,
    "url": String,
    "connected_at": {
      "type": Date,
      "default": Date.now()
    }
  } );

ScrapeServerSchema.pre( "save", function( next ) {
  next();
} );

/* eslint-disable one-var */
const ScrapeServer = mongoose.model( "ScrapeServer", ScrapeServerSchema );

module.exports = ScrapeServer;
