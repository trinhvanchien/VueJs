<template>
  <div class="flex-table row" role="rowgroup">
    <div class="flex-row first" role="cell">
      <div>{{ item.name }}</div>
    </div>
    <div class="flex-row first" role="cell">
      <div>{{ item.email }}</div>
    </div>
    <div class="flex-row" role="cell">
      {{ item.phone }}
    </div>
    <div class="flex-row" role="cell">
      <div class="d_flex justify_content_center">
        <button class="btn btn_warning">
          Sửa
        </button>
        <button class="btn btn_danger ml_3" @click="deleteMember(item._id)">
          Xóa
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["item"],
  methods: {
    editInfoDomain(val) {
      this.$store.dispatch("getDomainById", val);
      this.$emit("openPopupUpdate", true);
      this.$emit("changeStatus", true);
    },
    deleteMember(val) {
      const dataSender = {
        id: val,
        packageId: this.$route.params.id
      };
      this.$store.dispatch("removeMemberFromPackage", dataSender);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
