import Vue from "vue";
import App from "./App.vue";
import router from "./core/router";
import store from "./core/store";

// import "@/utils/interfaces/components";
// import "@/utils/secures/headers";
// import "@/utils/secures/guards";

import "./core/middlewares/globals";
import "./core/middlewares/guards";
import "./core/middlewares/headers";
import "./core/middlewares/plugins";

Vue.component("admin-layout", () => import("./core/layouts/AdminLayout"));
Vue.component("customer-layout", () => import("./core/layouts/Customer"));

Vue.config.productionTip = false;

new Vue({
  // created: function() {
  //   window.fbAsyncInit = function() {
  //     FB.init({
  //       xfbml: true,
  //       version: "v6.0"
  //     });
  //     FB.AppEvents.logPageView();
  //   };

  //   (function(d, s, id) {
  //     var js,
  //       fjs = d.getElementsByTagName(s)[0];
  //     if (d.getElementById(id)) {
  //       return;
  //     }
  //     js = d.createElement(s);
  //     js.id = id;
  //     js.src = "https://connect.facebook.net/en_US/sdk.js";
  //     fjs.parentNode.insertBefore(js, fjs);
  //   })(document, "script", "facebook-jssdk");
  // },
  router,
  store,
  render: h => h(App)
}).$mount("#app");
