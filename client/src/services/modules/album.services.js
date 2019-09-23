import Api from "@/services";

export default {
  index() {
    return Api().get("album");
  },
  create(data) {
    return Api().post("album", data);
  },
  delete(id) {
    return Api().delete(`album?_id=${id}`);
  },
  update(id, data) {
    return Api().patch(`album?_id=${id}`, data);
  },
  show(id) {
    return Api().get(`album?_id=${id}`);
  }
};
