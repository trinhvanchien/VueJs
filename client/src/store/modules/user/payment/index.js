const state = {
  method: 0
};
const getters = {
  method: state => state.method
};
const mutations = {
  setMethod: (state, payload) => {
    state.method = payload;
  }
};
const actions = {
  changeMethod: ({ commit }, payload) => {
    commit("setMethod", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
