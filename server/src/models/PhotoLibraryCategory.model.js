/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  PhotoLibraryCategorySchema = new Schema( {
    "name": String,
    "totalPhotos": {
      "type": Number,
      "default": 0
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

PhotoLibraryCategorySchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const PhotoLibraryCategory = mongoose.model( "PhotoLibraryCategory", PhotoLibraryCategorySchema );

module.exports = PhotoLibraryCategory;
