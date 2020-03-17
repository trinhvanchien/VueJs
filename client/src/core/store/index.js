import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// Admin Store
import AccountStore from "@/modules/Admin/Account/store";
import ThemeStore from "@/modules/Admin/Spin/store/Theme.store.js";
import WordStore from "@/modules/Admin/Spin/store/KeyWord.store.js";
// Customer Store
import HelpBlogStore from "@/modules/Customer/Help/store/blog";
import HelpCategoriesStore from "@/modules/Customer/Help/store/categories";
import LandingPageStore from "@/modules/Customer/LandingPage/store";

export default new Vuex.Store({
  modules: {
    // Admin
    AccountStore,
    ThemeStore,
    WordStore,
    // Customer
    HelpBlogStore,
    HelpCategoriesStore,
    LandingPageStore
  }
});
