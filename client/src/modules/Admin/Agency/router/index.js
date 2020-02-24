const AgencyRouter = {
  path: "admin/agency",
  name: "admin_agency",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý đại lý"
  },
  component: () => import("@/modules/Admin/Agency")
};
export default AgencyRouter;
