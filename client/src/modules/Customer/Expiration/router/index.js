const ExpirationRouter = {
  path: "/expiration",
  name: "user_expiration",
  meta: {
    layout: "customer",
    title: "Thông báo hết hạn tài khoản"
  },
  component: () => import("@/modules/Customer/Expiration")
};
export default ExpirationRouter;
