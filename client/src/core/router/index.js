/** When your routing table is too long, you can split it into small modules**/
import Vue from "vue";
import VueRouter from "vue-router";

// import CookieFunction from "@/core/utils/cookie";

import AdminRouter from "./modules/admin.routes";
import CustomerRouter from "./modules/user.routes";

Vue.use(VueRouter);

const routes = [AdminRouter, CustomerRouter];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
