/**
 * Controller package for project
 * author: Sky Albert
 * updater: ___
 * date up: 26/06/2019
 * date to: ___
 * team: BE-RHP
 */
const MembershipPackage = require( "../models/MembershipPackage.model" );
const Account = require( "../models/Account.model" );

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
    } else if ( req.query.member ) {
      dataResponse = await MembershipPackage.findOne( { "members": req.query.member } ).populate( { "path": "members", "select": "name email phone" } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).lean();
    } else if ( Object.entries( req.query ).length === 0 && req.query.constructor === Object ) {
      dataResponse = await MembershipPackage.find( {} ).populate( { "path": "members", "select": "name email phone" } ).populate( { "path": "_creator", "select": "_id name" } ).populate( { "path": "_editor", "select": "_id name" } ).lean();
    }

    res.status( 200 ).json( { "status": "success", "data": dataResponse } );

  },
  "isExist": async ( req, res ) => {
    const packageInfo = await MembershipPackage.findOne( { "members": req.params.id } ).lean();

    if ( !packageInfo ) {
      // Create package
      const packageDefaultInfo = ( await MembershipPackage.find( {} ) )[ 0 ];

      packageDefaultInfo.members = req.params.id;
      await packageDefaultInfo.save();

      return res.status( 200 ).json( { "status": "success", "data": packageDefaultInfo } );
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
  },
  /**
   * @description: Sử dụng hàm để thêm thành viên vào gói tài khoản, hàm này chỉ sử dụng chạy trên postman và chỉ sử dụng 1 lần đối với các thành viên cũ sử dụng trước đó.
   * @param req là ID của gói cần để add thành viên
   * @param res trả về thông báo thành công hoặc thất bại
   * @returns {Promise<void>}
   */
  "addMemberToPackage": async ( req, res ) => {
    try {
      let accounts, exist, packageInfo, listAccount;

      accounts = await Account.find( {} ).select( "_id name" ).lean();
      packageInfo = await MembershipPackage.findOne( { "_id": req.params.id } ).lean();
      exist = packageInfo.members;
      
      listAccount = accounts.map( ( item ) => {
        return item._id;
      } );
      
      const users = listAccount.filter( ( x ) => !exist.includes( x ) ),
        newUser = exist.concat( users );

      // const arr = new Set( newUser );
      // packageInfo.members = Array.from( arr );
      
      packageInfo.members = [ ...new Set( newUser ) ];

      await MembershipPackage.findByIdAndUpdate( req.params.id, { "$set": packageInfo }, { "new": true } );

      res.status( 200 ).json( { "status": "success", "message": "Lấy dữ liệu thành công ..." } );
    } catch ( e ) {
      console.log( e );
      res.status( 200 ).json( { "status": "error", "message": "Xảy ra lỗi trong quá trình xử lý dữ liệu" } );
    }
  },
  /**
   * @description Hàm này được sử dụng để thêm thuộc tính giá cho những gói tài khoản tạo trước đó. Hàm chỉ sử dụng 1 lần.
   * @param req là id của gói được tạo trước đó cần thêm giá vào gói
   * @param res trả về thông báo thành công hoặc thất bại
   * @returns {Promise<void>}
   */
  "addPriceByPackage": async ( req, res ) => {
    try {
      let packageInfo;
      
      packageInfo = await MembershipPackage.findOne( { "_id": req.params.id } ).lean();
      
      packageInfo.price = {
        "one": { "original": 0, "promotional": 0 },
        "three": { "original": 0, "promotional": 0 },
        "six": { "original": 0, "promotional": 0 },
        "twelve": { "original": 0, "promotional": 0 }
      };

      await MembershipPackage.findByIdAndUpdate( req.params.id, { "$set": packageInfo }, { "new": true } );

      res.status( 200 ).json( { "status": "success", "message": "Thêm giá cho gói tài khoản thành công" } );
    } catch ( e ) {
      console.log( e );
      res.status( 200 ).json( { "status": "error", "message": "Xảy ra lỗi trong quá trình xử lý dữ liệu" } );
    }
  }
};
