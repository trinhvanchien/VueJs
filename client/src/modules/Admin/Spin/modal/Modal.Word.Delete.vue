<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--header">
          <div class="title">THÔNG BÁO</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">
            <i
              class="fas fa-exclamation-triangle"
              style="font-size:20px;color:orange"
            ></i>
            Bạn có chắc chắn muốn xóa từ khóa
            <span class="font_weight_bold">{{ words.name }}</span>
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--submit" @click="closePopup()">
            KHÔNG
          </button>
          <button class="btn-delete" @click="deleteTargets(words._id)">
            CÓ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["words"],
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    deleteTargets(val) {
      this.$store.dispatch("deleteWord", val);
      this.closePopup();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
