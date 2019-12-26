<template>
  <div class="content--header-help">
    <div class="ct">
      <div class="r mx_0 mb_3">
        <!-- Start header logo help   -->
        <div class="c_md_3">
          <div class="logo d_flex align_items_end pb_4">
            <icon-base width="72" height="36" viewBox="0 0 664 301">
              <hoot-logo-white />
            </icon-base>
          </div>
        </div>
        <!-- End header logo help -->
        <!-- Start search help -->
        <div class="c_md_6">
          <div class="wrap--search">
            <div class="search">
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
        <div class="c_md_3 d_flex align_items_center">
          <div class="content--back">
            <div class="icon">
              <icon-base
                icon-name="back"
                width="25"
                height="22"
                viewBox="0 0 25 25"
              >
                <icon-logout />
              </icon-base>
            </div>
            <router-link to="/">
              <div class="text">
                Quay lại Hoot
              </div>
            </router-link>
          </div>
        </div>
        <!-- End back facebook   -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    goToHelpHome() {
      this.$router.push({ name: "help" });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
