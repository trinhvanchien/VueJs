<template>
  <div class="package px_3 py_4">
    <div class="package--name d_flex align_items_center flex_column">
      {{ item.name }}
    </div>
    <div class="package--price">
      <div class="price--original">
        <del class="number">{{
          currencyFormat(item.price[selectedMonthSubscription.title].original)
        }}</del>
      </div>
      <div class="price--promotional">
        <span class="number">{{
          currencyFormat(
            item.price[selectedMonthSubscription.title].promotional
          )
        }}</span>
      </div>
    </div>
    <div class="package--action">
      <button
        :class="{ disabled: item.codeId === 'free' }"
        @click="choosePackageSubscripton()"
      >
        {{
          userMember.membershipPackage === item.codeId ? "Gia hạn" : "Nâng cấp"
        }}
      </button>
    </div>
    <div class="package--info px_3">
      <div class="package--info-account package--inline">
        <span>{{ item.maxAccountFb }} </span> tài khoản
      </div>
      <div
        v-if="item.permission.includes('limited_post_per_day')"
        class="package--info-post package--inline"
      >
        <span>{{ item.limit.post }}</span> <br />
        bài đăng / ngày
      </div>
      <div
        v-if="item.permission.includes('unlimited_post_per_day')"
        class="package--info-post package--inline"
      >
        <span>Không giới hạn</span> <br />
        bài đăng / ngày
      </div>
      <div
        v-if="item.permission.includes('unlimited_campaign')"
        class="package--info-post package--inline"
      >
        <span>Không giới hạn</span> <br />
        chiến dịch
      </div>
      <div
        v-if="item.permission.includes('limited_campaign')"
        class="package--info-post package--inline"
      >
        <span>{{ item.limit.campaign }}</span> <br />
        chiến dịch
      </div>
      <div
        v-if="item.permission.includes('unlimited_page')"
        class="package--info-schedules package--inline"
      >
        <span>Không giới hạn</span><br />
        Page
      </div>
      <div
        v-if="item.permission.includes('unlimited_group')"
        class="package--info-schedules package--inline"
      >
        <span>Không giới hạn</span><br />
        Group
      </div>
      <div
        v-if="item.permission.includes('hoot_university')"
        class="package--info-post package--inline"
      >
        <span>Tham gia</span> <br />
        Hoot University
      </div>
      <div
        v-if="item.permission.includes('customer_support')"
        class="package--info-post package--inline"
      >
        <span>Support</span> <br />
        24/7
      </div>
    </div>
  </div>
</template>

<script>
import StringFunction from "@/utils/functions/string";

export default {
  props: ["item", "selectedMonthSubscription"],
  computed: {
    calculatedTotalPostPrice() {
      return this.$store.getters.postPrice * this.postsPurchase;
    },
    userMember() {
      return this.$store.getters.userInfoMember;
    }
  },
  methods: {
    currencyFormat(money) {
      return StringFunction.currencyFormat(money);
    },
    choosePackageSubscripton() {
      const payload = {
        type: "subscription",
        amount: this.item.price[this.selectedMonthSubscription.title]
          .promotional,
        membershipPackage: this.item.name,
        membershipPackageId: this.item.codeId,
        monthsPurchase: this.selectedMonthSubscription.value,
        orderDescription: `Thanh toan don hang thoi gian: ${new Date().toLocaleString()}`
      };
      this.$store.dispatch("setInfoPayment", payload);
      this.$router.push({ name: "payment_method" });
    }
  }
};
</script>

<style lang="scss" scoped>
.package {
  background-color: #fff;
  border: 1px solid #444950;
  border-radius: 0.5rem;
  width: 32%;
  &:not(:first-child):not(:last-child) {
    margin: 0 0.5rem;
  }
  &:first-child {
    margin-right: 0.5rem;
  }
  &:last-child {
    margin-left: 0.5rem;
  }
  &--name {
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 600;
    color: #f96666;
  }
  &--advance {
    width: 40%;
    border: 1px solid #ff0000;
  }
  &--info {
    text-transform: uppercase;
    padding: 1.5rem 0;
    &-account,
    &-post,
    &-schedules,
    &-slot {
      small {
        font-size: 14px;
      }
      span {
        font-weight: 600;
        color: #696060;
      }
    }
  }
  &--inline {
    border-bottom: 1px solid #e4d3d3;
    padding: 0.7rem 0.35rem;
  }
  &--action {
    button {
      min-width: 130px;
      text-transform: uppercase;
      background-color: #f96666;
      border: none;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      padding: 0.5rem 1.5rem;
      margin: 0.5rem 0;
      text-align: center;
      outline: none;
      transition: all 0.5s ease;
      &:active {
        background-color: #ff0515;
      }
    }
  }
}

.price {
  &--original {
  }
  &--promotional {
    padding: 0.2rem 0;
    color: #f96666;
    font-size: 25px;
    font-weight: 700;
  }
}

.disabled {
  background-color: gray !important;
  pointer-events: none;
}
</style>
