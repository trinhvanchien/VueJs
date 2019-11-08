import Api from "@/services";

export default {
  accountStatistics() {
    return Api().post("statistic/account");
  }
};
