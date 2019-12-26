const router = require("express-promise-router")();
const vnpayController = require("../../controllers/payment/vnpay.controller");


router.route("/vnpay/create-payment-url").post(vnpayController.createPaymentUrl);
router.route("/vnpay/vnpay-return").get(vnpayController.vnpayReturn);
router.route("/vnpay/vnpay-ipn").post(vnpayController.vpnIpn);

module.exports = router;
