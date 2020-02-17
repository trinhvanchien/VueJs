<template>
  <div class="section px_3 py_4">
    <div class="r">
      <!-- Start: Active Account Statistics -->
      <div class="c_3 col">
        <div class="col--body d_flex align_items_center px_3">
          <div
            class="col--icon d_flex align_items_center justify_content_center"
          >
            <icon-base
              class="icon--user"
              icon-name="user"
              height="20px"
              width="20px"
              viewBox="0 0 16 16"
            >
              <icon-user />
            </icon-base>
          </div>
          <div class="col--label pl_3">Còn hạn sử dụng</div>
          <div class="col--count pl_3">{{ activeAccountStatistics }}</div>
        </div>
      </div>
      <!-- End: Active Account Statistics -->
      <!-- Start: -->
      <!--<div class="c_3 col">
        <div class="col--body d_flex align_items_center px_3">
          <div
            class="col--icon d_flex align_items_center justify_content_center"
          >
            <icon-base
              class="icon--user"
              icon-name="user"
              height="20px"
              width="20px"
              viewBox="0 0 16 16"
            >
              <icon-user />
            </icon-base>
          </div>
          <div class="col--label pl_3">Còn hạn sử dụng</div>
          <div class="col--count pl_3">{{ activeAccountStatistics }}</div>
        </div>
      </div>-->
      <!-- End: -->
      <!-- Start: -->
      <!--<div class="c_3 col">
        <div class="col--body d_flex align_items_center px_3">
          <div
            class="col--icon d_flex align_items_center justify_content_center"
          >
            <icon-base
              class="icon--user"
              icon-name="user"
              height="20px"
              width="20px"
              viewBox="0 0 16 16"
            >
              <icon-user />
            </icon-base>
          </div>
          <div class="col--label pl_3">Còn hạn sử dụng</div>
          <div class="col--count pl_3">{{ activeAccountStatistics }}</div>
        </div>
      </div>-->
      <!-- End: -->
      <!-- Start: -->
      <!--<div class="c_3 col">
        <div class="col--body d_flex align_items_center px_3">
          <div
            class="col--icon d_flex align_items_center justify_content_center"
          >
            <icon-base
              class="icon--user"
              icon-name="user"
              height="20px"
              width="20px"
              viewBox="0 0 16 16"
            >
              <icon-user />
            </icon-base>
          </div>
          <div class="col--label pl_3">Còn hạn sử dụng</div>
          <div class="col--count pl_3">{{ activeAccountStatistics }}</div>
        </div>
      </div>-->
      <!-- End: -->
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    activeAccountStatistics() {
      return this.$store.getters.activeAccountStatistics;
    }
  }
};
</script>

<style lang="scss" scoped>
.section {
  background-color: #fff;
  border-radius: 0.625rem;
}
.col {
  &--body {
    border-right: 1px solid #f0f0f0;
  }
  &--icon {
    background-color: #ed1c24;
    border-radius: 50%;
    height: 48px;
    width: 48px;
    svg {
      color: #fff;
    }
  }
  &--label {
    width: 80px;
  }
  &--count {
    color: #444;
    flex: 1;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
  }
  /* Its style */
  &:last-child {
    .col--body {
      border-right: 0;
    }
  }
  &:nth-child(2) {
    .col--icon {
      background-color: #54e69d;
    }
  }
  &:nth-child(3) {
    .col--icon {
      background-color: rgb(190, 146, 227);
    }
  }
  &:nth-child(4) {
    .col--icon {
      background-color: #ff7676;
    }
  }
}
</style>
