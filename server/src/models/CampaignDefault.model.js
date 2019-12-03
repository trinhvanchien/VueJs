/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  CampaignExampleSchema = new Schema( {
    "title": String,
    "description": String,
    "totalDay": Number,
    "postCategory": {
      "morning": {
        "type": Schema.Types.ObjectId,
        "ref": "PostCategory"
      },
      "night": {
        "type": Schema.Types.ObjectId,
        "ref": "PostCategory"
      }
    },
    "mix": {
      "open": {
        "type": Schema.Types.ObjectId,
        "ref": "PostCategory"
      },
      "close": {
        "type": Schema.Types.ObjectId,
        "ref": "PostCategory"
      }
    },
    "_editor": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "created_at": {
      "type": Date,
      "default": Date.now()
    },
    "updated_at": Date
  } );

CampaignExampleSchema.pre( "save", function( next ) {
  this.updated_at = Date.now();
  next();
} );

const CampaignExample = mongoose.model( "CampaignExample", CampaignExampleSchema );

module.exports = CampaignExample;
