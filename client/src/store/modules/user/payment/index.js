import VnpayServices from "@/services/modules/user/payment/vnpay.services";
import AccountPackageServices from "@/services/modules/accountpackage.services";

const state = {
  method: 0,
  vnpayUrl: null,
  infoBill: {
    amount: "",
    membershipPackage: "",
    monthsPurchase: "",
    orderDescription: ""
  },
  postPrice: 0
};
const getters = {
  method: state => state.method,
  vnpayUrl: state => state.vnpayUrl,
  infoBill: state => state.infoBill,
  postPrice: state => state.postPrice
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
  },
  setPostPrice: (state, payload) => {
    state.postPrice = payload;
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
  },
  getPostPrice: async ({ commit }) => {
    const getPostPriceRequest = await AccountPackageServices.getPostPrice();
    commit("setPostPrice", getPostPriceRequest.data.data.postPrice);
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
