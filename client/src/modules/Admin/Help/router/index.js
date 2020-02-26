const HelpRouter = {
  path: "/admin/help",
  name: "admin_help",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý hỗ trợ khách hàng"
  },
  component: () => import("@/modules/Admin/Help")
};
export default HelpRouter;
