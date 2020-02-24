import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from "./store";

import "@/utils/interfaces/components";
import "@/utils/secures/headers";
import "@/utils/secures/guards";

// import "./core/middlewares/globals";
// import "./core/middlewares/guards";
// import "./core/middlewares/headers";
// import "./core/middlewares/plugins";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
