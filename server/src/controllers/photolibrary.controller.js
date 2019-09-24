/**
 * Controller photo library for project
 * author: Sky Albert
 * updater: ___
 * date up: 23/09/2019
 * date to: ___
 * team: BE-RHP
 */
const PhotoLibrary = require( "../models/PhotoLibrary.model" );
const PhotoLibraryCategory = require( "../models/PhotoLibraryCategory.model" );

module.exports = {
  "create": async ( req, res ) => {
    // Handle creator
    req.body._creator = req.uid;

    const newPhotoLibrary = new PhotoLibrary( req.body ),
      categoryInfo = await PhotoLibraryCategory.findOne( { "_id": req.body._category } );

    categoryInfo.totalPhotos = categoryInfo.totalPhotos + 1;
    await categoryInfo.save();
    await newPhotoLibrary.save();

    res.status( 201 ).json( { "status": "success", "data": newPhotoLibrary } );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực ảnh muốn xóa!" } );
    }

    const photoInfo = await PhotoLibrary.findOne( { "_id": req.query._id } ),
      categoryInfo = await PhotoLibraryCategory.findOne( { "_id": photoInfo._category } );

    // Check error
    if ( !photoInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Ảnh không tồn tại!" } );
    }

    categoryInfo.totalPhotos = categoryInfo.totalPhotos - 1;
    // Remove package
    await photoInfo.remove();
    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await PhotoLibrary.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PhotoLibrary.find( {} ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": dataResponse } );

  },
  "update": async ( req, res ) => {
    const photoInfo = await PhotoLibrary.findOne( { "_id": req.query._id } ),
      categoryInfo = await PhotoLibraryCategory.findOne( { "_id": photoInfo._category } ),
      newCategoryInfo = await PhotoLibraryCategory.findOne( { "_id": req.body._category } );

    // Check error
    if ( !photoInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Ảnh không tồn tại!" } );
    }

    // Handle _editor
    categoryInfo.totalPhotos = categoryInfo.totalPhotos - 1;
    await categoryInfo.save();
    newCategoryInfo.totalPhotos = newCategoryInfo.totalPhotos + 1;
    await newCategoryInfo.save();
    req.body._editor = req.uid;

    res.status( 200 ).json( { "status": "success", "data": await PhotoLibrary.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) } );
  },
  "upload": async ( req, res ) => {
    if ( !req.files || req.files.length === 0 ) {
      return res
        .status( 403 )
        .json( {
          "status": "fail",
          "photos": "Không có ảnh upload, vui lòng kiểm tra lại!"
        } );
    }
    const attachmentList = req.files.map( ( file ) => {
      if ( file.fieldname === "attachments" && file.mimetype.includes( "image" ) ) {
        return `${process.env.APP_URL}:${
          process.env.PORT_BASE
        }/${file.path.replace( /\\/gi, "/" )}`;
      }
    } );

    return res.status( 200 ).json( { "status": "success", "data": attachmentList } );
  }
};
