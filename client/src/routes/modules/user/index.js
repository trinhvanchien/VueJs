const userGeneralRouter = {
  path: "",
  name: "homepage",
  // component: require("@/views/_general/home").default
  component: () => import("@/views/_general/block")
};

export default userGeneralRouter;
