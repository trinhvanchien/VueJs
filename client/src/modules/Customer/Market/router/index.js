const MarketRouter = {
  path: "/store",
  name: "hoot_store",
  meta: {
    title: "Cửa hàng | Hoot Store",
    layout: "customer"
  },
  component: () => import("@/modules/Customer/Market")
};
export default MarketRouter;
