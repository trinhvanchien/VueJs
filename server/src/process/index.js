// Require module process
require( "./socket" );

const Role = require( "../models/Role.model" );
const Help = require( "../models/help/Help.model" );
const Product = require( "../models/market/Product.model" );
const MarketPost = require( "../models/market/products/post.model" );
const MembershipPackage = require("../models/MembershipPackage.model");

( async () => {
  const foundHelp = await Help.find( { "name": "help_homepage" } ),
    foundRole = await Role.find( {} ),
    collaboratorsInfo = await Role.findOne( { "level": "Collaborator" } ),
    agency = await Role.findOne( { "level": "Agency" } );

  // Check Role First Time Server running
  if ( foundRole.length === undefined || foundRole.length === 0 ) {
    const arr = [
      { "level": "SuperAdmin" },
      { "level": "Admin" },
      { "level": "Member" }
    ];

    await Role.insertMany( arr );
    console.log( "Create role successfully!" );
  }

  // Check Collaborators exists right way?
  if ( !collaboratorsInfo ) {
    const newRole = new Role( { "level": "Collaborator" } );

    await newRole.save();
  }

  // Check agency exists right way?
  if ( !agency ) {
    const newRole = new Role( { "level": "Agency" } );

    await newRole.save();
  }

  // Check Help First Time Server running
  if ( foundHelp.length === undefined || foundHelp.length === 0 ) {
    const defaultHelp = await new Help( { "name": "help_homepage" } );

    await defaultHelp.save();
  }

  let foundProduct = await Product.find( {} );

  await Promise.all(
    foundProduct.map(async (product) => {
      await MarketPost.findByIdAndUpdate(
        { _id: product.content },
        { $set: { assign: true } },
        { new: true }
      );
    })
  );

  const membershipPackageQuery = await MembershipPackage.findOne({});

  if (!membershipPackageQuery) {
    const defaultMembershipPackageList = [
      {
        codeId: "free",
        name: "Miễn phí",
        maxAccountFb: 1,
        permission: [
          "post_page",
          "limited_post_per_day",
          "unlimited_page"
        ],
        limit: {
          post: 10,
          campaign: 0,
          slot: 1
        },
        postPrice: 5000,
        price: {
          one: {
            title: 1,
            original: 0,
            promotional: 0
          },
          three: {
            title: 3,
            original: 0,
            promotional: 0
          },
          six: {
            title: 6,
            original: 0,
            promotional: 0
          },
          twelve: {
            title: 12,
            original: 0,
            promotional: 0
          }
        }
      },
      {
        codeId: "page_care",
        name: "Page Care",
        maxAccountFb: 2,
        permission: [
          "post_page",
          "limited_post_per_day",
          "limited_campaign",
          "unlimited_page",
          "customer_support"
        ],
        limit: {
          post: 50,
          campaign: 2,
          slot: 1
        },
        postPrice: 5000,
        price: {
          one: {
            title: 1,
            original: 120000,
            promotional: 120000
          },
          three: {
            title: 3,
            original: 360000,
            promotional: 290000
          },
          six: {
            title: 6,
            original: 720000,
            promotional: 590000
          },
          twelve: {
            title: 12,
            original: 1440000,
            promotional: 990000
          }
        }
      },
      {
        codeId: "pro",
        name: "Pro",
        maxAccountFb: 10,
        permission: [
          "post_page",
          "post_group",
          "post_profile",
          "limited_post_per_day",
          "limited_campaign",
          "unlimited_group",
          "unlimited_page",
          "customer_support",
          "hoot_university"
        ],
        limit: {
          post: 100,
          campaign: 10,
          slot: 1
        },
        postPrice: 10000,
        price: {
          one: {
            title: 1,
            original: 240000,
            promotional: 190000
          },
          three: {
            title: 3,
            original: 480000,
            promotional: 390000
          },
          six: {
            title: 6,
            original: 960000,
            promotional: 890000
          },
          twelve: {
            title: 12,
            original: 1920000,
            promotional: 1690000
          }
        }
      },
      {
        codeId: "vip",
        name: "VIP",
        maxAccountFb: 20,
        permission: [
          "post_page",
          "post_group",
          "post_profile",
          "unlimited_post_per_day",
          "unlimited_campaign",
          "unlimited_group",
          "unlimited_page",
          "customer_support",
          "hoot_university"
        ],
        limit: {
          post: 100,
          campaign: 10,
          slot: 1
        },
        postPrice: 10000,
        price: {
          one: {
            title: 1,
            original: 240000,
            promotional: 190000
          },
          three: {
            title: 3,
            original: 480000,
            promotional: 390000
          },
          six: {
            title: 6,
            original: 960000,
            promotional: 890000
          },
          twelve: {
            title: 12,
            original: 1920000,
            promotional: 1690000
          }
        }
      }

    ];

    await MembershipPackage.insertMany(defaultMembershipPackageList);
  }
})();
