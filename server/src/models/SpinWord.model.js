/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  SpinWordSchema = new Schema( {
    "name": String,
    "key": String,
    "theme": {
      "type": Schema.Types.ObjectId,
      "ref": "SpinTheme"
    },
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

SpinWordSchema.index({ name: 1, key: 1 });

SpinWordSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const SpinTheme = mongoose.model( "SpinWord", SpinWordSchema );

module.exports = SpinTheme;
