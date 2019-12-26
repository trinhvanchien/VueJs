/** When your routing table is too long, you can split it into small modules**/
const PaymentRouter = {
  path: "/payment",
  component: () => import("@/views/user/payment"),
  children: [
    {
      path: "",
      name: "payment_cart",
      component: () => import("@/views/user/payment/page/cart")
    },
    {
      path: "method",
      name: "payment_method",
      component: () => import("@/views/user/payment/page/method")
    },
    {
      path: "success",
      name: "payment_success",
      component: () => import("@/views/user/payment/page/success")
    }
  ]
};

export default PaymentRouter;
