<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div
        class="modal--content d_flex flex_column align_items_center justify_content_center px_3 py_4"
      >
        <div v-if="isShowConfirm === false">
          <div class="modal--header mb_2">
            <div class="title text_center">Đặt lại mật khẩu</div>
          </div>
          <div class="renew--body">
            <div class="p_2 text_white bg_danger alert mb_2">
              <span
                >CẢNH BÁO: hành động này bắt buộc phải có sự đồng ý của khách
                hàng, vui lòng xác nhận lại nếu muốn tiếp tục thực hiện</span
              >
            </div>
            <div class="form_group">
              <label class="font_weight_bold">Email người dùng:</label>
              <input
                type="text"
                placeholder="Nhập email người dùng"
                class="form_control"
                v-model="user.email"
              />
            </div>
            <div class="form_group">
              <label class="font_weight_bold">Mật khẩu mới:</label>
              <input
                type="password"
                placeholder="Nhập mật khẩu mới"
                class="form_control"
                v-model="newPassword"
              />
            </div>
          </div>
          <div
            class="modal--footer d_flex justify_content_between align_items_center"
          >
            <button class="btn--skip" @click="closePopup()">HỦY</button>
            <button class="btn--submit" @click="renewPassword()">
              ĐỔI MẬT KHẨU
            </button>
          </div>
        </div>
        <!-- START: CONFIRM ACTION RENEW PASSWORD -->
        <div class="modal--body" v-else>
          <div class="content d_flex align_items_center">
            <!-- START: LOADING WHEN SYSTEM CHANGE PASSWORD -->
            <div class="loading--block mt_4 mb_4" v-show="status === 'loading'">
              <div class="mx_auto">
                <div class="loading--bar position_relative mx_auto">
                  <div class="percent position_absolute"></div>
                </div>
              </div>
              <div class="desc text_center mt_2">
                Vui lòng chờ, đang thay đổi mật khẩu ...
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
              <div class="py_3 title">Mật khẩu đã được thay đổi</div>

              <button class="btn--skip mt_3" @click="closePopup">
                ĐÓNG THÔNG BÁO
              </button>
            </div>
            <!-- END: SUCCESS WHEN SYSTEM CHANGED PASSWORD -->
            <!-- START: ERROR WHEN SYSTEM CHANGED PASSWORD -->
            <div
              class="error text_white text_center bg_danger py_3 px_2"
              v-show="status === 'error'"
            >
              <span
                >Xảy ra lỗi trong quá trình xử lý trên hệ thống, vui lòng thử
                lại</span
              >
            </div>
            <!-- END: ERROR WHEN SYSTEM CHANGED PASSWORD -->
          </div>
        </div>
        <!-- END: CONFIRM ACTION RENEW PASSWORD -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["user"],
  data() {
    return {
      newPassword: "",
      isShowConfirm: false
    };
  },
  computed: {
    ...mapGetters({ status: "authStatus" })
  },
  methods: {
    ...mapActions({ renew: "renewPasswordUserAccount" }),
    async renewPassword() {
      let dataSender;
      if (this.newPassword.length === 0) {
        this.isShowAlert = true;
        return;
      } else {
        dataSender = {
          email: this.user.email,
          newPassword: this.newPassword
        };
        this.isShowConfirm = true;
        await this.renew(dataSender);
      }
    },
    closePopup() {
      this.$emit("closeDialog", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
