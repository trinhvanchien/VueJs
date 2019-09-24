import PhotoLibraryServices from "@/services/modules/photolibrary.services";

const state = {
  casePhoto: 0,
  photoStatus: "",
  photoLibrary: {
    name: "",
    url: "",
    attribute: [],
    _category: {},
    isAvailable: []
  },
  photoLibraries: [],
  photoUpload: []
};
const getters = {
  casePhoto: state => state.casePhoto,
  photoLibrary: state => state.photoLibrary,
  photoLibraries: state => state.photoLibraries,
  photoUpload: state => state.photoUpload,
  photoStatus: state => state.photoStatus
};
const mutations = {
  setCasePhotoLibrary: (state, payload) => {
    state.casePhoto = payload;
  },
  setPhotoLibrary: (state, payload) => {
    state.photoLibrary = payload;
  },
  setPhotoLibraries: (state, payload) => {
    state.photoLibraries = payload;
  },
  setPhotoUpload: (state, payload) => {
    state.photoUpload = payload;
  },
  photo_request: state => {
    state.photoStatus = "loading";
  },
  photo_success: state => {
    state.photoStatus = "success";
  }
};
const actions = {
  createUploadPhotoLibrary: async ({ commit }, payload) => {
    let result;
    commit("photo_request");
    result = await PhotoLibraryServices.create(payload);
    commit("setPhotoLibraries", result.data.data);
    commit("photo_success");
  },
  uploadPhotoLibrary: async ({ commit }, payload) => {
    let result;
    commit("photo_request");
    result = await PhotoLibraryServices.upload(payload);
    commit("setPhotoUpload", result.data.data);
    commit("photo_success");
  },
  setCasePhoto: ({ commit }, payload) => {
    commit("setCasePhotoLibrary", payload);
  },
  resetPhotoUpload: ({ commit }) => {
    commit("setPhotoLibrary", {
      name: "",
      url: "",
      attribute: [],
      _category: {},
      isAvailable: []
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
