const PaymentRouter = {
  path: "/payment",
  name: "hoot_payment",
  meta: {
    title: "Thanh toán | Hoot Payment",
    layout: "customer"
  },
  component: () => import("@/modules/Customer/Payment")
};
export default PaymentRouter;
