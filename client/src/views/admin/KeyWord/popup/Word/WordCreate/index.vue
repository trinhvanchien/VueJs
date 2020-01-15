<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--header">
          <div class="title">Tạo mới chủ đề</div>
          <div class="title">Cập nhật chủ đề</div>
        </div>
        <div class="modal--body my_3">
          <div class="form_group">
            <label>Tên chủ đề</label>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập tên chủ đề"
            />
          </div>
          <div class="form_group">
            <label>Mô tả về chủ đề</label>
            <textarea class="form_control"></textarea>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--submit" @click="closePopup()">
            HỦY
          </button>
          <button class="btn--skip" @click="updateTheme">
            Cập nhật
          </button>
          <button class="btn--skip" @click="createNewTheme">
            Tạo mới
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    createNewTheme() {
    },
    updateTheme() {
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
