<template>
  <div class="ct cart">
    <!-- START: WHEN CART EMPTY -->
    <div class="d_none">
      <empty-component />
    </div>
    <!-- END: WHEN CART EMPTY -->
    <!-- START: WHEN CART HAVE PRODUCT -->
    <div class="info">
      <span>Nâng cấp gói tài khoản</span>
    </div>
    <div class="notification p_3">
      <span>Vui lòng chọn 1 trong số các gói nâng cấp phía dưới</span>
    </div>
    <div class="r">
      <div class="c_lg_12 c_md_12">
        <div class="subscription">
          <div class="subscription--buttons">
            <button class="button--month">1 Tháng</button>
            <button class="button--month">3 Tháng</button>
            <button class="button--month">6 Tháng</button>
            <button class="button--month">12 Tháng</button>
          </div>
        </div>
      </div>
    </div>
    <div class="r">
      <div class="c_lg_12 c_md_12">
        <div class="wrap d_flex justify_content_between mb_3 text_center">
          <membership-package
            v-for="(item, index) in packages"
            :item="item"
            :key="index"
          />
        </div>
        <!-- START: UPGRADE PACKAGE -->
        <div v-if="isShowUpgradePackage === true">
          <div class="package--upgrade py_3 px_2">
            Bạn đang sử dụng gói miễn phí của hệ thống, vui lòng chọn gói nâng
            cấp để sử dụng được những tính năng khác và đầy đủ hơn.
          </div>
        </div>
        <!-- END: UPGRADE PACKAGE -->
        <!-- START: OPTION -->
      </div>
    </div>
    <div class="info">
      <span> Mua thêm bài đăng</span>
    </div>
    <div class="r">
      <div class="c_lg_12 c_md_12">
        <purchase-post />
      </div>
    </div>
  </div>
</template>
<script src="./index.script.js"></script>
<style lang="scss" scoped>
@import "./index.style";
</style>
