<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content d_flex justify_content_center align_items_center">
        <div class="modal--body">
          <div class="content d_flex align_items_center">
            <!-- START: LOADING WHEN SYSTEM CHANGE PASSWORD -->
            <div class="loading--block mt_4 mb_4" v-show="status ===  'loading'">
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
            <div class="success text_center" v-show="status ===  'success'">
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

              <button class="btn--skip mt_3" @click="gotoSignIn">
                ĐI TỚI TRANG ĐĂNG NHẬP
              </button>
            </div>
            <!-- END: SUCCESS WHEN SYSTEM CHANGED PASSWORD -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    status() {
      return this.$store.getters.authStatus;
    }
  },
  methods: {
    gotoSignIn() {
      this.$emit("closePopup", false);
      this.$router.push({name: "user_signin"});
    }
  }
};
</script>
<style lang="scss" scoped>
@import "index.style";
</style>
