import SpinThemeServices from "@/services/modules/spinTheme.services";

const state = {
  currentTheme: {},
  themeList: [],
  pageStatus: "",
  searchKey: "",
  currentPage: 1,
  totalPages: 1,
  pageSize: 10
};
const getters = {
  currentTheme: state => state.currentTheme,
  themeList: state => state.themeList,
  pageStatus: state => state.pageStatus,
  currentPage: state => state.currentPage,
  totalPages: state => state.totalPages,
  pageSize: state => state.pageSize,
  searchKey: state => state.searchKey
};
const mutations = {
  request_init: state => {
    state.pageStatus = "loading";
  },
  request_success: state => {
    state.pageStatus = "success";
  },
  request_error: state => {
    state.pageStatus = "error";
  },
  setDeleteTheme: (state, payload) => {
    state.themeList = payload;
  },
  setTheme: (state, payload) => {
    state.currentTheme = payload;
  },
  setThemes: (state, payload) => {
    state.themeList = payload;
  },
  setUpdateSpinTheme: (state, payload) => {
    let position;
    position = state.themeList
      .map((item, index) => {
        if (item._id == payload._id) {
          return index;
        }
      })
      .filter(item => item !== undefined);
    state.themeList[position] = payload;
  },
  setSearchKey: (state, payload) => {
    state.searchKey = payload;
  },
  setCurrentPage: (state, payload) => {
    state.currentPage = payload;
    if (state.currentPage < 1) {
      state.currentPage = 1;
    } else if (state.currentPage > state.totalPages) {
      state.currentPage = state.totalPages;
    }
  },
  setTotalPages: (state, payload) => {
    state.totalPages = payload;
  },
  setPageSize: (state, payload) => {
    state.pageSize = payload;
  }
};
const actions = {
  createNewSpinTheme: async ({ commit }, payload) => {
    try {
      let result;
      commit("request_init");
      // create new spin
      await SpinThemeServices.create(payload);

      result = await SpinThemeServices.index();
      commit("setThemes", result.data.data);

      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  index: async ({ commit }) => {
    try {
      commit("request_init");
      let result = await SpinThemeServices.index();
      commit("setThemes", result.data.data.data);
      commit("setTotalPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  getSpinThemeById: async ({ commit }, payload) => {
    try {
      let results;
      commit("request_init");
      results = await SpinThemeServices.getById(payload);
      commit("setTheme", results.data.data);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  deleteSpinTheme: async ({ commit, state }, payload) => {
    try {
      let spin;
      commit("request_init");
      spin = state.themeList
        .map(item => {
          if (item._id !== payload) {
            return item;
          }
        })
        .filter(item => item !== undefined);
      commit("setDeleteTheme", spin);
      await SpinThemeServices.delete(payload);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  updateSpinTheme: async ({ commit }, payload) => {
    try {
      let result;
      commit("request_init");
      await SpinThemeServices.update(payload._id, payload);
      result = await SpinThemeServices.index();
      commit("setThemes", result.data.data.data);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  setThemeDefault: ({ commit }) => {
    commit("setTheme", {
      name: "",
      description: ""
    });
  },
  nextOrPrevPage: async ({ commit }, payload) => {
    let pageNum = state.currentPage + payload;
    commit("setCurrentPage", pageNum);
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.searchKey,
        currentPage: state.currentPage,
        pageSize: state.pageSize
      };
      result = await SpinThemeServices.indexOptions(data);
      commit("setThemes", result.data.data.data);
      commit("setTotalPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  jumpToPage: async ({ commit }, payload) => {
    commit("setCurrentPage", payload);
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.searchKey,
        currentPage: state.currentPage,
        pageSize: state.pageSize
      };
      result = await SpinThemeServices.indexOptions(data);
      commit("setThemes", result.data.data.data);
      commit("setTotalPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  search: async ({ commit }, payload) => {
    commit("setCurrentPage", 1);
    commit("setSearchKey", payload);
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.searchKey,
        currentPage: state.currentPage,
        pageSize: state.pageSize
      };
      result = await SpinThemeServices.indexOptions(data);
      commit("setThemes", result.data.data.data);
      commit("setTotalPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  setPageSize: async ({ commit }, payload) => {
    commit("setCurrentPage", 1);
    commit("setPageSize", parseInt(payload));
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.searchKey,
        currentPage: state.currentPage,
        pageSize: state.pageSize
      };
      result = await SpinThemeServices.indexOptions(data);
      commit("setThemes", result.data.data.data);
      commit("setTotalPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
