/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PhotoLibrarySchema = new Schema( {
    "name": String,
    "url": String,
    "attribute": Array,
    "numberOfClick": {
      "type": Number,
      "default": 0
    },
    "numberOfCursor": {
      "type": Number,
      "default": 0
    },
    "_category": {
      "type": Schema.Types.ObjectId,
      "ref": "PhotoLibraryCategory"
    },
    "isAvailable": [ {
      "type": Schema.Types.ObjectId,
      "ref": "MembershipPackage"
    } ],
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

PhotoLibrarySchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const PhotoLibrary = mongoose.model( "PhotoLibrary", PhotoLibrarySchema );

module.exports = PhotoLibrary;
