<template>
  <div class="redirect">
    Đang chuyển trang vui lòng chờ ít giây ...
  </div>
</template>

<script>
import CookieFunction from "@/core/utils/cookie";
export default {
  async created() {
    //remove Cookie
    await CookieFunction.removeCookie("sid");
    await CookieFunction.removeCookie("uid");
    await CookieFunction.removeCookie("cfr");
    await CookieFunction.removeCookie("token");
    await CookieFunction.removeCookie("_sub");
    await CookieFunction.removeCookie("__v");
    //redirect to signin
    this.$router.push({ name: "cus_login" });
  }
};
</script>

<style scoped></style>
