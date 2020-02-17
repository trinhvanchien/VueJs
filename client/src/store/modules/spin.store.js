import SpinThemeServices from "@/services/modules/spinTheme.services";

const state = {
  currentTheme: {},
  themeList: [],
  spinStatus: ""
};
const getters = {
  currentTheme: state => state.currentTheme,
  themeList: state => state.themeList,
  spinStatus: state => state.spinStatus
};
const mutations = {
  spin_request: state => {
    state.spinStatus = "loading";
  },
  spin_success: state => {
    state.spinStatus = "success";
  },
  spin_error: state => {
    state.spinStatus = "error";
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
  }
};
const actions = {
  createNewSpinTheme: async ({ commit }, payload) => {
    try {
      let result;
      commit("spin_request");
      // create new spin
      await SpinThemeServices.create(payload);

      result = await SpinThemeServices.index();
      commit("setThemes", result.data.data);

      commit("spin_success");
    } catch (e) {
      commit("spin_error");
      return e;
    }
  },
  getAllSpinTheme: async ({ commit }) => {
    try {
      let result;
      commit("spin_request");
      result = await SpinThemeServices.index();
      commit("setThemes", result.data.data);
      commit("spin_success");
    } catch (e) {
      commit("spin_error");
      return e;
    }
  },
  getSpinThemeById: async ({ commit }, payload) => {
    try {
      let results;
      commit("spin_request");
      results = await SpinThemeServices.getById(payload);
      commit("setTheme", results.data.data);
      commit("spin_success");
    } catch (e) {
      commit("spin_error");
      return e;
    }
  },
  deleteSpinTheme: async ({ commit, state }, payload) => {
    try {
      let spin;
      commit("spin_request");
      spin = state.themeList
        .map(item => {
          if (item._id !== payload) {
            return item;
          }
        })
        .filter(item => item !== undefined);
      commit("setDeleteTheme", spin);
      await SpinThemeServices.delete(payload);
      commit("spin_success");
    } catch (e) {
      commit("spin_error");
      return e;
    }
  },
  updateSpinTheme: async ({ commit }, payload) => {
    try {
      let result;
      commit("spin_request");
      await SpinThemeServices.update(payload._id, payload);
      result = await SpinThemeServices.index();
      commit("setThemes", result.data.data);
      commit("spin_success");
    } catch (e) {
      commit("spin_error");
      return e;
    }
  },
  setThemeDefault: ({ commit }) => {
    commit("setTheme", {
      name: "",
      description: ""
    });
  }
};
export default {
  state,
  getters,
  mutations,
  actions
};
