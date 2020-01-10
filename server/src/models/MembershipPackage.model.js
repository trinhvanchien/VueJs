/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MembershipPackageSchema = new Schema( {
    "name": String,
    "limit": {
      "post": {
        "type": Number,
        "default": 0
      },
      "campaign": {
        "type": Number,
        "default": 0
      },
      "slot": {
        "type": Number,
        "default": 1
      }
    },
    "price": {
      "one": {
        // giá gốc
        "original": {
          "type": Number,
          "default": 0
        },
        // giá khuyến mãi
        "promotional": {
          "type": Number,
          "default": 0
        }
      },
      "three": {
        // giá gốc
        "original": {
          "type": Number,
          "default": 0
        },
        // giá khuyến mãi
        "promotional": {
          "type": Number,
          "default": 0
        }
      },
      "six": {
        // giá gốc
        "original": {
          "type": Number,
          "default": 0
        },
        // giá khuyến mãi
        "promotional": {
          "type": Number,
          "default": 0
        }
      },
      "twelve": {
        // giá gốc
        "original": {
          "type": Number,
          "default": 0
        },
        // giá khuyến mãi
        "promotional": {
          "type": Number,
          "default": 0
        }
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
