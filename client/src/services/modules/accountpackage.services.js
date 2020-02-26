import Api from "@/services";
export default {
  index() {
    return Api().get("membership/package");
  },
  addMember(id, data) {
    return Api().post(`membership/package/${id}/member`, data);
  },
  create(data) {
    return Api().post("membership/package", data);
  },
  delete(id) {
    return Api().delete(`membership/package?_id=${id}`);
  },
  update(id, data) {
    return Api().patch(`membership/package?_id=${id}`, data);
  },
  show(id) {
    return Api().get(`membership/package?_id=${id}`);
  },
  getPostPrice() {
    return Api().get("membership/package/post-price");
  }
};
