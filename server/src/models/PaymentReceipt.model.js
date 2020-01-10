const mongoose = require( "mongoose" );
const Schema = mongoose.Schema;

PaymentReceiptSchema = new Schema( {
  _account: {
    type: Schema.Types.ObjectId,
    ref: "Account"
  },
  membershipPackage: String,
  monthsPurchase: Number,
  method: {
    type: String,
    enum: [ "vnpay", "bankTransfer" ]
  },
  isPurchased: {
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now()
  },
  vnpayTransaction: {
    vnp_Version: String,
    vnp_Command: String,
    vnp_TmnCode: String,
    vnp_Locale: String,
    vnp_CurrCode: String,
    vnp_TxnRef: String, // Order ID
    vnp_OrderInfo: String,
    vnp_OrderType: String,
    vnp_Amount: Number,
    vnp_ReturnUrl: String,
    vnp_IpAddr: String,
    vnp_CreateDate: String,
    vnp_SecureHashType: String,
    vnp_SecureHash: String,
    vnp_BankCode: String,
    vnp_BankTranNo: String,
    vnp_CardType: String,
    vnp_PayDate: String,
    vnp_TransactionNo: String,
    vnp_ResponseCode: String
  }
  
} );

const PaymentReceipt = mongoose.model( "PaymentReceipt", PaymentReceiptSchema );

module.exports = PaymentReceipt;
