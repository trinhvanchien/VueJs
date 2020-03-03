<template>
  <div class="account">
    <bread-crumb :nameBread="nameBread" :subBread="subBread" />
    <div class="account--body card card_body p_4">
      <app-navigation :isGrid="isGrid" @changeLayout="isGrid = $event" />
      <div v-if="isGrid" class="account--grid">
        <app-grid-view />
      </div>
      <div v-else class="list--content">
        <app-list-view />
      </div>
    </div>
    <modal-active-by-code />
  </div>
</template>
<script>
import AppNavigation from "../components/DesktopNavigation";
import AppGridView from "../components/DesktopGrid";
import AppListView from "../components/DesktopList";
import ModalActiveByCode from "../components/ModalActive";
export default {
  components: {
    AppNavigation,
    AppGridView,
    AppListView,
    ModalActiveByCode
  },
  data() {
    return {
      nameBread: "Quản lý tài khoản",
      subBread: "gia hạn, chỉnh sửa, lấy lại mật khẩu cho người dùng",
      isGrid: true
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  created() {
    this.$store.dispatch("getAllUserAdmin");
  }
};
</script>
<style lang="scss">
.account {
  width: 100%;
  &--body {
    background-color: #fff;
    border: 0;
    border-radius: 8px;
  }
}
</style>
