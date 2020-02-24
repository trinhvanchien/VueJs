const AccountRouter = {
  path: "admin/account",
  name: "admin_account",
  meta: {
    auth: true,
    title: "Quản lý tài khoản"
  },
  component: () => import("@/modules/Admin/Account")
};
export default AccountRouter;
