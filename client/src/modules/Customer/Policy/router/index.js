/** When your routing table is too long, you can split it into small modules**/
const PolicyRouter = {
  path: "/policy",
  name: "policy",
  meta: {
    layout: "customer",
    title: "Điều khoản sử dụng"
  },
  component: () => import("@/modules/Customer/Policy")
};

export default PolicyRouter;
