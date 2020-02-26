const StoreRouter = {
  path: "/admin/store",
  name: "admin_store",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý cửa hàng"
  },
  component: () => import("@/modules/Admin/Store")
};
export default StoreRouter;
