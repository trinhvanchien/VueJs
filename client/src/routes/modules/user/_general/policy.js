/** When your routing table is too long, you can split it into small modules**/
const policyRouter = {
  path: "/policy",
  name: "policy",
  component: require("@/views/_general/policy").default
};

export default policyRouter;
