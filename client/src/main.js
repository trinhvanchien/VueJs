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

Vue.component("admin-layout", () =>
    import ("./core/layouts/AdminLayout"));
Vue.component("customer-layout", () =>
    import ("./core/layouts/Customer"));

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");