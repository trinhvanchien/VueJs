const DashboardRouter = {
  path: "/admin",
  name: "admin_dashboard",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Trang chủ"
  },
  component: () => import("@/modules/Admin/Dashboard")
};
export default DashboardRouter;
