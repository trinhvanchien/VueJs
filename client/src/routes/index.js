import Vue from "vue";
import Router from "vue-router";

/**
 * Router for Sytem Admin
 */
import adminGeneralRouter from "./modules/admin";
import signinRouterAdmin from "./modules/admin/signin";
import signUpRouterAdmin from "./modules/admin/signup";

/**
 * Router for System Member
 */
import userGeneralRouter from "./modules/user";
import signInRouter from "./modules/user/_general/signin";
import signUpRouter from "./modules/user/_general/signup";
import introduceRouter from "./modules/user/landingpage";
import redirectRouter from "./modules/user/_general/redirect";
import changePasswordRouter from "./modules/user/_general/password";
import expirationRouter from "./modules/user/_general/expiration";
import affiliateRouter from "./modules/user/_general/affiliate";

/**
 * Router for Help
 */
import helpGeneralRouter from "./modules/user/help";

/**
 * Router for Market
 */
import marketRouter from "./modules/user/market";
/**
 * Router for Market
 */
import PaymentRouter from "./modules/user/payment";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    /**
     * Router for Sytem Admin
     */
    adminGeneralRouter,
    signinRouterAdmin,
    signUpRouterAdmin,
    /**
     * Router for System Member
     */
    userGeneralRouter,
    signInRouter,
    signUpRouter,
    introduceRouter,
    redirectRouter,
    changePasswordRouter,
    expirationRouter,
    affiliateRouter,
    /**
     * Router for Help
     */
    helpGeneralRouter,
    /**
     * Router for Market
     */
    marketRouter,
    /**
     * Router for Payment
     */
    PaymentRouter
  ]
});
