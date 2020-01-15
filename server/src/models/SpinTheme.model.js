/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  SpinThemeSchema = new Schema( {
    "name": String,
    "description": String,
    "_creator": {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
    },
    "createdAt": {
      "type": Date,
      "default": Date.now()
    },
    "updatedAt": Date
  } );

SpinThemeSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const SpinTheme = mongoose.model( "SpinTheme", SpinThemeSchema );

module.exports = SpinTheme;
