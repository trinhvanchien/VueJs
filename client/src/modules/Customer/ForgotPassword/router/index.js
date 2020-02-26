const ForgotPasswordRouter = {
  path: "/forgot-password",
  name: "cus_forgot_password",
  meta: {
    layout: "customer",
    title: "Quên mật khẩu"
  },
  component: () => import("@/modules/Customer/ForgotPassword"),
  children: [
    {
      path: "/",
      name: "check_mail",
      meta: {
        layout: "customer",
        title: "Kiểm tra email"
      },
      component: () =>
        import("@/modules/Customer/ForgotPassword/pages/CheckMail")
    },
    {
      path: "/check-code",
      name: "check_code",
      meta: {
        layout: "customer",
        title: "Kiểm tra mã gửi về"
      },
      component: () =>
        import("@/modules/Customer/ForgotPassword/pages/CheckCode")
    },
    {
      path: "/final",
      name: "change_final",
      meta: {
        layout: "customer",
        title: "Thay đổi mật khẩu"
      },
      component: () =>
        import("@/modules/Customer/ForgotPassword/pages/ChangePassword")
    }
  ]
};
export default ForgotPasswordRouter;
