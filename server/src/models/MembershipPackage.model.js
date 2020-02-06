/* eslint-disable one-var */
/* eslint-disable camelcase */
const mongoose = require( "mongoose" ),
  Schema = mongoose.Schema,

  MembershipPackageSchema = new Schema( {
    "codeId": String,
    "name": String,
    "maxAccountFb": { // nếu thêm có thể gây xung đột với max account của tài khoản khi tạo ( mặc định là 2 ).
      "type": Number,
      "default": 1
    },
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
        "title": {
          "type": Number,
          "default": 1
        },
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
        "title": {
          "type": Number,
          "default": 3
        },
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
        "title": {
          "type": Number,
          "default": 6
        },
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
        "title": {
          "type": Number,
          "default": 12
        },
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
