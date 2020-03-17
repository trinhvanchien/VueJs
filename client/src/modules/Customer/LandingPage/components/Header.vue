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
                  @click="goToMarket"
                >
                  Cửa hàng nội dung
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
import VideoGuide from "./VideoGuide";
import VideoGuideMobile from "./VideoGuideMobile";
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
      this.$router.push({ name: "cus_login" });
    },
    goToSignUp() {
      // const routeSignUp = this.$router.resolve({ name: "user_signup" });

      // window.open(routeSignUp.href, "_blank");
      this.menu = false;
      this.$router.push({ name: "cus_register" });
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
$color: #282828;
$colorLogo: rgb(237, 28, 36);
$colorHover: #c31920;
.wrapper--header {
  // width: 100vw;
  // height: 93px;
  position: fixed;
  width: 100vw;
  z-index: 1000;
  padding: 0.5rem 0;
  .logo {
    color: $color;
    &.active--logo {
      color: #fff;
    }
  }
  &.active {
    background-color: $color;
    box-shadow: 0 0 7px 1px rgba(0, 0, 0, 0.18);
    transition: background-color 0.4s linear;
    .nav--menu {
      .items--header {
        color: #fff;
        font-size: 0.875rem;
        opacity: 1;
        &:hover {
          transition: 0.4s;
          color: $colorLogo;
        }
      }
    }
  }
  .nav--menu {
    .items--header {
      font-size: 0.875rem;
      transition: 0.4s;
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
      &.login:hover {
        border-color: $colorLogo;
      }
      &.login {
        border: 1px solid #282828;
        border-radius: 1rem;
      }
      &.active {
        color: $colorLogo;
        border-color: #fff;
      }
    }
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
  //  Transition
  .slide-fade-enter-active {
    transition: all 0.3s ease;
  }
  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active below version 2.1.8 */ {
    transform: translateX(100%);
    opacity: 0;
  }

  // STYLE
  .content {
    // overflow: hidden;
    // height: 90px;
    color: #fff;
    &.active {
      height: 93px;
      // background: #ccc;
    }
  }
  .header-area {
    // background: #fafafa;
  }
  .nav--menu {
    .items--header {
      cursor: pointer;
      position: relative;
      color: #333;
      font-size: 1rem;
      font-weight: 600;
      padding: 0.5rem 0.75rem;
      &.try {
        color: #fff;
        background-color: $colorLogo;
        border-radius: 0.5rem;
        transition: 0.4s;
        &:hover {
          color: #fff;
          background: $colorHover;
        }
      }
    }
  }

  .menu {
    display: none;
    svg {
      cursor: pointer;
    }
    .close--menu {
      position: absolute;
      right: 0.8rem;
      top: 0.5rem;
      color: #fff;
    }
    .nav--menu-res {
      width: 60vw;
      height: 100vh;
      right: 0;
      top: 0;
      background: $color;
      position: fixed;
      &:before {
        content: "";
        height: 100vh;
        width: 100vw;
        position: absolute;
        top: 0;
        left: -100vw;
        background: #cccccc85;
      }
      .support {
        margin-top: 30px;
      }
      li {
        cursor: pointer;
        padding: 0.625rem 0.9375rem;
        border-bottom: 1px solid #484848;
        color: #fff;
        &:hover {
          background: $colorHover;
          border-color: $colorHover;
        }
      }
    }
  }
}

.popup--mobile-enter {
  transform: translateX(100%);
}

.popup--mobile-enter-to {
  transition: transform 0.75s;
  transform: translateX(0);
}

.popup--mobile-leave-to {
  transition: transform 0.75s;
  transform: translateX(100%);
}

//  RESPONSIVE

@media screen and (max-width: 980px) {
  .wrapper--header {
    .header-area {
      // padding: 1.25rem 1rem;
    }
    .header {
      .nav--menu {
        display: none !important;
      }
      .menu {
        z-index: 100;
        display: block;
        color: $colorLogo;
      }
    }
  }
}
</style>
