/* eslint-disable no-unused-vars */
const PaymentReceipt = require("../../models/PaymentReceipt.model");
const Account = require("../../models/Account.model");
const MembershipPackage = require("../../models/MembershipPackage.model");
const Server = require("../../models/Server.model");
const { updateUserSync } = require("../../microservices/synchronize/account");

const startFreeTrial = async (req, res) => {
  try {
    const isAlreadyUsedFreeTrial = await PaymentReceipt.findOne({
      _account: req.uid,
      "purchaseInfo.membershipPackage": "trial"
    });

    if (isAlreadyUsedFreeTrial) {
      return res.status(400).json({
        status: "error",
        message: "Bạn đã sử dụng gói dùng thử, vui lòng nâng cấp gói tài khoản."
      });
    }


    const membershipPackage = await MembershipPackage.findOne({
      codeId: "trial"
    });

    const updatedAccount = await Account.findOneAndUpdate(
      {
        _id: req.uid
      },
      {
        status: true,
        maxAccountFb: membershipPackage.maxAccountFb,
        membershipPackage: "trial",
        expireDate: new Date().setDate(new Date().getDate() + 7),
        limitPostPerDay: membershipPackage.limit.post,
        totalPostedToday: 0,
        permission: membershipPackage.permission
      },
      { new: true }
    )
      .select(
        "status maxAccountFb membershipPackage expireDate limitPostPerDay totalPostedToday permission"
      )
      .lean();

    const paymentReceipt = new PaymentReceipt({
      _account: req.uid,
      amount: 0,
      isPurchased: "success",
      purchaseInfo: {
        purchaseType: "subscription",
        membershipPackage: "trial"
      }
    });
  
    await paymentReceipt.save();

    const vpsContainServer = await Server.findOne({
      userAmount: req.uid
    })
      .select("info")
      .lean();

    try {
      const massoSyncUrl = `${vpsContainServer.info.domainServer}:${vpsContainServer.info.serverPort}`;

      await updateUserSync(massoSyncUrl, updatedAccount);

      return res.status(200).json({
        status: "success",
        message: "Kích hoạt dùng thử thành công!"
      });
    } catch (error) {
      if (error && error.response && error.response.data) {
        console.log("[ERROR]:", error.response.data);
      } else {
        console.log("[ERROR]:", error);
      }
      return res.status(400).json({
        status: "error",
        message: "Có lỗi xảy ra!"
      });
    }
  } catch (error) {
    console.log("[ERROR]:", error);
    return res.status(400).json({
      status: "error",
      message: "Có lỗi xảy ra!"
    });
  }
};

const paymentHistory = async (req, res) => {
  try {
    // req.body._account: id của người dùng.
    if (!req.body._account) {
      return res.status(400).json({
        status: "error",
        message: "Không có user id."
      });
    }

    let currentPage = req.body.currentPage;

    if (!currentPage) {
      return res.status(400).json({
        status: "error",
        message:
          "Thiếu số thứ tự của trang hiện tại bạn muốn duyệt. Trang hiện tại phải là số nguyên và lớn hơn 0."
      });
    }

    let pageSize = req.body.pageSize;

    if (!pageSize) {
      return res.status(400).json({
        status: "error",
        message: "Thiếu số kết quả bạn muốn hiển thị mỗi trang."
      });
    }

    let pageSkipped = (currentPage - 1) * pageSize;

    if (pageSkipped < 0) {
      return res.status(400).json({
        status: "error",
        message: "Không thể nhảy tới trang có giá trị âm."
      });
    }

    const returnData = await PaymentReceipt.find({
      _account: req.body._account,
      isPurchased: "success"
    })
      .select("-vnpayTransaction")
      .skip(pageSkipped)
      .limit(pageSize)
      .lean();

    if (returnData.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Không tìm thấy thông tin người dùng!"
      });
    }

    const entryCount = await PaymentReceipt.count({
      _account: req.body._account,
      isPurchased: "success"
    });

    return res.status(200).json({
      status: "success",
      data: returnData,
      currentPage: currentPage,
      totalPages: Math.ceil(entryCount / pageSize)
    });
  } catch (error) {
    console.log("[ERROR]:", error);
    return res.status(400).json({
      status: "error",
      message: "Server đang gặp trục trặc. Xin vui lòng thử lại sau."
    });
  }
};

module.exports = {
  startFreeTrial,
  paymentHistory
};
