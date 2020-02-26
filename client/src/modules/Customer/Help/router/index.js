const HelpCustomerRouter = {
  path: "/help",
  component: () => import("@/modules/Customer/Help"),
  children: [
    {
      path: "",
      name: "cus_help",
      meta: {
        layout: "customer",
        title: "Trợ giúp"
      },
      component: () => import("@/modules/Customer/Help/pages/Home")
    },
    {
      path: ":id",
      name: "help_detail",
      meta: {
        layout: "customer",
        title: "Chi tiết bài viết"
      },
      component: () => import("@/modules/Customer/Help/pages/Blog")
    },
    {
      path: "/search/query",
      name: "help_search",
      meta: {
        layout: "customer",
        title: "Tìm kiếm bài viết"
      },
      component: () => import("@/modules/Customer/Help/pages/Search")
    }
  ]
};
export default HelpCustomerRouter;