<template>
  <div class="key">
    <breadcrumb :nameBread="nameBread" :subBread="subBread" />
    <div class="main">
      <navigation />
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "./components/navigation";
export default {
  components: {
    Navigation
  },
  data() {
    return {
      nameBread: "Quản lý từ khóa",
      subBread:
        "giúp bạn quản lý từ khóa theo chủ đề, quản lý các từ đống nghĩa theo từ khóa"
    };
  }
};
</script>

<style scoped></style>
