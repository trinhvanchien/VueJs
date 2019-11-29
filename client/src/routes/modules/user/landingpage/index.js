const introduceRouter = {
  path: "/introduce",
  name: "introduce",
  // component: require("@/views/_general/home").default
  component: () => import("@/views/_general/home")
};

export default introduceRouter;
