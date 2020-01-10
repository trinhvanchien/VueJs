import Api from "@/services";
export default {
  createPaymentUrl(data) {
    return Api().post("/payment/vnpay/create-payment-url", data);
  }
};
