<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="form_group">
            <lable class="">Tạo package mới</lable>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập tên thư mục"
            />
          </div>

          <div class="form_group">
            <label>Số bài đăng trong 1 ngày</label>
            <input
              type="number"
              placeholder="Nhập số bài đăng tối đa của gói"
              class="form_control"
            />
          </div>

          <div class="form_group">
            <label>Số thành viên tối đa</label>
            <input
              type="number"
              placeholder="Nhập số thành viên tối đa của gói"
              class="form_control"
            />
          </div>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button class="btn bg_primary" @click="createNewPackage">
              Tạo mới
            </button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: String
  },
  data() {
    return {};
  },
  computed: {
    package() {
      return this.$store.getters.package;
    }
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    async createNewPackage() {
      await this.$store.dispatch("createNewCategoryDefault", {
        title: this.title
      });
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
