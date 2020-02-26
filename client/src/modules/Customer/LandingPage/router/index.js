const LandingPageRouter = {
  path: "/",
  name: "cus_home",
  meta: {
    layout: "customer",
    title: "Trang chủ hệ thống"
  },
  component: () => import("@/modules/Customer/LandingPage")
};
export default LandingPageRouter;