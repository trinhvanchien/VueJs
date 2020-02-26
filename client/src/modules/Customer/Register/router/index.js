const RegisterCustomerRouter = {
  path: "/register",
  name: "cus_register",
  meta: {
    layout: "customer",
    title: "Đăng ký tài khoản"
  },
  component: () => import("@/modules/Customer/Register")
};
export default RegisterCustomerRouter;