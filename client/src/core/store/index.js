import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import AccountStore from "@/modules/Admin/Account/store";

export default new Vuex.Store({
  modules: {
    ACCOUNT: AccountStore,
  }
});
