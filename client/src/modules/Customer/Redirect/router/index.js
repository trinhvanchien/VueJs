const RedirectRouter = {
  path: "/redirect",
  name: "redirect",
  meta: {
    layout: "customer",
    title: "Chuyển hướng"
  },
  component: () => import("@/modules/Customer/Redirect")
};
export default RedirectRouter;