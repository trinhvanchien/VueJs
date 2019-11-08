/**
 * Controller post slot log for project
 * author: Sky Albert
 * updater: ___
 * date up: 25/09/2019
 * date to: ___
 * team: BE-RHP
 */
const PostSlotLog = require( "../models/PostSlotLog.model" );

module.exports = {
  "create": async ( req, res ) => {
    // Handle creator
    req.body._creator = req.uid;
    const newPostSlotLog = new PostSlotLog( req.body );

    await newPostSlotLog.save();
    res.status( 201 ).json( { "status": "success", "data": newPostSlotLog } );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực." } );
    }

    const postSlotLogInfo = await PostSlotLog.findOne( { "_id": req.query._id } );

    // Remove package
    await postSlotLogInfo.remove();
    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await PostSlotLog.findOne( { "_id": req.query._id } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await PostSlotLog.find( {} ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": dataResponse } );

  },
  "update": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực." } );
    }

    await PostSlotLog.updateOne( { "_id": req.query._id }, req.body, ( err ) => {
      if ( err ) {
        res.status( 404 ).json( { "status": "error", "message": "Xảy ra lỗi trong quá trình cập nhật... Vui lòng thử lại!" } );
      }
    } );

    res.status( 200 ).json( { "status": "success", "data": await PostSlotLog.findOne( { "_id": req.query._id } ).lean() } );
  }
};
