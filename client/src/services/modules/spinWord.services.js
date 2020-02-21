import Api from "@/services";

export default {
  index() {
    return Api().get("spin-word");
  },
  create(data) {
    return Api().post("spin-word", data);
  },
  getById(wordId) {
    return Api().get(`spin-word/detail?_id=${wordId}`);
  },
  delete(wordId) {
    return Api().delete(`spin-word?_id=${wordId}`);
  },
  update(wordId, data) {
    return Api().patch(`spin-word?_id=${wordId}`, data);
  },
  indexOptions(data) {
    return Api().post("spin-word/indexOptions", data);
  }
};
