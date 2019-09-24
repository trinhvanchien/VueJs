import AlbumServices from "@/services/modules/album.services";

const state = {
  albums: [],
  album: {
    name: ""
  },
  caseAlbum: 0,
  statusAlbum: ""
};
const getters = {
  album: state => state.album,
  albums: state => state.albums,
  caseAlbum: state => state.caseAlbum,
  statusAlbum: state => state.statusAlbum
};
const mutations = {
  album_request: state => {
    state.statusAlbum = "loading";
  },
  album_success: state => {
    state.statusAlbum = "success";
  },
  setAlbumCategory: (state, payload) => {
    state.albums = payload;
  },
  setAlbum: (state, payload) => {
    state.album = payload;
  },
  set_case: (state, payload) => {
    state.caseAlbum = payload;
  },
  setDeleteAlbum: (state, payload) => {
    state.albums = payload;
  },
  setUpdateAlbum: (state, payload) => {
    const position = state.albums
      .map((item, index) => {
        if (item._id === payload._id) return index;
      })
      .filter(item => item !== undefined);
    state.albums[position] = payload;
  },
  reset_album: (state, payload) => {
    state.album[payload.key] = payload.value;
  }
};
const actions = {
  getAlbumCategory: async ({ commit }) => {
    let result;
    commit("album_request");
    result = await AlbumServices.index();
    commit("setAlbumCategory", result.data.data);
    commit("album_success");
  },
  getInfoAlbum: async ({ commit }, payload) => {
    let result;
    commit("album_request");
    result = await AlbumServices.show(payload);
    commit("setAlbum", result.data.data);
    commit("album_success");
  },
  createAlbumCategory: async ({ commit }, payload) => {
    let result;
    commit("album_request");
    await AlbumServices.create(payload);
    result = await AlbumServices.index();
    commit("setAlbumCategory", result.data.data);
    commit("album_success");
  },
  deleteAlbumCategory: async ({ commit, state }, payload) => {
    let packages;
    commit("album_request");

    packages = state.albums.filter(item => {
      if (item._id !== payload) return item;
    });
    await AlbumServices.delete(payload);

    commit("setDeleteAlbum", packages);

    commit("album_success");
  },
  updateAlbumCategory: async ({ commit }, payload) => {
    commit("album_request");

    commit("setUpdateAlbum", payload);
    await AlbumServices.update(payload._id, payload);

    commit("album_success");
  },
  resetAlbumCategory: ({ commit }, payload) => {
    commit("reset_album", payload);
  },
  setCaseAlbum: ({ commit }, payload) => {
    commit("set_case", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
