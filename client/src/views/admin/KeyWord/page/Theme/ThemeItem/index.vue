<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <div class="col col--name px_2">
      <span class="sort">{{ theme.name }}</span>
    </div>
    <div class="col col--category px_2">{{ theme.description }}</div>
    <div class="col col--action text_center px_4">
      <span class="mr_2" @click="showInfoSpinTheme(theme._id)">
        <icon-base
          icon-name="Sửa thông tin"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <icon-edit-info />
        </icon-base>
      </span>
      <span @click="deleteSpinTheme(theme)">
        <icon-base
          width="20"
          height="20"
          viewBox="0 0 15 15"
          icon-name="Xóa"
          class="icon--remove"
        >
          <icon-remove />
        </icon-base>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["theme"],
  data() {
    return {};
  },
  methods: {
    showInfoSpinTheme(val) {
      this.$store.dispatch("getSpinThemeById", val);
    },
    deleteSpinTheme(val) {
      this.$emit("deleteTheme", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
