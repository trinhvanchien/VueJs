<template>
  <div class="container--content">
    <div class="bread--crumb py_3 mt_3">
      <h3 class="bread--crumb-title">Bảng điều khiển</h3>
    </div>
    <div class="main">
      <!-- Start: Statistics -->
      <statistics></statistics>
      <!-- End: Statistics -->
      <!-- Start: Charts -->
      <charts class="mt_4"></charts>
      <!-- End: Charts -->
    </div>
  </div>
</template>

<script>
import Charts from "./components/charts";
import Statistics from "./components/statistics";

export default {
  components: {
    Charts,
    Statistics
  },
  async created() {
    await this.$store.dispatch("accountStatistics");
  }
};
</script>

<style lang="scss" scoped>
.bread--crumb {
  &-title {
    font-size: 1.75rem;
    font-weight: 600;
  }
}
</style>
