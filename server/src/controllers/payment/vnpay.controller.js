/* eslint-disable vars-on-top */
/* eslint-disable operator-linebreak */
/* eslint-disable global-require */
/* eslint-disable quotes */
/* eslint-disable no-var */
/* eslint-disable computed-property-spacing */

const PaymentReceipt = require("../../models/PaymentReceipt.model");

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

  const paymentReceipt = new PaymentReceipt({
    _account: req.uid,
    membershipPackage: req.body.membershipPackage,
    monthsPurchase: req.body.monthsPurchase,
    method: "vnpay",
    vnpayTransaction: vnp_Params
  });

  console.log("[MESSAGE]: createPaymentUrl -> paymentReceipt", paymentReceipt);

  await paymentReceipt.save();

  // Neu muon dung Redirect thi dong dong ben duoi
  res.status(200).json({ code: "00", data: vnpUrl });
  // Neu muon dung Redirect thi mo dong ben duoi va dong dong ben tren
  // res.redirect(vnpUrl)
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


    if (secureHash === checkSum) {
      const orderId = vnp_Params.vnp_TxnRef;
      const rspCode = vnp_Params.vnp_ResponseCode;
      const vnpayTransaction = await PaymentReceipt.findOneAndUpdate(
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
      // Kiem tra du lieu co hop le khong, cap nhat trang thai don hang va gui ket qua cho VNPAY theo dinh dang duoi

      if (!vnpayTransaction) {
        return res
          .status(200)
          .json({ RspCode: "91", Message: "Transaction not found!" });
      }

      if (vnpayTransaction && rspCode === "00") {
        await PaymentReceipt.updateOne(
          { "vnpayTransaction.vnp_TxnRef": orderId },
          { isPurchased: true }
        );
        return res.status(200).json({ RspCode: "00", Message: "success" });
      }
    }
    
    return res.status(200).json({ RspCode: "97", Message: "Fail checksum" });

  } catch (error) {
    console.log("[ERROR]:", error);
    return res.status(200).json({ RspCode: "99", Message: "Error Exception" });
  }
};

module.exports = {
  createPaymentUrl,
  vnpayReturn,
  vpnIpn
};
