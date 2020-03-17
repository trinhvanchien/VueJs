<template>
  <div class="wrap">
    <div class="container">
      <div class="row">
        <div class="mt-4">
          <strong style="font-size:30px">Quản lý từ đồng nghĩa</strong>
          <span class="ml-3"
            >giúp bạn quản lí từ khóa theo chủ đề, quản lí các từ đồng nghĩa
            theo từ khóa</span
          >
          <Navigation />
        </div>
      </div>
    </div>
    <router-view />
  </div>
</template>
<script>
import Navigation from "../Spin/components/Navigation";
export default {
  components: {
    Navigation
  }
};
</script>
