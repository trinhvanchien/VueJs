/**
 * Controller package for project
 * author: Sky Albert
 * updater: ___
 * date up: 26/06/2019
 * date to: ___
 * team: BE-RHP
 */
const MembershipPackage = require( "../models/MembershipPackage.model" );

module.exports = {
  "addMember": async ( req, res ) => {
    let { member } = req.body,
      currentPackageInfo = await MembershipPackage.findOne( { "_id": req.params.id } ),
      packageInfo = await MembershipPackage.findOne( { "members": member } );

    if ( packageInfo ) {
      packageInfo.members.pull( member );
      await packageInfo.save();
    }
    currentPackageInfo.members.push( member );
    await currentPackageInfo.save();

    res.status( 200 ).json( { "status": "success", "data": currentPackageInfo } );
  },
  "create": async ( req, res ) => {
    // Handle creator
    req.body._creator = req.uid;

    const newPackage = new MembershipPackage( req.body );

    await newPackage.save();

    res.status( 201 ).json( { "status": "success", "data": newPackage } );
  },
  "delete": async ( req, res ) => {
    // Check if don't use query
    if ( req.query._id === undefined || req.query._id.length === 0 ) {
      return res.status( 403 ).json( { "status": "fail", "_id": "Vui lòng cung cấp query _id để xác thực gói thành viên muốn xóa!" } );
    }

    const packageInfo = await MembershipPackage.findOne( { "_id": req.query._id } );

    // Check error
    if ( !packageInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Gói thành viên không tồn tại!" } );
    }

    // Remove package
    await packageInfo.remove();
    res.status( 200 ).json( { "status": "success", "data": null } );
  },
  "index": async ( req, res ) => {
    let dataResponse = null;

    if ( req.query._id ) {
      dataResponse = await MembershipPackage.findOne( { "_id": req.query._id } ).populate( { "path": "members", "select": "name email phone" } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await MembershipPackage.find( {} ).populate( { "path": "members", "select": "name email phone" } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": dataResponse } );

  },
  "isExist": async ( req, res ) => {
    const packageInfo = await MembershipPackage.findOne( { "members": req.params.id } ).lean();

    if ( !packageInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Tài khoản chưa được xét duyệt gói thành viên." } );
    }

    res.status( 200 ).json( { "status": "success", "data": packageInfo } );
  },
  "update": async ( req, res ) => {
    const packageInfo = await MembershipPackage.findOne( { "_id": req.query._id } );

    // Check error
    if ( !packageInfo ) {
      return res.status( 404 ).json( { "status": "error", "message": "Gói thành viên không tồn tại!" } );
    }

    // Handle totalMembership
    req.body.totalMembership = req.body.members.length;

    // Handle _editor
    req.body._editor = req.uid;

    res.status( 200 ).json( { "status": "success", "data": await MembershipPackage.findByIdAndUpdate( req.query._id, { "$set": req.body }, { "new": true } ) } );
  }
};
