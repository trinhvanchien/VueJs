const CategoriesRouter = {
  path: "/admin/categories",
  name: "admin_categories",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý danh mục mẫu"
  },
  component: () => import("@/modules/Admin/Categories")
};
export default CategoriesRouter;
