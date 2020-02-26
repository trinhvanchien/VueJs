const SchedulesRouter = {
  path: "/admin/schedules",
  name: "admin_schedule",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý chiến dịch mẫu"
  },
  component: () => import("@/modules/Admin/Schedules")
};
export default SchedulesRouter;
