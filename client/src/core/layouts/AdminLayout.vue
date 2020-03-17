<template>
  <div id="app">
    <div class="wrapper">
      <div class="wrap--content d_none d_md_flex" v-if="innerWidth > 769">
        <div class="wrap--content-sidebar">
          <admin-sidebar />
        </div>
        <div class="wrap--content-main">
          <admin-header />
          <slot />
        </div>
      </div>
      <!-- <div class="wrap__mobile d_block d_md_none position_relative" v-else>
        <admin-header-mobile />
        <slot />
      </div> -->
    </div>
  </div>
</template>
<script>
import AdminHeader from "@/core/components/AdminHeader";
import AdminSidebar from "@/core/components/AdminSidebar";
// import AdminHeaderMobile from "@/core/components/AdminHeaderMobile";
export default {
  components: {
    AdminHeader,
    AdminSidebar
    // AdminHeaderMobile
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
<style lang="scss" scoped>
.wrapper {
  min-height: 100vh;
  .wrap--content-main {
    width: calc(100% - 300px);
    padding: 30px 60px 60px 0;
  }
}

.wrapper[data-theme="light"] {
  color: #666;
  background-color: #f7f7f7;
  .wrap--content-mobile {
    background-color: #fff;
  }
  // background-color: #ddd;
}

.wrapper[data-theme="dark"] {
  color: #ccc;
  background-color: #2f3136;
}
</style>
