const router = require("express-promise-router")();
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const vnpayController = require("../../controllers/payment/vnpay.controller");


router.route("/vnpay/create-payment-url").post(auth, vnpayController.createPaymentUrl);
router.route("/vnpay/vnpay-return").get(vnpayController.vnpayReturn);
router.route("/vnpay/vnpay-ipn").get(vnpayController.vpnIpn);
router.route("/vnpay/payment-history").post(auth, vnpayController.paymentHistory);

module.exports = router;
