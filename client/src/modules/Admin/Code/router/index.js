const CodeExpireRouter = {
  path: "/admin/code",
  name: "admin_code",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý mã gia hạn"
  },
  component: () => import("@/modules/Admin/Code")
};
export default CodeExpireRouter;
