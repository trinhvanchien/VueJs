<template>
  <div>
    <div class="header">
      <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    </div>
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import BreadCrumb from "./components/breadcrumb";
export default {
  components: {
    BreadCrumb
  },
  data() {
    return {
      breadTitle: "Quản lý gói tài khoản",
      breadDesc:
        "giúp quản lý người dùng dễ dàng và kiểm soát bài đăng của người dùng"
    };
  }
};
</script>

<style scoped></style>
