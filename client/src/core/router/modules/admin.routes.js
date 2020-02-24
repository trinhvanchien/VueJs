/** When your routing table is too long, you can split it into small modules**/
import Vue from "vue";
import VueRouter from "vue-router";

import AdminAccount from "@/modules/Admin/Account/router";
import AdminAgency from "@/modules/Admin/Agency/router";

Vue.use(VueRouter);

const routes = [AdminAccount, AdminAgency];
export default routes;
