<template>
  <div
    class="post--navigation d_flex align_items_center mb_4"
    :data-theme="currentTheme"
  >
    <!-- Start: Navigation Left -->
    <div class="btn--create mr_3" @click="createPost">Viết bài mới</div>
    <router-link
      class="mr_2"
      tag="button"
      :to="{ name: 'market_post' }"
      active-class="active"
      exact
    >
      Tất cả bài viết
    </router-link>
    <!-- End: Navigation Left -->
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    newPost() {
      return this.$store.getters.newPost;
    }
  },
  methods: {
    async createPost() {
      await this.$store.dispatch("setPostDefaultMarket");
      await this.$store.dispatch("getProductDefault");
      await this.$store.dispatch("setPostDefaultStatus", 1);
      await this.$store.dispatch("setVariableControl", 0);
      this.$router.push({ name: "market_post_create" });
    }
  }
};
</script>

<style lang="scss" scoped>
.post--navigation {
  height: 40px;
  > button {
    background-color: transparent;
    border: 0;
    border-radius: 0.625rem;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    height: 100%;
    outline: none;
    padding: 0 0.5rem;
    transition: all 0.4s ease;
  }
  .btn--create {
    background-color: #ed1c24;
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    font-size: 0.95rem;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 0.75rem;
    transition: all 0.4s ease;
    &:hover {
      background-color: #c31920;
    }
  }
  .divider {
    height: 16px;
    width: 2px;
  }
}

/* Theme Color */
.post--navigation[data-theme="light"] {
  button {
    color: #999999;
    &:hover,
    &.active {
      color: #ed1c24;
    }
  }
  .divider {
    background-color: #ccc;
  }
}

.post--navigation[data-theme="dark"] {
  button {
    color: #999999;
    &:hover,
    &.active {
      color: #ed1c24;
    }
  }
  .divider {
    background-color: #666;
  }
}
</style>
