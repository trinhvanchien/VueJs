import ThemeServices from "@/services/modules/spinTheme.services.js";

export default {
  state: {
    themes: [],
    currentPage: 1,
    totalPages: 1,
    pageSize: 10,
    pageStatus: "",
    themesObj: {},
    searchKey: ""
  },
  getters: {
    themes: state => state.themes,
    pageStatus: state => state.pageStatus,
    currentPage: state => state.currentPage,
    totalPages: state => state.totalPages,
    pageSize: state => state.pageSize,
    themesObj: state => state.themesObj,
    searchKey: state => state.searchKey
  },
  mutations: {
    setThemes: (state, payload) => {
      state.themes = payload;
    },
    request_init: state => {
      state.pageStatus = "loading";
    },
    request_success: state => {
      state.pageStatus = "success";
    },
    request_error: state => {
      state.pageStatus = "error";
    },
    setTotalPages: (state, payload) => {
      state.totalPages = payload;
    },
    setCurrentPage: (state, payload) => {
      state.currentPage = payload;
      if (state.currentPage < 1) {
        state.currentPage = 1;
      } else if (state.currentPage > state.totalPages) {
        state.currentPage = state.totalPages;
      }
    },
    setPageSize: (state, payload) => {
      state.pageSize = payload;
    },
    setThemesObj: (state, payload) => {
      state.themesObj = payload;
    },
    setDeleteTheme: (state, payload) => {
      state.themes = payload;
    },
    showPageStatus: (state, payload) => {
      state.pageStatus = payload;
    },
    updatePageStatus: (state, payload) => {
      state.pageStatus = payload;
    },
    setSearchKey: (state, payload) => {
      state.searchKey = payload;
    }
  },
  actions: {
    getThemes: async ({ commit }) => {
      try {
        commit("request_init");
        let result;
        result = await ThemeServices.index();
        commit("setThemes", result.data.data.data);
        commit("setTotalPages", result.data.data.totalPages);
        commit("request_success");
      } catch (e) {
        commit("request_error");
        return e;
      }
    },
    createTheme: async ({ commit }, payload) => {
      let result;
      await ThemeServices.create(payload);
      commit("showPageStatus", "insert");
      setTimeout(() => {
        commit("updatePageStatus", null);
      }, 1000);
      result = await ThemeServices.index();
      await commit("setThemes", result.data.data.data);
      await commit("setCurrentPage", 1);
      await commit("setTotalPages", result.data.data.totalPages);
    },
    resetTheme: ({ commit }) => {
      commit("setThemesObj", {
        name: "",
        description: ""
      });
    },
    getIdTheme: async ({ commit }, payload) => {
      let result;
      result = await ThemeServices.getById(payload._id);
      commit("setThemesObj", result.data.data);
    },
    updateTheme: async ({ commit }, payload) => {
      let result;
      await ThemeServices.update(payload._id, payload);
      commit("showPageStatus", "update");
      setTimeout(() => {
        commit("updatePageStatus", null);
      }, 1000);
      result = await ThemeServices.index();
      await commit("setThemes", result.data.data.data);
      await commit("setCurrentPage", 1);
      await commit("setTotalPages", result.data.data.totalPages);
    },
    deleteTheme: async ({ commit, state }, payload) => {
      let result;
      result = state.themes
        .map(item => {
          if (item._id !== payload) {
            return item;
          }
        })
        .filter(item => item !== undefined);
      commit("setDeleteTheme", result);
      await ThemeServices.delete(payload);
      commit("showPageStatus", "delete");
      setTimeout(() => {
        commit("updatePageStatus", null);
      }, 1000);
      result = await ThemeServices.index();
      await commit("setCurrentPage", state.currentPage);
      await commit("setThemes", result.data.data.data);
      commit("setPageSize", 10);
      await commit("setTotalPages", result.data.data.totalPages);
    },
    setPageSize: async ({ commit, state }, payload) => {
      commit("setCurrentPage", 1);
      commit("setPageSize", parseInt(payload));
      let result;
      let data = {
        currentPage: state.currentPage,
        pageSize: state.pageSize,
        searchKey: state.searchKey
      };
      result = await ThemeServices.indexOptions(data);
      commit("setThemes", result.data.data.data);
      commit("setTotalPages", result.data.data.totalPages);
    },
    searchTheme: async ({ commit, state }, payload) => {
      commit("setSearchKey", payload);
      commit("setCurrentPage", 1);
      try {
        let result;
        let data = {
          currentPage: state.currentPage,
          searchKey: state.searchKey,
          pageSize: state.pageSize
        };
        result = await ThemeServices.indexOptions(data);
        commit("setThemes", result.data.data.data);
        commit("setTotalPages", result.data.data.totalPages);
        commit("request_success");
      } catch (e) {
        commit("request_error");
        return e;
      }
    },
    nextOrPrevPage: async ({ commit, state }, payload) => {
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
        result = await ThemeServices.indexOptions(data);
        commit("setThemes", result.data.data.data);
        commit("setTotalPages", result.data.data.totalPages);
        console.log("totalPages", result.data.data.totalPages);
        commit("request_success");
      } catch (e) {
        commit("request_error");
        return e;
      }
    }
  }
};
