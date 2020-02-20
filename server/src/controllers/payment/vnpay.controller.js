/* eslint-disable vars-on-top */
/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
/* eslint-disable quotes */
/* eslint-disable no-var */
/* eslint-disable computed-property-spacing */

const PaymentReceipt = require("../../models/PaymentReceipt.model");
const Account = require("../../models/Account.model");
const MembershipPackage = require("../../models/MembershipPackage.model");
const Server = require("../../models/Server.model");
const { updateUserSync } = require("../../microservices/synchronize/account");

const sortObject = (o) => {
  var sorted = {},
    key,
    a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
};

const createPaymentUrl = async (req, res) => {
  try {
    console.log("[MESSAGE]: createPaymentUrl -> req", req.body);
    var ipAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    var dateFormat = require("dateformat");

    var tmnCode = process.env.VNP_TMNCODE;
    var secretKey = process.env.VNP_HASHSECRET;
    var vnpUrl = process.env.VNP_URL;
    var returnUrl = process.env.VNP_RETURNURL;

    var date = new Date();

    var createDate = dateFormat(date, "yyyymmddHHmmss");
    var orderId = dateFormat(date, "HHmmss");
    var amount = req.body.amount;
    var bankCode = req.body.bankCode;

    var orderInfo = req.body.orderDescription;
    var orderType = req.body.orderType;
    var locale = req.body.language;

    if (locale === null || locale === "") {
      locale = "vn";
    }
    var currCode = "VND";
    var vnp_Params = {};

    vnp_Params.vnp_Version = "2";
    vnp_Params.vnp_Command = "pay";
    vnp_Params.vnp_TmnCode = tmnCode;
    // vnp_Params['vnp_Merchant'] = ''
    vnp_Params.vnp_Locale = locale;
    vnp_Params.vnp_CurrCode = currCode;
    vnp_Params.vnp_TxnRef = orderId;
    vnp_Params.vnp_OrderInfo = orderInfo;
    vnp_Params.vnp_OrderType = orderType;
    vnp_Params.vnp_Amount = amount * 100;
    vnp_Params.vnp_ReturnUrl = returnUrl;
    vnp_Params.vnp_IpAddr = ipAddr;
    vnp_Params.vnp_CreateDate = createDate;
    if (bankCode !== null && bankCode !== "") {
      vnp_Params.vnp_BankCode = bankCode;
    }

    vnp_Params = sortObject(vnp_Params);

    var querystring = require("qs");
    var signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    var sha256 = require("sha256");

    var secureHash = sha256(signData);

    vnp_Params.vnp_SecureHashType = "SHA256";
    vnp_Params.vnp_SecureHash = secureHash;
    vnpUrl += `?${querystring.stringify(vnp_Params, { encode: true })}`;

    const { purchaseInfo } = req.body;

    const paymentReceipt = new PaymentReceipt({
      _account: req.uid,
      amount: req.body.amount,
      purchaseInfo: {
        purchaseType: purchaseInfo.type,
        membershipPackage: purchaseInfo.membershipPackage
          ? purchaseInfo.membershipPackage
          : undefined,
        monthsPurchase: purchaseInfo.monthsPurchase
          ? purchaseInfo.monthsPurchase
          : undefined,
        postsPurchase: purchaseInfo.postsPurchase
          ? purchaseInfo.postsPurchase
          : undefined,
        postsPurchaseExpireDay: purchaseInfo.postsPurchaseExpireDay
          ? purchaseInfo.postsPurchaseExpireDay
          : undefined
      },
      method: "vnpay",
      vnpayTransaction: vnp_Params
    });

    await paymentReceipt.save();

    const monthsSubscriptionQuery = await MembershipPackage.findOne({
      codeId: purchaseInfo.membershipPackage
    });

    if (purchaseInfo.type === "subscription") {
      const monthsSubscription = [
        {
          title: "one",
          value: 1
        },
        {
          title: "three",
          value: 3
        },
        {
          title: "six",
          value: 6
        },
        {
          title: "twelve",
          value: 12
        }
      ];

      const monthSubscriptionToPurchase = monthsSubscription.find(
        (month) => month.value === purchaseInfo.monthsPurchase
      );

      if (!monthSubscriptionToPurchase) {
        return res
          .status(200)
          .json({ RspCode: "99", Message: "Invalid subscription" });
      }

      const isPriceValid =
        monthsSubscriptionQuery.price[monthSubscriptionToPurchase.title]
          .promotional === req.body.amount;

      if (!isPriceValid) {
        return res
          .status(200)
          .json({ RspCode: "99", Message: "Invalid price" });
      }
    }

    if (purchaseInfo.type === "additionalPost") {
      const calculatedPrice =
        purchaseInfo.postsPurchase * monthsSubscriptionQuery.postPrice;

      console.log('[MESSAGE]: createPaymentUrl -> monthsSubscriptionQuery.postPrice', monthsSubscriptionQuery.postPrice);

      console.log('[MESSAGE]: createPaymentUrl -> calculatedPrice', calculatedPrice);

      const isPriceValid = calculatedPrice === req.body.amount;

      if (!isPriceValid) {
        return res
          .status(200)
          .json({ RspCode: "99", Message: "Invalid price" });
      }
    }

    return res.status(200).json({ code: "00", data: vnpUrl });
  } catch (error) {
    console.log("[ERROR]:", error);
    return res.status(200).json({ RspCode: "99", Message: "Unknow error" });
  }
};

const vnpayReturn = async (req, res) => {
  var vnp_Params = req.query;

  var secureHash = vnp_Params.vnp_SecureHash;

  delete vnp_Params.vnp_SecureHash;
  delete vnp_Params.vnp_SecureHashType;

  vnp_Params = sortObject(vnp_Params);

  var config = require("config");
  var tmnCode = config.get("vnp_TmnCode");
  var secretKey = config.get("vnp_HashSecret");

  var querystring = require("qs");
  var signData =
    secretKey + querystring.stringify(vnp_Params, { encode: false });

  var sha256 = require("sha256");

  var checkSum = sha256(signData);

  if (secureHash === checkSum) {
    // Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua

    res.render("success", { code: vnp_Params.vnp_ResponseCode });
  } else {
    res.render("success", { code: "97" });
  }
};

const vpnIpn = async (req, res) => {
  try {
    var vnp_Params = req.query;

    console.log("[MESSAGE]: vpnIpn -> vnp_Params", vnp_Params);
    var secureHash = vnp_Params.vnp_SecureHash;

    delete vnp_Params.vnp_SecureHash;
    delete vnp_Params.vnp_SecureHashType;

    vnp_Params = sortObject(vnp_Params);

    var secretKey = process.env.VNP_HASHSECRET;
    var querystring = require("qs");
    var signData =
      secretKey + querystring.stringify(vnp_Params, { encode: false });

    var sha256 = require("sha256");

    var checkSum = sha256(signData);

    const orderId = vnp_Params.vnp_TxnRef;
    const rspCode = vnp_Params.vnp_ResponseCode;
    const amount = vnp_Params.vnp_Amount;

    console.log("rspCode", rspCode);

    let returnContent = {
      RspCode: "",
      Message: ""
    };

    if (process.env.APP_MOCK === "enabled") {
      const transaction = await PaymentReceipt.findOne({
        "vnpayTransaction.vnp_TxnRef": orderId
      });

      console.log("[MESSAGE]: vpnIpn -> transaction", transaction);

      const userAccount = await Account.findOne({
        _id: transaction._account
      }).select("expireDate maxAccountFb membershipPackage");

      const membershipPackage = await MembershipPackage.findOne({
        codeId: transaction.purchaseInfo.membershipPackage
      });

      if (transaction) {
        await PaymentReceipt.updateOne(
          { "vnpayTransaction.vnp_TxnRef": orderId },
          { isPurchased: "success" }
        );

        let updatedAccount = {};

        if (transaction.purchaseInfo.purchaseType === "subscription") {
          updatedAccount = await Account.findOneAndUpdate(
            {
              _id: transaction._account
            },
            {
              status: true,
              maxAccountFb: membershipPackage.maxAccountFb,
              membershipPackage: transaction.purchaseInfo.membershipPackage,
              expireDate: new Date(userAccount.expireDate).setMonth(
                new Date(userAccount.expireDate).getMonth() +
                  transaction.purchaseInfo.monthsPurchase
              ),
              limitPostPerDay: membershipPackage.limit.post,
              totalPostedToday: 0
            },
            { new: true }
          )
            .select(
              "status maxAccountFb membershipPackage expireDate limitPostPerDay totalPostedToday"
            )
            .lean();
        }
        if (transaction.purchaseInfo.purchaseType === "additionalPost") {
          updatedAccount = await Account.findOneAndUpdate(
            {
              _id: transaction._account
            },
            {
              $push: {
                remainingAdditionalPost: {
                  quantity: transaction.purchaseInfo.postsPurchase,
                  expireDate: new Date().setDate(
                    new Date().getDate() +
                      transaction.purchaseInfo.postsPurchaseExpireDay
                  )
                }
              }
            },
            { new: true }
          )
            .select("remainingAdditionalPost")
            .lean();
        }

        const vpsContainServer = await Server.findOne({
          userAmount: userAccount._id
        })
          .select("info")
          .lean();

        try {
          await updateUserSync(
            `${vpsContainServer.info.domainServer}:${vpsContainServer.info.serverPort}`,
            updatedAccount
          );
        } catch (error) {
          console.log("[ERROR]:", error.response.data);
          returnContent = { RspCode: "99", Message: "Unknow error" };
          return res.status(200).json(returnContent);
        }

        returnContent = { RspCode: "00", Message: "Confirm Success" };
        console.log("[MESSAGE]: returnContent", returnContent);
        return res.status(200).json(returnContent);
      }
      returnContent = { RspCode: "01", Message: "Order not found" };
      console.log("[MESSAGE]: returnContent", returnContent);
      return res.status(200).json(returnContent);
    }

    if (rspCode == "24") {
      returnContent = { RspCode: "00", Message: "Confirm Success" };
      console.log("[MESSAGE]: returnContent", returnContent);
      return res.status(200).json(returnContent);
    }

    if (secureHash === checkSum) {
      const transaction = await PaymentReceipt.findOneAndUpdate(
        { "vnpayTransaction.vnp_TxnRef": orderId },
        {
          "vnpayTransaction.vnp_BankCode": vnp_Params.vnp_BankCode,
          "vnpayTransaction.vnp_BankTranNo": vnp_Params.vnp_BankTranNo,
          "vnpayTransaction.vnp_CardType": vnp_Params.vnp_CardType,
          "vnpayTransaction.vnp_PayDate": vnp_Params.vnp_PayDate,
          "vnpayTransaction.vnp_TransactionNo": vnp_Params.vnp_TransactionNo,
          "vnpayTransaction.vnp_ResponseCode": rspCode
        }
      );

      const userAccount = await Account.findOne({
        _id: transaction._account
      }).select("expireDate maxAccountFb membershipPackage");

      const membershipPackage = await MembershipPackage.findOne({
        codeId: transaction.membershipPackage
      });

      // Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi

      if (transaction && transaction.vnpayTransaction.vnp_Amount != amount) {
        returnContent = { RspCode: "04", Message: "Invalid amount" };
        console.log("[MESSAGE]: returnContent", returnContent);
        return res.status(200).json(returnContent);
      }

      if (transaction) {
        if (transaction.isPurchased === "pending") {
          if (rspCode === "00") {
            await PaymentReceipt.updateOne(
              { "vnpayTransaction.vnp_TxnRef": orderId },
              { isPurchased: "success" }
            );
            // TODO: function update expire for user
            let infoToUpdate = {
              status: true,
              maxAccountFb: membershipPackage.membershipPackage,
              membershipPackage: transaction.membershipPackage,
              expireDate: new Date(userAccount.expireDate).setMonth(
                new Date(userAccount.expireDate).getMonth() +
                  transaction.monthsPurchase
              )
            };

            await Account.updateOne(
              {
                _id: transaction._account
              },
              infoToUpdate
            );

            const syncData = {
              id: transaction._account,
              info: infoToUpdate
            };

            const vpsContainServer = await Server.findOne({
              userAmount: userAccount._id
            })
              .select("info")
              .lean();

            try {
              await updateUserSync(
                `${vpsContainServer.info.domainServer}:${vpsContainServer.info.serverPort}`,
                syncData
              );
            } catch (error) {
              console.log("[ERROR]:", error.response.data);
              returnContent = { RspCode: "99", Message: "Unknow error" };
              console.log("[MESSAGE]: returnContent", returnContent);
              return res.status(200).json(returnContent);
            }
          } else {
            await PaymentReceipt.updateOne(
              { "vnpayTransaction.vnp_TxnRef": orderId },
              { isPurchased: "fail" }
            );
          }
          returnContent = { RspCode: "00", Message: "Confirm Success" };
          console.log("[MESSAGE]: returnContent", returnContent);
          return res.status(200).json(returnContent);
        }
        returnContent = { RspCode: "02", Message: "Order already confirmed" };
        console.log("[MESSAGE]: returnContent", returnContent);
        return res.status(200).json(returnContent);
      }
      returnContent = { RspCode: "01", Message: "Order not found" };
      console.log("[MESSAGE]: returnContent", returnContent);

      return res.status(200).json(returnContent);
    }
    returnContent = { RspCode: "97", Message: "Fail checksum" };
    console.log("[MESSAGE]: returnContent", returnContent);
    return res.status(200).json(returnContent);
  } catch (error) {
    console.log("[ERROR]:", error);
    returnContent = { RspCode: "99", Message: "Unknow error" };
    console.log("[MESSAGE]: returnContent", returnContent);
    return res.status(200).json(returnContent);
  }
};

module.exports = {
  createPaymentUrl,
  vnpayReturn,
  vpnIpn
};
