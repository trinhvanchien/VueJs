/**
 * Controller photo library category for project
 * author: Sky Albert
 * updater: ___
 * date up: 23/09/2019
 * date to: ___
 * team: BE-RHP
 */
const MembershipPackage = require( "../models/MembershipPackage.model" );
const PhotoLibrary = require( "../models/PhotoLibrary.model" );
const PhotoLibraryCategory = require( "../models/PhotoLibraryCategory.model" );

module.exports = {
  "create": async ( req, res ) => {
    // Handle creator
    req.body._creator = req.uid;

    const newCategory = new PhotoLibraryCategory( req.body );

    await newCategory.save();

    res.status( 201 ).json( { "status": "success", "data": newCategory } );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực danh mục ảnh muốn xóa!" } );
    }

    const categoryInfo = await PhotoLibraryCategory.findOne( { "_id": req.query._id } );

    // Check error
    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục ảnh này không tồn tại!" } );
    }

    // Remove photo library
    await categoryInfo.remove();
    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await PhotoLibraryCategory.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PhotoLibraryCategory.find( {} ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": dataResponse } );

  },
  "getPhotoLibraryByUser": async ( req, res ) => {
    try {
      const membershipPackageInfo = await MembershipPackage.findOne( { "members": req.uid } ).lean(),
        photoList = await PhotoLibrary.find( { "isAvailable": membershipPackageInfo._id, "_category": req.params.id } );

      return res.status( 200 ).json( { "status": "success", "data": photoList } );
    } catch ( e ) {
      return res.status( 404 ).json( { "status": "error", "message": e } );
    }
  },
  "update": async ( req, res ) => {
    const categoryInfo = await PhotoLibraryCategory.findOne( { "_id": req.query._id } );

    // Check error
    if ( !categoryInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Danh mục ảnh này không tồn tại!" } );
    }

    // Handle _editor
    req.body._editor = req.uid;

    res.status( 200 ).json( { "status": "success", "data": await PhotoLibraryCategory.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) } );
  }
};
