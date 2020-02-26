const PackageRouter = {
  path: "/admin/package",
  name: "admin_package",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý gói tài khoản"
  },
  component: () => import("@/modules/Admin/Package")
};
export default PackageRouter;
