<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="form_group">
            <label class="">Tên album</label>
            <input
              v-model="albumCategory.name"
              type="text"
              class="form_control"
              placeholder="Nhập tên album"
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
            <button
              class="btn bg_primary"
              v-if="isShowButtonDefault === true"
              @click="createNewAlbum"
            >
              Tạo mới
            </button>
            <button
              class="btn bg_primary"
              v-if="isShowButtonDefault === false"
              @click="updateAlbum"
            >
              Cập nhật
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
  props: ["isShowButtonDefault", "currentTheme"],
  data() {
    return {};
  },
  computed: {
    albumCategory() {
      return this.$store.getters.album;
    }
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    async createNewAlbum() {
      await this.$store.dispatch("createAlbumCategory", this.albumCategory);
      this.close();
    },
    async updateAlbum() {
      await this.$store.dispatch("updateAlbumCategory", this.albumCategory);
      await this.$emit("changeButton", true);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
