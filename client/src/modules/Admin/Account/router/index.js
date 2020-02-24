const AccountRouter = {
  path: "admin/account",
  name: "admin_account",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý tài khoản"
  },
  component: () => import("@/modules/Admin/Account")
};
export default AccountRouter;
