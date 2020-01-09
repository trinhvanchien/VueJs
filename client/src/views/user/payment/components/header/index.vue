<template>
  <div class="content--header-help">
    <div class="ct">
      <div
        class="d_flex align_items_center justify_content_between p_2 mx_0 mb_3"
      >
        <!-- Start header logo help   -->
        <div class="">
          <div class="logo d_flex align_items_end" @click="goToHomePage">
            <icon-base width="72" height="36" viewBox="0 0 664 301">
              <hoot-logo-white />
            </icon-base>
          </div>
        </div>
        <!-- End header logo help -->
        <!-- Start search help -->
        <div class="wrap">
          <div class="wrap--search">
            <div class="search d_flex align_items_center position_relative">
              <icon-base
                icon-name="search"
                width="26"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-input-search />
              </icon-base>
              <input
                type="text"
                placeholder="Xin chào, chúng tôi có thể giúp gì cho bạn?"
                v-model="keyword"
              />
            </div>
          </div>
        </div>
        <!-- End search help   -->
        <!-- Start back facebook   -->
        <div class="d_flex align_items_center">
          <div class="user d_flex align_items_center" v-if="userMember.name">
            <div class="user--name">
              <small class="mr_1">Xin chào :</small>
              <span>{{ userMember.name }}</span>
            </div>
            <div class="user--image ml_2">
              <div
                class="user--image-av av bg"
                v-if="userMember.imageAvatar"
                :style="{
                  backgroundImage: 'url(' + userMember.imageAvatar + ')'
                }"
              ></div>
              <div
                v-else
                class="user--image-default av bg d_flex align_items_center justify_content_center"
              >
                <span>{{ userMember.name | getFirstLetter }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- End back facebook   -->
      </div>
    </div>
  </div>
</template>

<script>
import CookieFunction from "@/utils/functions/cookie";
export default {
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    userMember() {
      return this.$store.getters.userInfoMember;
    }
  },
  created() {
    const uid = CookieFunction.getCookie("uid");
    if (uid) {
      this.$store.dispatch("getUserInfoMember", uid);
    } else {
      return;
    }
  },
  methods: {
    goToHomePage() {
      this.$router.push({ name: "homepage" });
    }
  },
  filters: {
    getFirstLetter(string) {
      if (string === undefined) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
