<template>
  <div class="ct cart">
    <!-- START: WHEN CART EMPTY -->
    <div class="d_none">
      <empty-component />
    </div>
    <!-- END: WHEN CART EMPTY -->
    <!-- START: WHEN CART HAVE PRODUCT -->
    <div class="info mb_3">
      <span>Thông tin giỏ hàng</span>
    </div>
    <div class="notification p_3 mb_3">
      <span>Vui lòng chọn 1 trong số các gói nâng cấp phía dưới</span>
    </div>
    <div class="r">
      <div class="c_lg_9 c_md_12">
        <div
          class="wrap d_flex align_items_center justify_content_between mb_3"
        >
          <div
            class="package px_3 py_4"
            :class="item.name === 'Free' ? 'dis' : ''"
            v-for="(item, index) in packages"
            :key="index"
            @click.stop="choosePackage(item)"
          >
            <div class="package--name">
              <input type="radio" name="name" :id="item.name" />
              <label class="ml_2" :for="item.name">{{ item.name }}</label>
            </div>
            <div class="package--info">
              <div class="package--info-account">
                <small>Đăng trên trang cá nhân</small>
              </div>
              <div class="package--info-post">
                <small>Số bài đăng trong ngày</small>
                <span>{{ item.limit.post }}</span>
              </div>
              <div class="package--info-schedules">
                <small>Page không giới han</small>
                <!--<span>{{ item.limit.campaign }}</span>-->
              </div>
              <div class="package--info-slot">
                <small>Giới hạn sự kiện</small>
                <span>{{ item.limit.slot }}</span>
              </div>
              <div class="package--info-slot">
                <small>Tìm nội dung hot</small>
              </div>
              <div class="package--info-slot">
                <small>Tự động tìm nội dung</small>
              </div>
              <div class="package--info-slot">
                <small>Tự động đăng bài</small>
              </div>
            </div>
            <div class="package--price">
              <div class="package--price-original">
                <span>Giá chỉ từ</span>
                <span
                  class="number ml_4"
                  :class="
                    item.price.one.promotional &&
                    item.price.one.promotional !== 0
                      ? 'align'
                      : ''
                  "
                  >{{ item.price.one.original }}</span
                >
              </div>
              <div
                class="package--price-promotional"
                :class="
                  item.price.one.promotional && item.price.one.promotional !== 0
                    ? ''
                    : 'opa'
                "
              >
                <span>Giá khuyến mãi</span>
                <span class="number ml_4">{{
                  item.price.one.promotional
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <!-- START: MORE OPTION -->
        <div class="" v-if="packageSelected.length > 0">
          <div class="title mb_3">
            <span>Lựa chọn thanh toán</span>
          </div>
          <div class="option d_flex align_items_center justify_content_between">
            <div
              class="option--item"
              v-for="(exp, comp) in packageSelected"
              :key="comp"
            >
              <label
                :for="exp.title"
                class="radio--custom"
                @click="showPricePackage(exp)"
              >
                <input type="radio" :id="exp.title" name="expire" />
                <span class="ml_2">{{ exp.title }} tháng</span>
              </label>
            </div>
          </div>
          <!-- START: MORE OPTION -->
          <div class="more mt_3">
            <div class="title mb_3">
              <span>mua thêm</span>
            </div>
            <div class="more--wrap">
              <div class="more--item d_flex align_items_center">
                <div class="desc">
                  <span
                    >Số bài đăng <small>( số lần mua bé nhất là 10 )</small>
                  </span>
                </div>
                <div class="amount ml_5">
                  <button class="mr_2" @click="reductionPost">-</button>
                  <input
                    type="text"
                    readonly
                    v-model="number"
                    class="text_center"
                  />
                  <button class="ml_2" @click="increasePost">+</button>
                </div>
              </div>
            </div>
          </div>
          <!-- END: MORE OPTION -->
        </div>
        <!-- END: MORE OPTION -->
      </div>
      <!-- START: PRICE -->
      <div class="c_lg_3 c_md_12">
        <div class="wrap">
          <div class="box mb_1">
            <div class="d_flex align_items_center justify_content_between mb_1">
              <span class="box--title">Gia hạn</span>
              <span class="box--price">{{ price }} đ</span>
            </div>
            <div class="d_flex align_items_center justify_content_between">
              <span class="box--title">Mua thêm</span>
              <span class="box--price">{{ money }} đ</span>
            </div>
          </div>
          <div
            class="box d_flex align_items_center justify_content_between mb_3"
          >
            <span class="box--title">Thành tiền</span>
            <span class="box--total">{{ Number(price + money) }} đ</span>
          </div>
          <div class="text--error p_2 mb_3" v-if="isShowAlert">
            <span>Bạn phải chọn thời gian gia hạn cho gói</span>
          </div>
          <div class="send">
            <button class="cur" @click="handleRedirect">
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
      <!-- END: PRICE -->
    </div>
    <!-- END: WHEN CART HAVE PRODUCT -->
  </div>
</template>
<script>
import EmptyComponent from "./empty";
export default {
  components: {
    EmptyComponent
  },
  data() {
    return {
      value: 10,
      price: 0,
      number: 0,
      money: 0,
      monthsPurchase: null,
      descBill: null,
      imgCart: require("@/assets/images/add_to_cart.svg"),
      packageSelected: [],
      packageInfo: null,
      isShowAlert: false
    };
  },
  computed: {
    packages() {
      return this.$store.getters.membershipPackages;
    },
    userMember() {
      return this.$store.getters.userInfoMember;
    }
  },
  created() {
    this.$store.dispatch("getMemberShipPackage");
  },
  watch: {
    price(val) {
      if (val !== 0) {
        this.isShowAlert = false;
      }
    },
    money(val) {
      if (val !== 0) {
        this.isShowAlert = false;
      }
    }
  },
  methods: {
    choosePackage(val) {
      this.packageInfo = val;
      this.handlePackagePrice(val.price);
    },
    handlePackagePrice(val) {
      const arr = Object.keys(val).map(i => val[i]);
      this.packageSelected = arr;
    },
    handleRedirect() {
      let dataSender;
      if (Number(this.price + this.money) === 0) {
        this.isShowAlert = true;
        return;
      } else {
        dataSender = {
          amount: Number(this.price + this.money),
          membershipPackage: this.packageInfo.name,
          monthsPurchase: this.monthsPurchase,
          orderDescription: this.descBill
        };
        this.$store.dispatch("setInfoPayment", dataSender);
        this.$router.push({ name: "payment_method" });
      }
    },
    showPricePackage(val) {
      let a, b, date;
      this.price = val.original;
      this.monthsPurchase = val.title;
      a = this.userMember.expireDate;
      date = Number(this.monthsPurchase * 30);
      b = this.calculateTime(new Date(a), date);
      this.descBill = `Thanh toan don hang thoi gian: ${b}`;
    },
    reductionPost() {
      if (this.number === 0) {
        return;
      } else {
        this.number = this.number - 10;
        this.money = this.number * 300000;
      }
    },
    increasePost() {
      this.number = this.number + 10;
      this.money = this.number * 300000;
    },
    calculateTime(a, b) {
      a.setDate(a.getDate() + b);
      return this.formatDate(a);
    },
    formatDate(d) {
      const dateTime = new Date(d),
        date = String(dateTime.getDate()).padStart(2, "0"),
        month = String(dateTime.getMonth() + 1).padStart(2, "0"),
        year = dateTime.getFullYear(),
        hours = String(dateTime.getHours()).padStart(2, "0"),
        mins = String(dateTime.getMinutes()).padStart(2, "0"),
        seconds = String(dateTime.getSeconds()).padStart(2, "0");

      return `${year}-${month}-${date} ${hours}:${mins}:${seconds}`;
    }
  }
};
</script>
<style lang="scss" scoped>
.cart {
  .notification {
    background-color: #fff;
    border: 1px solid #f96666;
    border-radius: 0.5rem;
    color: #f96666;
    font-size: 0.875rem;
  }
  .wrap {
    .package {
      background-color: #fff;
      border: 1px solid #444950;
      border-radius: 0.5rem;
      cursor: pointer;
      width: 32%;
      &--name {
        label {
          text-transform: uppercase;
          font-size: 18px;
          font-weight: 600;
          color: #f96666;
          cursor: pointer;
        }
      }
      &--info {
        &-account,
        &-post,
        &-schedules,
        &-slot {
          small {
            font-size: 14px;
          }
          span {
            font-weight: 600;
            color: #f96666;
            margin-left: 8px;
          }
        }
      }
      &--price {
        .opa {
          opacity: 0;
        }
        span.number {
          color: #f96666;
          font-size: 25px;
          font-weight: 700;
        }
        span.align {
          text-decoration: line-through #ed1c24;
        }
      }
    }
    .active {
      border-color: #f96666;
    }
    .dis {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
  .title,
  .info {
    span {
      font-size: 18px;
      text-transform: uppercase;
    }
  }
  .option {
    .radio--custom {
      span {
        cursor: pointer;
      }
      input[type="radio"] {
        background-color: #666;
        border-radius: 50%;
        border: 0;
        cursor: pointer;
        height: 16px;
        padding: 0;
        outline: none;
        transition: all 0.4s ease;
        vertical-align: middle;
        width: 16px;
        -moz-appearance: none;
        -webkit-appearance: none;
        &:hover {
          background-color: #f96666;
        }
        &:checked {
          background-color: #f96666;
          &:before {
            background-color: #fff;
            border-radius: 50%;
            content: "";
            display: block;
            height: 6px;
            left: 5px;
            position: relative;
            top: 5px;
            width: 6px;
          }
        }
      }
    }
  }
  .more {
    &--item {
      .desc {
      }
      .amount {
        button {
          background-color: #f96666;
          border: none;
          border-radius: 0.5rem;
          color: #fff;
          cursor: pointer;
          font-size: 20px;
          height: 38px;
          line-height: 38px;
          width: 40px;
          &:hover,
          &:focus,
          &:active,
          &:visited {
            box-shadow: none;
            outline: 0;
          }
        }
        input {
          background-color: #fff;
          border-radius: 0.5rem;
          border: 1px solid #444;
          height: 38px;
          line-height: 38px;
          width: 70px;
        }
      }
    }
  }
  .box {
    background-color: #fff;
    border-radius: 0.25rem;
    padding: 17px 20px 20px 19px;
    &--total {
      color: #f96666;
      font-size: 22px;
      font-weight: 500;
    }
    &--title {
      font-size: 0.875rem;
    }
    &--price {
      font-weight: 600;
    }
  }
  .text--error {
    background-color: #ff0515;
    border-radius: 0.25rem;
    color: #fff;
    font-size: 0.75rem;
  }
  .send {
    .disabled {
      cursor: not-allowed;
    }
    .cur {
      cursor: pointer;
    }
    button {
      background-color: #f96666;
      border: none;
      border-radius: 0.25rem;
      color: #fff;
      padding: 0.5rem;
      width: 100%;
      text-align: center;
      &:hover,
      &:focus,
      &:active,
      &:visited {
        background-color: #ff0515;
        box-shadow: none;
        outline: 0;
        transition: all 0.5s ease;
      }
    }
  }
}
</style>
