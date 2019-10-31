<template>
  <div class="modal--wrapper--mobile">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <!-- Start: Header -->
        <div class="modal--header d_flex align_items_center">
          <div @click="close">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0">Hướng dẫn sử dụng</p>
        </div>
        <!-- End: Header -->
        <div class="modal--body mt_3">
          <div class="content d_flex align_items_center">
            <slides />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slides from "./slides";
export default {
  components: {
    Slides
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
