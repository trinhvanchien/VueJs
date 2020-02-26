<template>
  <div class="modal--wrapper">
    <VuePerfectScrollbar
      class="scroll-homepage"
      @ps-scroll-y="scrollHandle"
      ref="menu"
    >
      <div class="modal--content">
        <!-- Start: Header -->
        <app-header />
        <!-- End: Header -->
        <!-- Start: Main -->
        <app-main />
        <!-- Start: Main -->
        <!-- Start: Footer -->
        <app-footer />
        <!-- Start: Footer -->
      </div>
    </VuePerfectScrollbar>
  </div>
</template>

<script>
import AppHeader from "./components/Header";
import AppMain from "./components/Main";
import AppFooter from "./components/Footer";
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    AppHeader,
    AppMain,
    AppFooter,
    VuePerfectScrollbar
  },
  data() {
    return {
      settings: {
        maxScrollbarLength: 10,
        minScrollbarLength: 10
      }
    };
  },
  methods: {
    scrollHandle(evt) {
      if (evt.path[0].childNodes[0].className === "modal--content") {
        if (evt.srcElement.scrollTop === 0) {
          this.$store.dispatch("changeBackgroundHeader", 1);
        } else {
          this.$store.dispatch("changeBackgroundHeader", 2);
        }
      }
    }
  },
  async created() {
    // if (window.location.hostname === "hoot.vn") {
    //   return false;
    // } else {
    //   // Request to server which get info of agency
    //   await this.$store.dispatch("getAgencyInfo", {
    //     domain: window.location.hostname
    //   });
    //   CookieFunction.setCookie("aid", this.agencyInfo.agency._id);
    // }
  }
};
</script>

<style lang="scss" scoped>
.modal--wrapper {
  .scroll-homepage {
    height: 100vh;
    width: 100vw;
  }
}
</style>
