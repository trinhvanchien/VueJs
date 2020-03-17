<template>
  <div class="nav">
    <div class="nav--wrap d_flex align_items_center py_2">
      <div
        class="nav--item mr_3"
        :class="this.$route.name === 'spin_theme' ? 'active' : ''"
        @click="redirectTheme"
      >
        Chủ đề
      </div>
      <div
        class="nav--item"
        :class="this.$route.name === 'spin_word' ? 'active' : ''"
        @click="redirectKey"
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
      this.$router.push({ name: "spin_theme" });
    },
    redirectKey() {
      this.$router.push({ name: "spin_word" });
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
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
