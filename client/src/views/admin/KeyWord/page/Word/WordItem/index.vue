<template>
  <div class="item--body d_flex align_items_center px_3 py_2">
    <div class="col col--name px_2">
      <span class="sort">{{ item.name }}</span>
    </div>
    <div class="col col--key px_2">
      <span class="sort">{{ item.key }}</span>
    </div>
    <div class="col col--category px_2">
      <span>
        {{ item.theme.name }}
      </span>
    </div>
    <div class="col col--action px_2 text_center">
      <span class="mr_2" @click="showInfoWord(item._id)">
        <icon-base
          icon-name="Sửa thông tin"
          width="20"
          height="20"
          viewBox="0 0 24 24"
        >
          <icon-edit-info />
        </icon-base>
      </span>
      <span @click="deleteSpinWord(item)">
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
  props: ["item"],
  methods: {
    deleteSpinWord(val) {
      this.$emit("deleteWord", val);
    },
    showInfoWord(val) {
      this.$store.dispatch("getWordById", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
