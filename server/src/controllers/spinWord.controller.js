/**
 * Controller photo library category for project
 * author: Le khang
 * updater: ___
 * date up: 23/09/2019
 * date to: ___
 * team: BE-RHP
 */
const SpinWord = require( "../models/SpinWord.model" );
const jsonResponse = require( "../configs/response" );

module.exports = {
  "create": async ( req, res ) => {
    let newSpinWord;

    // check validate
    if ( req.body.name === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tên chủ đề không được bỏ trống!" } } );
    }

    // handle crete mongo
    newSpinWord = await new SpinWord( {
      "name": req.body.name,
      "key": req.body.key,
      "theme": req.body.theme
    } );

    // Save mongodb
    await newSpinWord.save();

    res.status( 200 ).json( jsonResponse( "success", newSpinWord ) );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await SpinWord.findOne( { "_id": req.query._id } ).populate( { "path": "theme", "select": "_id name description" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await SpinWord.find( {} ).populate( { "path": "theme", "select": "_id name description" } ).lean();
    }

    res.status( 200 ).json( jsonResponse( "success", dataResponse ) );
  },
  "update": async ( req, res ) => {
    // Check validator
    if ( req.body.title === "" ) {
      return res.status( 403 ).json( { "status": "fail", "data": { "title": "Tên chủ đề không được bỏ trống!" } } );
    }

    const findSpinWord = await SpinWord.findOne( { "_id": req.query._id } );

    // Check catch when update post categories
    if ( !findSpinWord ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chủ đề không tồn tại!" } );
    }

    res.status( 201 ).json( jsonResponse( "success", await SpinWord.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) ) );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query ID để xác thực chủ đề muốn xóa!" } );
    }

    const spinWordInfo = await SpinWord.findOne( { "_id": req.query._id } );

    // Check error
    if ( !spinWordInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Chủ đề không tồn tại!" } );
    }

    // Remove package
    await spinWordInfo.remove();
    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "getWordByKey": async( req, res ) => {
    let wordInfo, dataResponse;

    wordInfo = await SpinWord.findOne( { "_id": req.body._id } ).populate( { "path": "theme", "select": "_id name description" } ).lean();
    dataResponse = await SpinWord.find( { "key": req.body.key } ).populate( { "path": "theme", "select": "_id name description" } ).lean();
    
    console.log( wordInfo );
    console.log( dataResponse );
    
    if ( !wordInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Tên từ khóa không tồn tại" } );
    }

    if ( dataResponse ) {
      return res.status( 201 ).json( jsonResponse( "success", dataResponse ) );
    }
  }
};
