const AdminLoginRouter = {
  path: "/admin/login",
  name: "admin_login",
  meta: {
    title: "Đăng nhập | Admin Login"
  },
  component: () => import("@/modules/Admin/Login")
};
export default AdminLoginRouter;