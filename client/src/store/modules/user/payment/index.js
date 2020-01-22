import VnpayServices from "@/services/modules/user/payment/vnpay.services";

const state = {
  method: 0,
  vnpayUrl: null,
  infoBill: {
    amount: "",
    membershipPackage: "",
    monthsPurchase: "",
    orderDescription: ""
  }
};
const getters = {
  method: state => state.method,
  vnpayUrl: state => state.vnpayUrl,
  infoBill: state => state.infoBill
};
const mutations = {
  setMethod: (state, payload) => {
    state.method = payload;
  },
  setVnpayUrl: (state, payload) => {
    state.vnpayUrl = payload;
  },
  setInfoPayment: (state, payload) => {
    state.infoBill = payload;
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
  },
  setInfoPayment: ({ commit }, payload) => {
    commit("setInfoPayment", payload);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
