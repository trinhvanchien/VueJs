<template>
  <div class="purchase-post">
    <div class="purchase-post--counter">
      <div class="counter">
        <div class="counter--description">
          <span
            >Số bài đăng sử dụng trong 24 giờ
            <small>( Tối thiểu 10 bài )</small>
          </span>
        </div>
        <div class="counter--amount">
          <button
            :class="{ disabled: postsPurchase <= 10 }"
            @click="decreasePostAmount()"
          >
            -
          </button>
          <input
            type="text"
            readonly
            v-model="postsPurchase"
            class="text_center"
          />
          <button @click="increasePostAmount()">+</button>
        </div>
      </div>
    </div>
    <div class="purchase-post--price">
      {{ currencyFormat(calculatedTotalPostPrice) }}
    </div>
    <div class="purchase-post--button">
      <button @click="purchaseAdditionalPost()" class="button--purchase">
        Thanh toán
      </button>
    </div>
  </div>
</template>

<script>
import StringFunction from "@/utils/functions/string";

export default {
  data() {
    return {
      postsPurchase: 10
    };
  },
  computed: {
    calculatedTotalPostPrice() {
      return this.$store.getters.postPrice * this.postsPurchase;
    },
    userMember() {
      return this.$store.getters.userInfoMember;
    }
  },
  async created() {
    this.$store.dispatch("getPostPrice");
  },
  methods: {
    currencyFormat(money) {
      return StringFunction.currencyFormat(money);
    },
    increasePostAmount() {
      this.postsPurchase += 10;
    },
    decreasePostAmount() {
      this.postsPurchase -= 10;
    },
    purchaseAdditionalPost() {
      const payload = {
        type: "additionalPost",
        amount: this.calculatedTotalPostPrice,
        membershipPackageId: this.userMember.membershipPackage,
        postsPurchase: this.postsPurchase,
        postsPurchaseExpireDay: 1,
        orderDescription: `Thanh toan don hang thoi gian: ${new Date().toLocaleString()}`
      };
      this.$store.dispatch("setInfoPayment", payload);
      this.$router.push({ name: "payment_method" });
    }
  }
};
</script>

<style lang="scss" scoped>
.purchase-post {
  display: flex;
  align-items: center;
  &--title {
    text-transform: uppercase;
  }
  &--counter {
  }
  &--price {
    text-align: right;
  }
  &--button {
    padding: 0 1rem;
  }
}

.counter {
  display: flex;
  align-items: center;
  &--description {
  }
  &--amount {
    display: flex;
    height: 40px;
    margin: 0 1rem;
    input {
      margin: 0 0.7rem;
      outline: none;
      cursor: default;
    }
    button {
      background-color: #f96666;
      border: none;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      height: 100%;
      width: 40px;
      outline: none;
      transition: all 0.5s ease;
      &:active {
        background-color: #ff0515;
      }
    }
    input {
      background-color: #fff;
      border-radius: 0.5rem;
      border: 1px solid #444;
      height: 100%;
      width: 70px;
    }
  }
}

.button--purchase {
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

.disabled {
  background-color: gray !important;
  pointer-events: none;
}
</style>
