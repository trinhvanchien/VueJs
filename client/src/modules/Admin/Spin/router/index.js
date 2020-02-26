const SpinRouter = {
  path: "/admin/spin",
  name: "admin_spin",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý từ đồng nghĩa"
  },
  component: () => import("@/modules/Admin/Spin")
};
export default SpinRouter;
