import StatisticsService from "@/services/modules/statistics.services";

const state = {
  activeAccountStatistics: 0,
  registerAccountStatistics: []
};

const getters = {
  activeAccountStatistics: state => state.activeAccountStatistics,
  registerAccountStatistics: state => state.registerAccountStatistics
};

const mutations = {
  setActiveAccountStatistics: (state, payload) => {
    state.activeAccountStatistics = payload;
  },
  setRegisterAccountStatistics: (state, payload) => {
    state.registerAccountStatistics = payload;
  }
};

const actions = {
  accountStatistics: async ({ commit }) => {
    const res = await StatisticsService.accountStatistics();
    // Set value for activeAccountStatistics
    commit("setActiveAccountStatistics", res.data.data.activeAccount);
    // Set value for registerAccountStatistics
    commit(
      "setRegisterAccountStatistics",
      res.data.data.registerAccountStatistics
    );
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
