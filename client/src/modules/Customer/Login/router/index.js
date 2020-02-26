const LoginCustomerRouter = {
  path: "/login",
  name: "cus_login",
  meta: {
    layout: "customer",
    title: "Đăng nhập hệ thống"
  },
  component: () => import("@/modules/Customer/Login")
};
export default LoginCustomerRouter;