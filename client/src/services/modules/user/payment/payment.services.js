import Api from "@/services";
export default {
  startFreeTrial() {
    return Api().post("/payment/start-free-trial");
  }
};
