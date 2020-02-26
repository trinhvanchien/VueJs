import CookieFunction from "../utils/cookie";
import router from "../router";
import store from "../store";

/********************* SECURED ROUTER ************************/
router.beforeEach((to, from, next) => {
  const titlePage = to.matched
    .slice()
    .reverse()
    .find(r => r.meta && r.meta.title);

  if (titlePage) document.title = titlePage.meta.title;
  next();

  if (
    CookieFunction.getCookie("_sub") &&
    CookieFunction.getCookie("sid") &&
    CookieFunction.getCookie("cfr").toLowerCase() !== "admin" &&
    CookieFunction.getCookie("uid") &&
    to.path === "/"
  ) {
    window.location = `${CookieFunction.getCookie("_sub")}`;
  } else if (
    CookieFunction.getCookie("_sub") &&
    CookieFunction.getCookie("sid") &&
    CookieFunction.getCookie("cfr").toLowerCase() !== "admin" &&
    CookieFunction.getCookie("uid") &&
    to.path === "/login"
  ) {
    window.location = `${CookieFunction.getCookie("_sub")}`;
  } else if (
    CookieFunction.getCookie("_sub") &&
    CookieFunction.getCookie("sid") &&
    CookieFunction.getCookie("cfr").toLowerCase() !== "admin" &&
    CookieFunction.getCookie("uid") &&
    to.path === "/login"
  ) {
    window.location = `${CookieFunction.getCookie("_sub")}`;
  } else if (to.matched.some(record => record.meta.requiredAuth)) {
    if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "member" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    }
    next("/admin/login");
  } else if (to.matched.some(record => record.meta.requiredAdmin)) {
    if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "admin" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    } else if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "superadmin" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    } else if (
      CookieFunction.getCookie("sid") &&
      CookieFunction.getCookie("cfr").toLowerCase() === "collaborator" &&
      CookieFunction.getCookie("uid")
    ) {
      next();
      return;
    }
    next("/admin/login");
  } else if (
    store.getters.infoUserEmail === "" &&
    to.path === "/forgot-password/final"
  ) {
    next("/forgot-password");
  } else {
    next();
  }
});
