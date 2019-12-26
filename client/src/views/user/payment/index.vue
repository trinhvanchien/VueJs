<template>
  <div class="wrapper">
    <!-- Start: Desktop Component-->
    <div class="wrap--content position_relative d_none d_md_block">
      <div class="wrap--content-header">
        <app-header />
      </div>
      <div class="wrap--content-main">
        <router-view />
      </div>
      <div class="wrap--content-footer">
        <app-footer />
      </div>
      <!-- Start: Component chat fanpage -->
      <!-- End: Component chat fanpage -->
    </div>
    <!-- End: Desktop Component-->
  </div>
</template>
<script>
import AppHeader from "./components/header";
import AppFooter from "./components/footer";

export default {
  components: {
    AppHeader,
    AppFooter
  },
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  color: #666;
  background-color: #f8f8f8;
  font-family: Helvetica, Arial, sans-serif;
  /*min-height: 100vh;*/
  .wrap--content-main {
    width: 100%;
    /*min-height: calc(100vh - 196px);*/
  }
  .wrap--content-mobile {
    background-color: #fff;
  }
  .wrap--content-footer {
    background-color: #f7f7f7;
  }
  .mobile-scroll {
    /*height: calc(100vh - 110px);*/
  }
}
</style>
