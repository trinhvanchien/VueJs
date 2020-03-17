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
    <div
      v-if="userMember && userMember.membershipPackage && userMember.expireDate"
      class="notification p_3"
    >
      <span>
        Bạn đang sử dụng gói
        <b>{{ userMember.membershipPackage.toUpperCase() }}</b> của hệ thống.
        Ngày hết hạn:
        <b>{{
          new Intl.DateTimeFormat("vi-VN").format(
            new Date(userMember.expireDate)
          )
        }}</b>
      </span>
    </div>
    <div class="r">
      <div class="c_lg_12 c_md_12">
        <div class="subscription">
          <div class="subscription--buttons">
            <button
              class="button--month"
              :class="{
                active: selectedMonthSubscription.value === month.value
              }"
              v-for="month in monthsSubscription"
              :key="month.value"
              @click="chooseMonthSubscription(month)"
            >
              {{ month.value }} Tháng
            </button>
            <button
              v-if="
                !userMember.isAlreadyUsedFreeTrial &&
                  userMember.membershipPackage === 'free'
              "
              class="button--month"
              @click="startFreeTrial()"
            >
              Dùng thử gói PROFESSIONAL 7 ngày
            </button>
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
            :selectedMonthSubscription="selectedMonthSubscription"
          />
        </div>
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
