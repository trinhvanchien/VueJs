import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// Admin Store
import AccountStore from "@/modules/Admin/Account/store";

// Customer Store
import HelpBlogStore from "@/modules/Customer/Help/store/blog";
import HelpCategoriesStore from "@/modules/Customer/Help/store/categories";
import LandingPageStore from "@/modules/Customer/LandingPage/store";

export default new Vuex.Store({
  modules: {
    // Admin
    AccountStore,
    // Customer
    HelpBlogStore,
    HelpCategoriesStore,
    LandingPageStore
  }
});
