import Api from "@/services";

export default {
  index() {
    return Api().get("spin-theme");
  },
  create(data) {
    return Api().post("spin-theme", data);
  },
  getById(spinId) {
    return Api().get(`spin-theme/detail?_id=${spinId}`);
  },
  update(spinId, data) {
    return Api().patch(`spin-theme?_id=${spinId}`, data);
  },
  delete(spinId) {
    return Api().delete(`spin-theme?_id=${spinId}`);
  },
  indexOptions(data) {
    return Api().post("spin-theme/indexOptions", data);
  }
};
