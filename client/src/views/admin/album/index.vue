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
      breadTitle: "Quản lý Album",
      breadDesc: "giúp quản lý ảnh mẫu sử dụng trong kế hoạch đăng"
    };
  }
};
</script>

<style scoped></style>
