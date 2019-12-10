<template>
  <div
    class="wrapper--header"
    :class="changeBackgroundHeader === 2 ? 'active' : ''"
  >
    <div class="content">
      <nav class="navbar navbar-default header-area affix-top ct">
        <div class="d_flex align_items_center header">
          <!--Start: Logo -->
          <router-link
            class="logo mr_auto d_none d_md_block"
            to="/"
            :class="changeBackgroundHeader === 2 ? 'active--logo' : ''"
          >
            <icon-base
              width="72"
              icon-name="Logo Hoot"
              height="36"
              viewBox="0 0 664 301"
            >
              <hoot-logo-black />
            </icon-base>
          </router-link>
          <router-link
            class="logo mr_auto d_block d_md_none"
            to="/"
            :class="changeBackgroundHeader === 2 ? 'active--logo' : ''"
          >
            <icon-base
              width="48"
              icon-name="Logo Hoot"
              height="28"
              viewBox="0 0 417 301"
            >
              <hoot-logo-icon-black />
            </icon-base>
          </router-link>
          <!--Start: Logo -->

          <!-- Start: Navbar -->
          <div class="d_flex nav--menu ml_auto">
            <nav>
              <ul class="d_flex nav--menu">
                <li
                  class="items--header align_items_center d_flex support mr_1"
                  @click="showPopupVideo"
                >
                  <p class="mb_0 pr_1">Hướng dẫn</p>
                  <icon-base
                    icon-name="hướng dẫn"
                    width="20"
                    height="20"
                    viewBox="0 0 415 415"
                  >
                    <icon-play />
                  </icon-base>
                </li>
                <li
                  class="items--header login"
                  :class="changeBackgroundHeader === 2 ? 'active' : ''"
                  @click="goToSignIn"
                >
                  Đăng nhập
                </li>
                <li
                  class="items--header try ml_2"
                  v-if="changeBackgroundHeader === 2"
                  @click="goToSignUp"
                >
                  Trải nghiệm ngay
                </li>
              </ul>
            </nav>
          </div>
          <!-- End: Navbar -->

          <!-- Start: MENU - 980px -->
          <div class="menu position_relative">
            <div @click="showMenu">
              <icon-base
                icon-name="menu"
                width="20"
                height="20"
                viewBox="0 0 500 500"
              >
                <icon-menu />
              </icon-base>
            </div>
            <transition name="slide-fade">
              <ul class="nav--menu-res" v-if="menu === true">
                <span class="close--menu" @click="closeMenu">
                  <icon-base
                    class="icon--close"
                    width="14px"
                    height="14px"
                    viewBox="0 0 18 18"
                  >
                    <icon-cancel></icon-cancel>
                  </icon-base>
                </span>
                <li
                  class="items--header align_items_center d_flex support"
                  @click="showPopupVideoMobile"
                >
                  <p class="mb_0 pr_1">Hướng dẫn</p>
                  <icon-base
                    icon-name="hướng dẫn"
                    width="20"
                    height="20"
                    viewBox="0 0 415 415"
                  >
                    <icon-play />
                  </icon-base>
                </li>
                <li class="items--header login" @click="goToSignIn">
                  <a href="#">Đăng nhập</a>
                </li>
                <li class="items--header" @click="goToSignUp">
                  <a href="#">Đăng ký</a>
                </li>
                <li class="items--header" @click="goToMarket">
                  <a href="#">Cửa hàng nội dung</a>
                </li>
              </ul>
            </transition>
          </div>
          <!-- End: MENU - 980px -->
        </div>
        <!-- /.container-fluid -->
      </nav>
    </div>
    <div class="d_none d_md_block">
      <transition name="popup">
        <video-guide
          v-if="isShowPopupVideo === true"
          @closePopup="isShowPopupVideo = $event"
        />
      </transition>
    </div>
    <div class="d_block d_md_none">
      <transition name="popup--mobile">
        <video-guide-mobile
          v-if="isShowPopupVideoMobile === true"
          @closePopup="isShowPopupVideoMobile = $event"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import VideoGuide from "./popup/guide";
import VideoGuideMobile from "./popup/video";
export default {
  data() {
    return {
      active: false,
      activeIndex: 0,
      menu: false,
      isShowPopupVideo: false,
      isShowPopupVideoMobile: false
    };
  },
  components: {
    VideoGuide,
    VideoGuideMobile
  },
  methods: {
    activeMenu(index) {
      this.activeIndex = index;
      this.active = true;
    },
    showMenu() {
      this.menu = true;
    },
    closeMenu() {
      this.menu = false;
    },
    showPopupVideo() {
      this.isShowPopupVideo = true;
    },
    showPopupVideoMobile() {
      this.isShowPopupVideoMobile = true;
      this.closeMenu();
    },
    goToMarket() {
      const route = this.$router.resolve({ name: "market_home" });

      window.open(route.href, "_blank");
    },
    goToSignIn() {
      // const routeSignIn = this.$router.resolve({ name: "user_signin" });

      // window.open(routeSignIn.href, "_blank");
      this.menu = false;
      this.$router.push({ name: "user_signin" });
    },
    goToSignUp() {
      // const routeSignUp = this.$router.resolve({ name: "user_signup" });

      // window.open(routeSignUp.href, "_blank");
      this.menu = false;
      this.$router.push({ name: "user_signup" });
    }
  },
  computed: {
    changeBackgroundHeader() {
      return this.$store.getters.backgroundHeader;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
