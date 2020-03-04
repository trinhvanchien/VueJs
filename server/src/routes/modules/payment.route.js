const router = require("express-promise-router")();
const auth = require( "../../helpers/middleware/authenticate.middleware" );
const vnpayController = require("../../controllers/payment/vnpay.controller");
const paymentController = require("../../controllers/payment/payment.controller");

router.route("/vnpay/create-payment-url").post(auth, vnpayController.createPaymentUrl);
router.route("/vnpay/vnpay-return").get(vnpayController.vnpayReturn);
router.route("/vnpay/vnpay-ipn").get(vnpayController.vpnIpn);

router.route("/payment-history").post(auth, paymentController.paymentHistory);
router.route("/start-free-trial").post(auth, paymentController.startFreeTrial);

module.exports = router;
