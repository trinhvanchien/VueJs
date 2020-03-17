import Api from "@/services";

export default {
  index() {
    return Api().get("spin-theme");
  },
  create(data) {
    return Api().post("spin-theme/create", data);
  },
  getById(spinId) {
    return Api().get(`spin-theme/detail/${spinId}`);
  },
  update(spinId, data) {
    return Api().patch(`spin-theme/update/${spinId}`, data);
  },
  delete(spinId) {
    return Api().delete(`spin-theme/delete/${spinId}`);
  },
  indexOptions(data) {
    console.log("index option", data);
    return Api().post("spin-theme/index-options", data);
  }
};
