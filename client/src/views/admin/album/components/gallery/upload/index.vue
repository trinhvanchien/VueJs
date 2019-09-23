<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <div
          class="header d_flex align_items_center justify_content_center mb_3"
        >
          <span
            >Danh sách ảnh đã chọn, lựa chọn danh mục chứa ảnh và click nút hoàn
            thành để hoàn tất quá trình</span
          >
        </div>
        <!-- START: SHOW LIST IMAGES AND OPTION SELECT PACKAGE -->
        <div class="body">
          <div class="list d_flex align_items_center mb_2">
            <!-- START: SHOW LIST IMAGES UPLOAD -->
            <div class="images d_flex align_items_center">
              <div class="number mr_3">1</div>
              <div class="item bg"></div>
            </div>
            <!-- END: SHOW LIST IMAGES UPLOAD -->

            <!-- START: SHOW OPTION SELECT PACKAGE -->
            <div class="option ml_2">
              <multiselect
                label="name"
                multiple
                aria-placeholder="Chọn album được sử dụng"
              />
            </div>
            <!-- END: SHOW OPTION SELECT PACKAGE -->

            <!-- START: DELETE IMAGES -->
            <div class="delete ml_3">
              <button class="btn btn_danger">Xóa</button>
            </div>
            <!-- END: DELETE IMAGES -->
          </div>
        </div>
        <!-- END: SHOW LIST IMAGES AND OPTION SELECT PACKAGE -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center justify_content_between">
          <div class="empty"></div>
          <div class="action">
            <button class="btn btn_danger mr_3" @click="close">Hủy</button>
            <button class="btn btn_success">Tải ảnh</button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShowButtonDefault", "currentTheme"],
  data() {
    return {};
  },
  computed: {
    membership() {
      return this.$store.getters.membershipPackage;
    }
  },
  methods: {
    close() {
      this.$store.dispatch("setCaseAlbum", 0);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
