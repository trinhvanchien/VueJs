const AlbumPhotosRouter = {
  path: "/admin/album",
  name: "admin_album",
  meta: {
    requiredAdmin: true,
    layout: "admin",
    title: "Quản lý thư mục ảnh"
  },
  component: () => import("@/modules/Admin/AlbumPhotos")
};
export default AlbumPhotosRouter;
