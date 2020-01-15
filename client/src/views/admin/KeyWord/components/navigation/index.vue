<template>
  <div class="nav">
    <div class="nav--wrap d_flex align_items_center py_2">
      <div
        class="nav--item mr_3"
        :class="this.$route.name === 'key_theme' ? 'active' : ''"
        @click="redirectTheme"
      >
        Chủ đề
      </div>
      <div
        class="nav--item"
        :class="this.$route.name === 'key_word' ? 'active' : ''"
        @click="redirectKeyWord"
      >
        Từ khóa
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    redirectTheme() {
      this.$router.push({ name: "key_theme" });
    },
    redirectKeyWord() {
      this.$router.push({ name: "key_word" });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  &--wrap {
  }
  &--item {
    cursor: pointer;
    font-size: 0.875rem;
    padding: 0.5rem 0;
    text-transform: uppercase;
  }
  .active {
    color: #f96666;
    text-decoration: underline;
  }
}
</style>
