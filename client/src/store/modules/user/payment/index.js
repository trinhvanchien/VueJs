import VnpayServices from "@/services/modules/user/payment/vnpay.services";

const state = {
  method: 0,
  vnpayUrl: null
};
const getters = {
  method: state => state.method,
  vnpayUrl: state => state.vnpayUrl
};
const mutations = {
  setMethod: (state, payload) => {
    state.method = payload;
  },
  setVnpayUrl: (state, payload) => {
    state.vnpayUrl = payload;
  }
};
const actions = {
  changeMethod: ({ commit }, payload) => {
    commit("setMethod", payload);
  },
  createVnpayPaymentUrl: async ({ commit }, payload) => {
    const createPaymentUrlRequest = await VnpayServices.createPaymentUrl(
      payload
    );
    commit("setVnpayUrl", createPaymentUrlRequest.data.data);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
