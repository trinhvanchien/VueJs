<template lang="">
  <div id="app">
    <div class="wrapper">
      <div class="wrap--content d_none d_md_flex">
        <div class="wrap--content-sidebar">
          <admin-sidebar />
        </div>
        <div class="wrap--content-main">
          <admin-header />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminSidebar from "@/core/components/AdminSidebar";
import AdminHeader from "@/core/components/AdminHeader";
export default {
  components: {
    AdminHeader,
    AdminSidebar
  },
  created() {
    this.$store.dispatch("getUserInfo");
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
