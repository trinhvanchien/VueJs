<template>
  <div>
    <!-- Start: Desktop Component -->
    <div
      class="wrap--content d_md_flex d_none position_relative"
      v-if="innerWidth > 769"
    >
      <app-desktop />
    </div>
    <!-- End: Desktop Component -->
    <!-- Start: Mobile Component -->
    <div
      class="wrap--content-mobile d_block d_md_none position_relative"
      v-else
    >
      <app-mobile />
    </div>
    <!-- End: Mobile Component -->
  </div>
</template>

<script>
import AppDesktop from "./device/Desktop";
import AppMobile from "./device/Mobile";

export default {
  components: {
    AppDesktop,
    AppMobile
  },
  data() {
    return {
      innerWidth: 0
    };
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getWindowWidth);
      this.getWindowWidth();
    });
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getWindowWidth);
  },
  methods: {
    getWindowWidth(event) {
      this.innerWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped lang="scss"></style>
