import Api from "@/services";

export default {
  index() {
    return Api().get("photo-library");
  },
  create(data) {
    return Api().post("photo-library", data);
  },
  delete(id) {
    return Api().delete(`photo-library?_id=${id}`);
  },
  update(id, data) {
    return Api().patch(`photo-library?_id=${id}`, data);
  },
  upload(files) {
    return Api().post("photo-library/upload", files);
  },
  show(id) {
    return Api().get(`photo-library?_id=${id}`);
  }
};
