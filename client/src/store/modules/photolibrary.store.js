import PhotoLibraryServices from "@/services/modules/photolibrary.services";
import AlbumServices from "@/services/modules/album.services";

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
  photoUpload: [],
  photoAlbum: []
};
const getters = {
  casePhoto: state => state.casePhoto,
  photoLibrary: state => state.photoLibrary,
  photoLibraries: state => state.photoLibraries,
  photoUpload: state => state.photoUpload,
  photoStatus: state => state.photoStatus,
  photoAlbum: state => state.photoAlbum
};
const mutations = {
  setCasePhotoLibrary: (state, payload) => {
    state.casePhoto = payload;
  },
  setDeletePhotoAlbum: (state, payload) => {
    state.photoAlbum = payload;
  },
  setUpdatePhotoAlbum: (state, payload) => {
    let position;
    position = state.photoAlbum
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);

    state.photoAlbum[position] = payload;
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
  setPhotoAlbum: (state, payload) => {
    state.photoAlbum = payload;
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
    if (payload.isAvailable && payload.isAvailable.length > 0) {
      payload.isAvailable = payload.isAvailable.map(item => item._id);
    }
    result = await PhotoLibraryServices.create(payload);
    commit("setPhotoLibraries", result.data.data);

    const results = await AlbumServices.getPhoto(payload._category);
    commit("setPhotoAlbum", results.data.data);
    commit("photo_success");
  },
  deletePhotoAlbum: async ({ commit, state }, payload) => {
    let photos;
    commit("album_request");
    photos = state.photoAlbum.filter(item => {
      if (item._id !== payload) return item;
    });
    await PhotoLibraryServices.delete(payload);
    commit("setDeletePhotoAlbum", photos);
    commit("photo_success");
  },
  getPhotoAlbumCategory: async ({ commit }, payload) => {
    let result;
    commit("album_request");
    result = await AlbumServices.getPhoto(payload);
    commit("setPhotoAlbum", result.data.data);
    commit("album_success");
  },
  getInfoPhoto: async ({ commit }, payload) => {
    let result;
    commit("album_request");
    result = await PhotoLibraryServices.show(payload);
    commit("setPhotoLibrary", result.data.data);
    commit("album_success");
  },
  updatePhotoAlbum: async ({ commit }, payload) => {
    commit("album_request");
    commit("setUpdatePhotoAlbum", payload);
    await PhotoLibraryServices.update(payload._id, payload);
    commit("album_success");
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
