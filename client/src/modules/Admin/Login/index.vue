<template>
  <div class="wrap d_flex align_items_center justify_content_center">
    <div class="info">
      <h3 class="title mb_3 text_center">Xác thực quản trị viên</h3>
      <form class="form--wrap px_5 py_5" @submit.prevent="signIn">
        <div class="form_group">
          <label>Email đăng nhập</label>
          <input
            type="text"
            class="form_control"
            placeholder="Nhập email ..."
            v-model="user.email"
          />
        </div>

        <div class="form_group">
          <label>Mật khẩu</label>
          <input
            type="password"
            class="form_control"
            placeholder="Nhập mật khẩu"
            v-model="user.password"
          />
        </div>
        <button type="submit" class="btn btn_success form_control">
          Đăng nhập
        </button>
      </form>
    </div>
  </div>
</template>
<script type="text/javascript">
export default {
  data() {
    return {
      user: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async signIn() {
      const dataSender = {
        email: this.user.email,
        password: this.user.password
      };
      await this.$store.dispatch("signInAdmin", dataSender);

      this.$router.push({ name: "admin_dashboard" });
    }
  }
};
</script>
<style lang="scss" scoped>
.wrap {
  background-color: #f7f7f7;
  width: 100vw;
  height: 100vh;
  .title {
    color: #444;
    font-size: 1.75rem;
    font-weight: 600;
  }
  .info {
    margin: auto;
    width: 500px;
    form {
      background-color: #fff;
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.4);
      border-radius: 10px;
      .btn_success {
        background-color: #88c9ff;
        border: 0;
        color: #fff;
        font-weight: 600;
        transition: all 0.4s ease;
        &:hover,
        &:focus {
          background-color: #80bdff;
        }
      }
    }
  }
}
</style>
