<template>
  <div
    class="banner position_relative"
    :style="{
      backgroundImage: 'url(' + backgroundTool + ')'
    }"
  >
    <div class="ct m_auto position_relative content d_flex content">
      <div class="left">
        <div class="title">
          VŨ KHÍ KHÔNG THỂ THIẾU CHO BÁN HÀNG TRÊN FACEBOOK
        </div>
        <div class="desc">
          CỬA HÀNG NỘI DUNG PHONG PHÚ, TỰ ĐỘNG TÌM KIẾM NỘI DUNG VÀ CHĂM SÓC
          100+ TRANG, NHÓM, TRANG CÁ NHÂN TRÊN FACEBOOK CHỈ VỚI VÀI THAO TÁC
        </div>
        <div class="d_flex action">
          <div class="register mr_3" @click="goToSignUp">
            ĐĂNG KÝ
          </div>
          <div class="goto--market" @click="goToSignIn">
            ĐĂNG NHẬP
          </div>
        </div>
      </div>
      <div class="right">
        <div
          class="image--banner"
          :style="{
            backgroundImage: 'url(' + backgroundBanner + ')'
          }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      backgroundBanner: require("@/assets/images/home/bg--banner.svg"),
      backgroundTool: require("@/assets/images/home/bg--polygon.png")
    };
  },
  methods: {
    goToSignIn() {
      const route = this.$router.resolve({ name: "user_signin" });

      window.open(route.href, "_blank");
    },
    goToSignUp() {
      const routeSignUp = this.$router.resolve({ name: "user_signup" });

      window.open(routeSignUp.href, "_blank");
    }
  }
};
</script>

<style scoped lang="scss">
@import "../index.style";

// Banner
.banner {
  overflow: hidden;
  color: #333;
  padding: 6.25rem 0;
  background-size: cover;
  position: relative;
  background-repeat: no-repeat;
  // background-position: right;
  .title {
    color: #000;
    font-size: 2.5rem;
    line-height: 50px;
    text-transform: capitalize;
    font-weight: 500;
  }
  .desc {
    font-size: 1.125rem;
    padding: 1.7rem 0 2rem 0rem;
  }
  .register,
  .goto--market {
    font-weight: 600;
    font-size: 1.15rem;
    color: #fff;
    background-color: $colorLogo;
    text-transform: uppercase;
    border-radius: 27px;
    border: 2px solid $colorLogo;
    box-shadow: 5px 8.66px 20px 0px rgba(68, 84, 255, 0.078);
    padding: 0.8125rem 0;
    position: relative;
    transition: all 0.03s ease;
    overflow: hidden;
    text-align: center;
    width: 14.0625rem;
    cursor: pointer;
    &:hover {
      color: #fff;
      background: $colorHover;
      border-color: $colorHover;
    }
  }
  .goto--market {
    background-color: transparent;
    color: $colorLogo;
    border: 1.5px solid $colorLogo;
  }
  .left {
    flex: 1;
    padding: 3rem 0;
  }
  .right {
    flex: 1;
    width: 100%;
    // height: 100%;
    .image--banner {
      height: 500px;
      width: 84%;
      margin-left: auto;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
}
</style>
