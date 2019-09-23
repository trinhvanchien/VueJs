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
  setAlbumPackages: (state, payload) => {
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
  getAllalbum: async ({ commit }) => {
    commit("album_request");
    const result = await AlbumServices.index();
    commit("setAlbumPackages", result.data.data);
    commit("album_success");
  },
  getInfoAlbum: async ({ commit }, payload) => {
    commit("album_request");
    const result = await AlbumServices.show(payload);
    commit("setAlbum", result.data.data);
    commit("album_success");
  },
  createAlbumPackage: async ({ commit }, payload) => {
    commit("album_request");
    await AlbumServices.create(payload);
    const result = await AlbumServices.index();
    commit("setAlbumPackages", result.data.data);
    commit("album_success");
  },
  deleteAlbumPackage: async ({ commit, state }, payload) => {
    commit("album_request");

    const packages = state.albums.filter(item => {
      if (item._id !== payload) return item;
    });
    commit("setDeleteAlbum", packages);

    commit("album_success");
  },
  updateAlbumPackage: async ({ commit }, payload) => {
    commit("album_request");

    commit("setUpdateAlbum", payload);
    await AlbumServices.update(payload._id, payload);

    commit("album_success");
  },
  resetAlbum: ({ commit }, payload) => {
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
