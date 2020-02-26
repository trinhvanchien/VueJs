<template>
  <form v-on:submit.prevent class="session">
    <div class="logo text_center mb_0 mb_sm_2">
      <icon-base width="72" height="36" viewBox="0 0 664 301">
        <hoot-logo-white />
      </icon-base>
    </div>
    <!-- Start: Card -->
    <div class="card px_5 py_4 text_center" v-if="isShowPopupAlert === false">
      <!-- Start: Header -->
      <div class="card--header mt_4 mb_3">
        <icon-base width="100" height="100" viewBox="0 0 280 280">
          <icon-reset-password></icon-reset-password>
        </icon-base>
      </div>
      <!-- End: Header -->
      <!-- Start: Body -->
      <div class="card--body">
        <div class="title mt_2">Đặt lại mật khẩu</div>
        <div class="desc my_3">
          Nhập email tài khoản Hoot của bạn, chúng tôi sẽ gửi đường dẫn đặt lại
          mật khẩu thông qua email.
        </div>
        <!-- Start: Alert -->
        <div
          class="alert--error text_left mb_2"
          v-if="this.$store.getters.authError.status === 'error'"
        >
          {{ this.$store.getters.authError.message }}
        </div>
        <div class="alert--error text_left mb_2" v-if="validateError">
          {{ validateErrorText }}
        </div>
        <!-- End: Alert -->
        <!-- Start: Form Wrap -->
        <div class="form--wrap">
          <!-- Start: Password -->
          <div
            class="form--card d_flex align_items_center position_relative px_3"
          >
            <div class="form--icon mr_3">
              <icon-base
                class="icon--lock"
                width="20px"
                height="26px"
                viewBox="0 0 14 20"
              >
                <icon-lock></icon-lock>
              </icon-base>
            </div>
            <div class="form--control mr_2">
              <div class="desc">Mật khẩu</div>
              <input
                v-if="isShowPassword === false"
                type="password"
                class="form--input"
                placeholder="Nhập mật khẩu"
                v-model="reset.password"
              />
              <input
                v-if="isShowPassword === true"
                type="text"
                class="form--input"
                placeholder="Nhập mật khẩu"
                v-model="reset.password"
              />
            </div>
            <div class="form--validate d_flex align_items_center">
              <div @click="isShowPassword = !isShowPassword">
                <icon-base
                  v-if="isShowPassword === true"
                  class="icon--eye"
                  width="22px"
                  height="18px"
                  viewBox="0 0 400 480"
                >
                  <icon-eye></icon-eye>
                </icon-base>
                <icon-base
                  v-if="isShowPassword === false"
                  class="icon--eye"
                  width="22px"
                  height="18px"
                  viewBox="0 0 400 480"
                >
                  <icon-eye-hidden></icon-eye-hidden>
                </icon-base>
              </div>
              <div class="ml_2">
                <icon-base
                  v-if="statusClassPassed.password"
                  class="icon--check"
                  width="16px"
                  height="16px"
                  viewBox="0 0 20 20"
                >
                  <icon-check-active></icon-check-active>
                </icon-base>
                <icon-base
                  v-if="statusClassError.password"
                  class="icon--attention"
                  width="16px"
                  height="16px"
                  viewBox="0 0 520 520"
                >
                  <icon-attention></icon-attention>
                </icon-base>
                <div class="tooltip--error position_absolute">
                  {{ errorText.password }}
                </div>
              </div>
            </div>
          </div>
          <!-- End: Password -->
          <!-- Start: Confirm Password -->
          <div
            class="form--card d_flex align_items_center position_relative px_3"
          >
            <div class="form--icon mr_3">
              <icon-base
                class="icon--lock"
                width="20px"
                height="26px"
                viewBox="0 0 14 20"
              >
                <icon-lock-check></icon-lock-check>
              </icon-base>
            </div>
            <div class="form--control mr_2">
              <div class="desc">Xác nhận mật khẩu</div>
              <input
                v-if="isShowConfirmPassword === false"
                type="password"
                class="form--input"
                placeholder="Nhập lại mật khẩu"
                v-model="reset.confirmPassword"
              />
              <input
                v-if="isShowConfirmPassword === true"
                type="text"
                class="form--input"
                placeholder="Nhập lại mật khẩu"
                v-model="reset.confirmPassword"
              />
            </div>
            <div class="form--validate d_flex align_items_center">
              <div @click="isShowConfirmPassword = !isShowConfirmPassword">
                <icon-base
                  v-if="isShowConfirmPassword === true"
                  class="icon--eye"
                  width="22px"
                  height="18px"
                  viewBox="0 0 400 480"
                >
                  <icon-eye></icon-eye>
                </icon-base>
                <icon-base
                  v-if="isShowConfirmPassword === false"
                  class="icon--eye"
                  width="22px"
                  height="18px"
                  viewBox="0 0 400 480"
                >
                  <icon-eye-hidden></icon-eye-hidden>
                </icon-base>
              </div>
              <div class="ml_2">
                <icon-base
                  v-if="statusClassPassed.confirmPassword"
                  class="icon--check"
                  width="16px"
                  height="16px"
                  viewBox="0 0 20 20"
                >
                  <icon-check-active></icon-check-active>
                </icon-base>
                <icon-base
                  v-if="statusClassError.confirmPassword"
                  class="icon--attention"
                  width="16px"
                  height="16px"
                  viewBox="0 0 520 520"
                >
                  <icon-attention></icon-attention>
                </icon-base>
                <div class="tooltip--error position_absolute">
                  {{ errorText.confirmPassword }}
                </div>
              </div>
            </div>
          </div>
          <!-- End: Confirm Password -->
        </div>
        <!-- End: Form Wrap -->
      </div>
      <!-- End: Body -->
      <!-- Start: Footer -->
      <div class="card--footer mt_3">
        <button class="btn--submit" @click="sendPassword">Đổi mật khẩu</button>
      </div>
      <!-- End: Footer -->
    </div>
    <!-- End: Card -->
    <!-- START: ALERT WHEN SYSTEM CHANGE PASSWORD -->
    <div
      class="content d_flex align_items_center justify_content_center"
      v-else
    >
      <!-- START: LOADING WHEN SYSTEM CHANGE PASSWORD -->
      <div class="loading--block mt_4 mb_4" v-show="status === 'loading'">
        <div class="mx_auto">
          <div class="loading--bar position_relative mx_auto">
            <div class="percent position_absolute"></div>
          </div>
        </div>
        <div class="desc text_center mt_2">
          Vui lòng chờ, đang thay đổi mật khẩu của bạn ...
        </div>
      </div>
      <!-- END: LOADING WHEN SYSTEM CHANGE PASSWORD -->
      <!-- START: SUCCESS WHEN SYSTEM CHANGED PASSWORD -->
      <div class="success text_center" v-show="status === 'success'">
        <icon-base
          class="icon--user mr_1"
          width="100"
          height="100"
          viewBox="0 0 52 52"
          icon-name="Thành công"
        >
          <icon-success />
        </icon-base>
        <div class="py_3 title">Mật khẩu của bạn đã được thay đổi</div>

        <button class="btn--submit mt_3" @click="gotoSignIn">
          ĐI TỚI TRANG ĐĂNG NHẬP
        </button>
      </div>
      <!-- END: SUCCESS WHEN SYSTEM CHANGED PASSWORD -->
    </div>
    <!-- END: ALERT WHEN SYSTEM CHANGE PASSWORD -->
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
  </form>
</template>

<script>
/* eslint-disable prettier/prettier */
/* eslint-disable global-require */
import PopupAlert from "../components/PopupAlert";
export default {
  components: {
    PopupAlert
  },
  data() {
    return {
      errorText: {
        password: "",
        confirmPassword: ""
      },
      isShowPassword: false,
      isShowConfirmPassword: false,
      isShowPopupAlert: false,
      reset: {
        password: "",
        confirmPassword: ""
      },
      statusClassError: {
        password: false,
        confirmPassword: false
      },
      statusClassPassed: {
        password: false,
        confirmPassword: false
      },
      validateError: false,
      validateErrorText: ""
    };
  },
  computed: {
    userInfo(){
      return this.$store.getters.infoUserEmail;
    },
    code(){
      return this.$store.getters.code;
    },
    status() {
      return this.$store.getters.authStatus;
    }
  },
  methods: {
    async sendPassword() {
      const dataSender = {
        password: this.reset.password,
        email: this.userInfo.email,
        token: window.location.href
      };

      // Validate
      if (this.reset.password === "") {
        this.validateError = true;
        this.validateErrorText = "Bạn chưa nhập mật khẩu!";
        return;
      } else if (this.reset.confirmPassword === "") {
        this.validateError = true;
        this.validateErrorText = "Bạn chưa xác nhận mật khẩu!";
        return;
      } else if ( this.statusClassError.password ) {
        this.validateError = true;
        this.validateErrorText = this.errorText.password;
        return;
      } else if ( this.statusClassError.confirmPassword ) {
        this.validateError = true;
        this.validateErrorText = this.errorText.confirmPassword;
        return;
      }

      // Reset validateError & validateErrorText before send request
      this.validateError = false;
      this.validateErrorText = "";

      await this.$store.dispatch( "getNewPassword", dataSender );
      this.isShowPopupAlert = true;
    },
    gotoSignIn() {
      this.isShowPopupAlert = false;
      this.$router.push({name: "user_signin"});
    }
  },
  watch: {
    "reset.password"( value ) {
      this.errorText.password = "Mật khẩu nằm trong khoảng 6-20 kí tự!";
      this.statusClassError.password = true;
      this.statusClassPassed.password = false;
      if ( value.length > 5 && value.length < 20 ) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = true;
      } else if ( value.length === 0 ) {
        this.errorText.password = "";
        this.statusClassError.password = false;
        this.statusClassPassed.password = false;
      }
    },
    "reset.confirmPassword"( value ) {
      this.errorText.confirmPassword = "Mật khẩu không trùng nhau!";
      this.statusClassError.confirmPassword = true;
      this.statusClassPassed.confirmPassword = false;
      if ( value === this.reset.password ) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = true;
      } else if ( value.length === 0 ) {
        this.errorText.confirmPassword = "";
        this.statusClassError.confirmPassword = false;
        this.statusClassPassed.confirmPassword = false;
      }
    }
  }
};

</script>

<style scoped lang="scss">
@import "./styles/index.style";
</style>
