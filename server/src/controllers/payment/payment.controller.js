/* eslint-disable no-unused-vars */
const PaymentReceipt = require("../../models/PaymentReceipt.model");
const Account = require("../../models/Account.model");
const MembershipPackage = require("../../models/MembershipPackage.model");
const Server = require("../../models/Server.model");
const { updateUserSync } = require("../../microservices/synchronize/account");

const paymentHistory = async (req, res) => {
  try {
    // req.body._account: id của người dùng.
    if (!req.body._account) {
      return res.status(400).json({
        status: "Bad request",
        message: "Không có user id."
      });
    }

    let currentPage = req.body.currentPage;

    if (!currentPage) {
      return res.status(400).json({
        status: "fail",
        message:
          "Thiếu số thứ tự của trang hiện tại bạn muốn duyệt. Trang hiện tại phải là số nguyên và lớn hơn 0."
      });
    }

    let pageSize = req.body.pageSize;

    if (!pageSize) {
      return res.status(400).json({
        status: "fail",
        message: "Thiếu số kết quả bạn muốn hiển thị mỗi trang."
      });
    }

    let pageSkipped = (currentPage - 1) * pageSize;

    if (pageSkipped < 0) {
      return res.status(400).json({
        status: "fail",
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
        status: "fail",
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
    console.log("[MESSAGE]: paymentHistory -> error", error);
    return res.status(500).json({
      status: "fail",
      message: "Server đang gặp trục trặc. Xin vui lòng thử lại sau."
    });
  }
};

module.exports = {
  paymentHistory
};
