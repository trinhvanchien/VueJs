const AffilateRouter = {
  path: "/a/:aid",
  name: "affiliate",
  meta: {
    layout: "customer",
    title: "Chuyển hướng liên kết"
  },
  component: () => import("@/modules/Customer/Affilate")
};
export default AffilateRouter;
