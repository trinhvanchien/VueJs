/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MembershipPackageSchema = new Schema( {
    "name": String,
    "limit": {
      "posts": {
        "type": Number,
        "default": 1
      },
      "campaigns": {
        "type": Number,
        "default": 0
      }
    },
    "totalMembership": {
      "type": Number,
      "default": 0
    },
    "members": [ {
      "type": Schema.Types.ObjectId,
      "ref": "Account"
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

MembershipPackageSchema.pre( "save", function( next ) {
  this.updatedAt = Date.now();
  next();
} );

const MembershipPackage = mongoose.model( "MembershipPackage", MembershipPackageSchema );

module.exports = MembershipPackage;
