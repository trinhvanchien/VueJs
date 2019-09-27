/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PostSlotLogSchema = new Schema( {
    "resultID": {
      "type": String,
      "default": "None"
    },
    "owner": Object,
    "postInfo": Object,
    "message": String,
    "status": {
      "type": Number,
      "default": 1 // 1 - Success, 2 - Error
    },
    "timeInfo": {
      "date": Date,
      "day": Number,
      "hour": String
    },
    "serverInfo": {
      "domain": String
    },
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_editor": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "createdAt": {
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date
  } );

PostSlotLogSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const PostSlotLog = mongoose.model( "PostSlotLog", PostSlotLogSchema );

module.exports = PostSlotLog;
