<template>
  <div class="session">
    <div class="logo text_center mb_0 mb_sm_2">
      <icon-base width="72" height="36" viewBox="0 0 664 301">
        <hoot-logo-white />
      </icon-base>
    </div>
    <!-- Start: Card -->
    <div class="card px_5 py_4 text_center">
      <!-- Start: Header -->
      <div class="card--header mt_4 mb_3">
        <icon-base width="100" height="100" viewBox="0 0 280 280">
          <icon-reset-password></icon-reset-password>
        </icon-base>
      </div>
      <!-- End: Header -->
      <!-- Start: Body -->
      <div class="card--body">
        <div class="title mt_2"></div>
        <div class="alert mt_4">
          Chúng tôi vừa gửi một email với đường dẫn đặt lại mật khẩu tới
          <span class="text--bold">{{ email }}</span
          >. Vui lòng kiểm tra email để khôi phục tài khoản của bạn.
        </div>
      </div>
      <!-- End: Body -->
      <!-- Start: Footer -->
      <div class="card--footer mt_3">
        <div class="btn--submit mb_5" @click="gotoEmail">Đi tới email</div>
        <router-link class="link--custom" to="/signin">Đăng nhập</router-link>
      </div>
      <!-- End: Footer -->
    </div>
    <!-- End: Card -->
    <!-- Start: Footer -->
    <div class="footer d_flex justify_content_center mt_2">
      <div class="link--group">
        <a
          class="link--group-item mr_3"
          href="https://www.hoot.vn/help"
          target="_blank"
          >Trợ giúp</a
        >
        <a
          class="link--group-item mr_3"
          href="https://www.hoot.vn/help"
          target="_blank"
          >Bảo mật</a
        >
        <a
          class="link--group-item"
          href="https://www.hoot.vn/help"
          target="_blank"
          >Điều khoản</a
        >
      </div>
    </div>
    <!-- End: Footer -->
  </div>
</template>

<script>
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import StringFunction from "@/core/utils/string";

export default {
  props: [ "email" ],
  methods: {
    gotoEmail() {
      const emailType = StringFunction.findSubString( this.email, "@", "." );
      let routeData = "https://mail.google.com";

      if ( emailType === "yahoo" ) {
        routeData = "https://mail.yahoo.com";
      }

      window.open(routeData, '_blank');
    }
  }
};


</script>

<style scoped lang="scss">
.session {
  .card {
    background-color: #272a2c;
    border-color: #444;
    border-radius: 0.625rem;
    color: #f7f7f7;
    font-size: 0.95rem;
    width: 460px;
    height: 560px;
    .card--body {
      .alert {
        background-color: rgba(47, 49, 54, 0.7);
        border-radius: 0.5rem;
        color: #ccc;
        font-size: 0.95rem;
        padding: 0.75rem;
        .text--bold {
          color: #f7f7f7;
          font-weight: 600;
        }
      }
      .title {
        font-size: 1.5rem;
        font-weight: 600;
      }
      .form--wrap {
        .form_group {
          .form_control {
            border: 0;
            border-bottom: 1px solid #444;
            border-radius: 0;
            font-size: 0.95rem;
            font-weight: 600;
            padding: 0.75rem 0.75rem 0.75rem 2rem !important;
            transition: all 0.4s ease;
            &::placeholder {
              color: #666;
              font-size: 0.875rem;
              font-weight: normal;
            }
            &:active,
            &:hover,
            &:focus {
              border-color: #ed1c24;
              box-shadow: none;
              outline: 0;
            }
            &.error {
              border-color: #f96666;
            }
          }
          .icon {
            top: 8px;
            .icon--envelope {
              color: #999;
            }
          }
        }
        .text--error {
          color: #ff3333;
          font-size: 0.825rem;
        }
      }
    }
    .card--footer {
      .btn--submit {
        background-color: #ed1c24;
        border-radius: 0.625rem;
        color: #fff;
        cursor: pointer;
        font-weight: 600;
        padding: 0.5rem 0.75rem;
        transition: all 0.4s ease;
        &:hover {
          background-color: #c31920;
        }
      }
      .link--custom {
        color: #ed1c24;
        font-size: 0.875rem;
        text-transform: uppercase;
      }
    }
  }
  .footer {
    .link--group {
      &-item {
        color: #999;
        font-size: 0.825rem;
        font-weight: 600;
        text-decoration: none;
        opacity: 0.8;
        transition: all 0.4s ease;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
}

/* Responsive */
@media screen and (max-width: 576px) {
  .session {
    padding: 1rem 0;
    .card {
      border: 0;
      padding: 0 1rem!important;
      font-size: 0.875rem;
      width: 100%;
      height: auto;
    }
    .footer {
      .link--group {
        &-item {
          font-size: 0.8rem;
        }
      }
    }
  }
}

</style>
