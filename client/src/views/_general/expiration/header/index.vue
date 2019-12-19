<template>
  <div class="wrapper--header">
    <div class="ct pt_4">
      <!-- Start: Header Top -->
      <div class="header--top text_right d_flex">
        <!-- Start: Logo -->
        <div
          class="logo d_flex align_items_center justify_content_center mb_3 mr_auto"
        >
          <icon-base
            width="72"
            height="36"
            viewBox="0 0 664 301"
            icon-name="Hoot logo"
          >
            <hoot-logo-black />
          </icon-base>
        </div>
        <!-- Start: Logo -->
        <router-link
          :to="{ name: 'user_signin' }"
          tag="a"
          class="link--login ml_auto"
        >
          Đăng nhập
        </router-link>
      </div>
      <!-- End: Header Top -->
      <!-- Start: Header Main -->
      <div class="header--main mt_3 pb_5">
        <!-- Start: Alert -->
        <div class="alert--expiration mx_auto p_4">
          <div class="content text_center">
            <icon-base
              icon-name="Sad"
              width="100"
              height="100"
              viewBox="0 0 450 450"
            >
              <icon-sad />
            </icon-base>
            <div class="title">
              Tài khoản của bạn đã hết hạn :-(
            </div>
            <div class="desc mt_3">
              Tài khoản của bạn đã hết hạn. Nếu muốn tiếp tục sử dụng dịch vụ.
              Bạn hãy gia hạn để sử dụng dịch vụ.
            </div>
          </div>
        </div>
        <!-- End: Alert -->
      </div>
      <!-- End: Header Main -->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.wrapper--header {
  background: #f7f7f7;
  .header--top {
    .link--login {
      color: #fff;
      cursor: pointer;
      font-size: 0.875rem;
      font-weight: 600;
      // opacity: 0.85;
      height: 40px;
      line-height: 40px;
      background: #ecbf7b;
      width: 100px;
      text-align: center;
      border-radius: 10px;
      display: block;
      text-decoration: none;
      transition: all 0.4s ease;
      &:hover {
        background: #e0a448;
      }
    }
  }
  .header--main {
    .logo {
      color: #666;
      .icon--logo {
        color: #fff;
        opacity: 0.85;
      }
    }
    .alert--expiration {
      // background-color: #fff;
      // box-shadow: 0 0 10px rgba(0, 0, 0, .1);
      // border: 1px solid #e4e4e4;
      border-radius: 0.5rem;
      width: 660px;
      .content {
        .title {
          font-size: 1.5rem;
          font-weight: 600;
        }
        .desc {
          color: #666;
          font-size: 0.9375rem;
          // font-size: 0.875rem;
        }
      }
    }
  }
}
@media screen and (max-width: 767px) {
  .wrapper--header {
    .header--main {
      .alert--expiration {
        width: 80vw;
        padding: 0 !important;
      }
    }
  }
}
</style>
