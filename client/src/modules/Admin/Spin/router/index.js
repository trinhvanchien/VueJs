const SpinRouter = {
  path: "/admin/spin",
  name: "admin_spin",
  meta: {
    layout: "admin",
    requiredAdmin: true,
    title: "Quản lý từ đồng nghĩa"
  },
  component: () => import("@/modules/Admin/Spin"),
  children: [
    {
      path: "theme",
      name: "spin_theme",
      meta: {
        layout: "admin"
      },
      component: () => import("@/modules/Admin/Spin/pages/Theme/Theme.vue")
    },
    {
      path: "word",
      name: "spin_word",
      meta: {
        layout: "admin"
      },
      component: () => import("@/modules/Admin/Spin/pages/Word/KeyWord.vue")
    }
  ]
};
export default SpinRouter;
