/** When your routing table is too long, you can split it into small modules**/
import Vue from "vue";
import VueRouter from "vue-router";

// import CookieFunction from "@/core/utils/cookie";
// Admin router
import AdminAccount from "@/modules/Admin/Account/router";
import AdminAgency from "@/modules/Admin/Agency/router";
import AdminAlbumPhotos from "@/modules/Admin/AlbumPhotos/router";
import AdminCategoriesExample from "@/modules/Admin/Categories/router";
import AdminCodeExpire from "@/modules/Admin/Code/router";
import AdminDashboard from "@/modules/Admin/Dashboard/router";
import AdminHelp from "@/modules/Admin/Help/router";
import AdminLoginRouter from "@/modules/Admin/Login/router";
import AdminPackage from "@/modules/Admin/Package/router";
import AdminSchedulesExample from "@/modules/Admin/Schedules/router";
import AdminSpin from "@/modules/Admin/Spin/router";
import AdminStore from "@/modules/Admin/Store/router";
import AdminVpsManage from "@/modules/Admin/Vps/router";

// Customer router
import AffilateRouter from "@/modules/Customer/Affilate/router";
import ExpirationRouter from "@/modules/Customer/Expiration/router";
import ForgotPasswordRouter from "@/modules/Customer/ForgotPassword/router";
import HelpRouter from "@/modules/Customer/Help/router";
import LandingPageRouter from "@/modules/Customer/LandingPage/router";
import LoginRouter from "@/modules/Customer/Login/router";
import MarketRouter from "@/modules/Customer/Market/router";
import PaymentRouter from "@/modules/Customer/Payment/router";
import PolicyRouter from "@/modules/Customer/Policy/router";
import RedirectRouter from "@/modules/Customer/Redirect/router";
import RegisterRouter from "@/modules/Customer/Register/router";

Vue.use(VueRouter);


const routes = [
  // Admin
  AdminAccount,
  AdminAgency,
  AdminAlbumPhotos,
  AdminCategoriesExample,
  AdminCodeExpire,
  AdminDashboard,
  AdminHelp,
  AdminLoginRouter,
  AdminPackage,
  AdminSchedulesExample,
  AdminSpin,
  AdminStore,
  AdminVpsManage,
  // Customer
  AffilateRouter,
  ExpirationRouter,
  ForgotPasswordRouter,
  HelpRouter,
  LandingPageRouter,
  LoginRouter,
  MarketRouter,
  PaymentRouter,
  PolicyRouter,
  RedirectRouter,
  RegisterRouter
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
