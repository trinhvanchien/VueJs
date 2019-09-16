<template>
  <div class="member">
    <!-- START: HEADER CONTAIN SEARCH MEMBER -->
    <div class="header d_flex align_items_center justify_content_between">
      <div class="left">
        <input type="text" class="" placeholder="Tìm kiếm thành viên" />
      </div>
      <div></div>
    </div>
    <!-- END: HEADER CONTAIN SEARCH MEMBER -->

    <!-- START: TABLE CONTAIN LIST MEMBER -->
    <div class="body mt_2">
      <div class="content--body">
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row first" role="columnheader">Tên</div>
            <div class="flex-row" role="columnheader">Cụm</div>
            <div class="flex-row" role="columnheader">Số lượng max</div>
            <div class="flex-row" role="columnheader">Hành động</div>
          </div>
          <!--          <div></div>-->
          <div>
            <member />
          </div>
        </div>
      </div>
    </div>
    <!-- START: TABLE CONTAIN LIST MEMBER -->
  </div>
</template>
<script>
import Member from "./components";
export default {
  components: {
    Member
  },
  data() {
    return {
      key: ""
    };
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
