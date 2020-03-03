<template>
  <div class="header__default">
    <div class="header__default_wrap d_flex align_items_center px_2 py_2">
      <div
        class="header__avatar d_flex align_items_center justify_content_center"
        @click="openModalMenu"
      >
        <span>{{ user.name | getFirstLetter }}</span>
      </div>
      <div class="header__desc ml_4">
        <span v-if="this.$route.name === 'admin_dashboard'">Trang chủ ADMIN</span>
        <span v-if="this.$route.name === 'admin_package'">Quản lý gói tài khoản</span>
        <span v-if="this.$route.name === 'admin_account'">Quản lý người dùng</span>
        <span v-if="this.$route.name === 'admin_agency'">Quản lý đại lý</span>
        <span v-if="this.$route.name === 'admin_vps'">Quản lý VPS</span>
        <span v-if="this.$route.name === 'admin_categories'">Quản lý danh mục mẫu</span>
        <span v-if="this.$route.name === 'admin_schedule'">Quản lý chiến dịch mẫu</span>
        <span v-if="this.$route.name === 'admin_code'">Quản lý mã gia hạn</span>
      </div>
    </div>
    <mobile-menu :user="user" />
  </div>
</template>
<script>
import MobileMenu from "./MobileMenu";
export default {
  components: {
    MobileMenu
  },
  computed: {
    user() {
      if (this.$store.getters.userInfo === undefined) {
        return;
      }
      return this.$store.getters.userInfo;
    }
  },
  async created() {
    const userInfo = this.$store.getters.userInfo;
    if (userInfo && userInfo.length === 0) {
      await this.$store.dispatch("getUserInfo");
    }
  },
  filters: {
    getFirstLetter(string) {
      if (string === undefined) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  },
  methods: {
    openModalMenu() {
      this.$modalMobile.show({ name: "ms-mobile-menu" });
    }
  }
};
</script>
<style lang="scss" scoped>
.header__default {
  background-color: #f96666;
  color: #fff;
}
.header__avatar {
  border: 2px solid #fff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  span {
    font-size: 2rem;
    font-weight: 700;
  }
}
.header__desc {
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
}
</style>
