const VpsRouter = {
  path: "/admin/vps",
  name: "admin_vps",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý VPS"
  },
  component: () => import("@/modules/Admin/Vps")
};
export default VpsRouter;
