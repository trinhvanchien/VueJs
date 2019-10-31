import Api from "@/services";

export default {
  index() {
    return Api().get("album/category");
  },
  create(data) {
    return Api().post("album/category", data);
  },
  delete(id) {
    return Api().delete(`album/category?_id=${id}`);
  },
  getPhoto(id) {
    return Api().get(`album/category/${id}/bz`);
  },
  update(id, data) {
    return Api().patch(`album/category?_id=${id}`, data);
  },
  show(id) {
    return Api().get(`album/category?_id=${id}`);
  }
};
