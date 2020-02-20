/**
 * Controller package for project
 * author: Sky Albert
 * updater: ___
 * date up: 26/06/2019
 * date to: ___
 * team: BE-RHP
 */
const MembershipPackage = require("../models/MembershipPackage.model");
const Account = require("../models/Account.model");

module.exports = {
  addMember: async (req, res) => {
    const { id } = req.params;
    const { member } = req.body;
    const currentPackageInfo = await MembershipPackage.findOne({ _id: id });

    await Account.updateOne(
      { _id: member },
      { membershipPackage: currentPackageInfo.codeId }
    );
    res.status(200).json({ status: "success", data: "Thêm thành công" });
  },
  create: async (req, res) => {
    // Handle creator
    req.body._creator = req.uid;

    const newPackage = new MembershipPackage(req.body);

    await newPackage.save();

    res.status(201).json({ status: "success", data: newPackage });
  },
  delete: async (req, res) => {
    // Check if don't use query
    if (req.query._id === undefined || req.query._id.length === 0) {
      return res.status(403).json({
        status: "fail",
        _id: "Vui lòng cung cấp query _id để xác thực gói thành viên muốn xóa!"
      });
    }

    const packageInfo = await MembershipPackage.findOne({ _id: req.query._id });

    // Check error
    if (!packageInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Gói thành viên không tồn tại!" });
    }

    // Remove package
    await packageInfo.remove();
    res.status(200).json({ status: "success", data: null });
  },
  index: async (req, res) => {
    try {
      if (req.query.codeId || req.query._id) {
        const { _id } = req.query;
        let { codeId } = req.query;
        let allAccountInPackage = null;
        let packageDetail = null;

        if (codeId) {
          packageDetail = await MembershipPackage.findOne({
            codeId: codeId
          }).lean();
        }

        if (_id) {
          packageDetail = await MembershipPackage.findOne({ _id: _id }).lean();
          codeId = packageDetail.codeId;
        }

        allAccountInPackage = await Account.find({
          membershipPackage: codeId
        })
          .select("_id name email phone")
          .lean();

        if (codeId === "free") {
          allAccountInPackage = await Account.find({
            $or: [
              {
                membershipPackage: codeId
              },
              {
                membershipPackage: undefined
              }
            ]
          })
            .select("_id name email phone")
            .lean();
        }

        result = { ...packageDetail, members: allAccountInPackage };

        return res.status(200).json({ status: "success", data: result });
      }
      if (req.query.member) {
        const accountId = req.query.member;
        const { membershipPackage } = await Account.findOne({
          _id: accountId
        }).select("membershipPackage");

        const result = await MembershipPackage.findOne({
          codeId: membershipPackage
        }).select("codeId name price maxAccountFb limit permission");

        return res.status(200).json({ status: "success", data: result });
      }

      if (
        Object.entries(req.query).length === 0 && req.query.constructor === Object
      ) {
        const dataResponse = await MembershipPackage.find({})
          .populate({ path: "members", select: "name email phone" })
          .populate({ path: "_creator", select: "_id name" })
          .populate({ path: "_editor", select: "_id name" })
          .lean();

        return res.status(200).json({ status: "success", data: dataResponse });
      }
    } catch (error) {
      console.log("[MESSAGE]: error", error);
      res.status(400).json({ status: "success", message: "Có lỗi xảy ra!" });
    }
  },
  isExist: async (req, res) => {
    const packageInfo = await MembershipPackage.findOne({
      members: req.params.id
    }).lean();

    if (!packageInfo) {
      // Create package
      const packageDefaultInfo = (await MembershipPackage.find({}))[ 0 ];

      packageDefaultInfo.members = req.params.id;
      await packageDefaultInfo.save();

      return res
        .status(200)
        .json({ status: "success", data: packageDefaultInfo });
    }

    res.status(200).json({ status: "success", data: packageInfo });
  },
  update: async (req, res) => {
    const packageInfo = await MembershipPackage.findOne({ _id: req.query._id });

    // Check error
    if (!packageInfo) {
      return res
        .status(404)
        .json({ status: "error", message: "Gói thành viên không tồn tại!" });
    }

    // Handle totalMembership
    req.body.totalMembership = req.body.members.length;

    // Handle _editor
    req.body._editor = req.uid;

    res.status(200).json({
      status: "success",
      data: await MembershipPackage.findByIdAndUpdate(
        req.query._id,
        { $set: req.body },
        { new: true }
      )
    });
  },
  /**
   * @description: Sử dụng hàm để thêm thành viên vào gói tài khoản, hàm này chỉ sử dụng chạy trên postman và chỉ sử dụng 1 lần đối với các thành viên cũ sử dụng trước đó.
   * @param req là ID của gói cần để add thành viên
   * @param res trả về thông báo thành công hoặc thất bại
   * @returns {Promise<void>}
   */
  addMemberToPackage: async (req, res) => {
    try {
      let accounts, exist, packageInfo, listAccount;

      accounts = await Account.find({})
        .select("_id name")
        .lean();
      packageInfo = await MembershipPackage.findOne({
        _id: req.params.id
      }).lean();
      exist = packageInfo.members;

      listAccount = accounts.map((item) => {
        return item._id;
      });

      const users = listAccount.filter((x) => !exist.includes(x)),
        newUser = exist.concat(users);

      packageInfo.members = [ ...new Set(newUser) ];

      await MembershipPackage.findByIdAndUpdate(
        req.params.id,
        { $set: packageInfo },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        message: "Thêm tài khoản vào gói thành công!"
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: "error",
        message: "Xảy ra lỗi trong quá trình xử lý dữ liệu"
      });
    }
  },
  /**
   * @description Hàm này được sử dụng để thêm thuộc tính giá cho những gói tài khoản tạo trước đó. Hàm chỉ sử dụng 1 lần.
   * @param req là id của gói được tạo trước đó cần thêm giá vào gói
   * @param res trả về thông báo thành công hoặc thất bại
   * @returns {Promise<void>}
   */
  addPriceByPackage: async (req, res) => {
    try {
      let packageInfo;

      packageInfo = await MembershipPackage.findOne({
        _id: req.params.id
      }).lean();

      packageInfo.price = {
        one: { title: 1, original: 0, promotional: 0 },
        three: { title: 3, original: 0, promotional: 0 },
        six: { title: 6, original: 0, promotional: 0 },
        twelve: { title: 12, original: 0, promotional: 0 }
      };

      await MembershipPackage.findByIdAndUpdate(
        req.params.id,
        { $set: packageInfo },
        { new: true }
      );

      res.status(200).json({
        status: "success",
        message: "Thêm giá cho gói tài khoản thành công"
      });
    } catch (e) {
      console.log(e);
      res.status(200).json({
        status: "error",
        message: "Xảy ra lỗi trong quá trình xử lý dữ liệu"
      });
    }
  },
  getPostprice: async (req, res) => {
    try {
      const userAccount = await Account.findOne({ _id: req.uid }).select("membershipPackage");

      const { postPrice } = await MembershipPackage.findOne({ codeId: userAccount.membershipPackage }).select("postPrice");
  
      return res.status(200).json( { "status": "success", "data": { postPrice } } );
    } catch (error) {
      return res.status(200).json( { "status": "success", "message": "Có lỗi xảy ra!" } );
    }

  }
  
};
