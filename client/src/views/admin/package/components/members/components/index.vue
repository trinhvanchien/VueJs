<template>
  <div class="flex-table row" role="rowgroup">
    <div class="flex-row first" role="cell">
      <div>{{ item.title</div>
    </div>
    <div class="flex-row first" role="cell">
      <div>{{ item.region</div>
    </div>
    <div class="flex-row" role="cell">
      {{ item.amountMax
    </div>
    <div class="flex-row" role="cell">
      <div class="d_flex justify_content_center">
        <button class="btn btn_warning" @click="editInfoDomain(1)">
          Sửa
        </button>
        <button class="btn btn_danger ml_3" @click="deleteDomain(1)">
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    item: Object
  },
  methods: {
    editInfoDomain(val) {
      this.$store.dispatch("getDomainById", val);
      this.$emit("openPopupUpdate", true);
      this.$emit("changeStatus", true);
    },
    deleteDomain(val) {
      this.$store.dispatch("deleteDomain", val);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
