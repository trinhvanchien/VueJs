<template>
  <div class="wrapper--main">
    <!-- Start: banner -->
    <app-banner />
    <!-- End: Banner -->

    <div class="content">
      <!-- Start: tool -->
      <app-tool />
      <!-- End: tool -->

      <!-- Start: Why Choose ZinBee -->
      <app-why-choose />
      <!-- End: Why Choose ZinBee -->

      <!-- Start: Utilities -->
      <app-utilities />
      <!-- End: Utilities -->

      <!-- Start: Customer -->
      <app-customer />
      <!-- End: Customer -->

      <!-- Start: Price -->
      <app-price />
      <!-- End: Price -->

      <!-- Start: Class Marketing -->
      <app-training />
      <!-- End: Class Marketing -->

      <!-- Start: Show owner -->
      <app-owner />
      <!-- End: Show owner -->
    </div>
  </div>
</template>

<script>
import AppBanner from "./MainBanner";
import AppCustomer from "./MainCustomer";
import AppOwner from "./MainOwner";
import AppPrice from "./MainPrice";
import AppTool from "./MainTool";
import AppTraining from "./MainTraining";
import AppUtilities from "./MainUtilities";
import AppWhyChoose from "./MainWhyChoose";

export default {
  components: {
    AppBanner,
    AppCustomer,
    AppOwner,
    AppPrice,
    AppTool,
    AppTraining,
    AppUtilities,
    AppWhyChoose
  },
  data() {
    return {};
  }
};

</script>

<style lang="scss" scoped>
@import "./styles/index.style";
</style>
