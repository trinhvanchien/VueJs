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
            v-for="(item, index) in listMembershipPackage"
            :key="index"
          >
            <div class="package--name">
              <input type="radio" name="name" :id="item.name" />
              <label class="ml_2" :for="item.name">{{ item.name }}</label>
            </div>
            <div class="package--info">
              <div class="package--info-account">
                <small>Số tài khoản được sử dụng</small>
                <span>{{ item.limit.post }}</span>
              </div>
              <div class="package--info-post">
                <small>Giới hạn bài đăng</small>
                <span>{{ item.limit.post }}</span>
              </div>
              <div class="package--info-schedules">
                <small>Giới hạn chiến dịch</small>
                <span>{{ item.limit.post }}</span>
              </div>
              <div class="package--info-slot">
                <small>Giới hạn sự kiện</small>
                <span>{{ item.limit.post }}</span>
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
          </div>
        </div>
        <!-- START: MORE OPTION -->
        <div class="title mb_3">
          <span>Lựa chọn thanh toán</span>
        </div>
        <div class="option d_flex align_items_center justify_content_between">
          <div
            class="option--item"
            v-for="(exp, comp) in listExpire"
            :key="comp"
          >
            <label
              :for="exp.name"
              class="radio--custom"
              @click="showPricePackage(exp)"
            >
              <input type="radio" :id="exp.name" name="expire" />
              <span class="ml_2">{{ exp.title }}</span>
            </label>
          </div>
        </div>
        <!-- END: MORE OPTION -->
      </div>
      <!-- START: PRICE -->
      <div class="c_lg_3 c_md_12">
        <div class="wrap">
          <div
            class="box d_flex align_items_center justify_content_between mb_1"
          >
            <span>Tạm tính</span>
            <span>{{ price }} đ</span>
          </div>
          <div
            class="box d_flex align_items_center justify_content_between mb_3"
          >
            <span>Thành tiền</span>
            <span class="box--total">{{ price }} đ</span>
          </div>
          <div class="send">
            <button @click="handleRedirect">Tiến hành thanh toán</button>
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
      imgCart: require("@/assets/images/add_to_cart.svg"),
      listMembershipPackage: [
        {
          _id: 1,
          name: "Free",
          limit: {
            post: 1,
            campaign: 2,
            slot: 3
          }
        },
        {
          _id: 1,
          name: "VIP 1",
          limit: {
            post: 1,
            campaign: 2,
            slot: 3
          }
        },
        {
          _id: 1,
          name: "VIP 2",
          limit: {
            post: 1,
            campaign: 2,
            slot: 3
          }
        }
      ],
      listExpire: [
        {
          title: "1 tháng",
          price: 600000,
          name: "one"
        },
        {
          title: "3 tháng",
          price: 1800000,
          name: "two"
        },
        {
          title: "6 tháng",
          price: 3000000,
          name: "three"
        },
        {
          title: "12 tháng",
          price: 4800000,
          name: "year"
        }
      ]
    };
  },
  methods: {
    handleRedirect() {
      this.$router.push({ name: "payment_method" });
    },
    showPricePackage(val) {
      this.price = val.price;
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
  .box {
    background-color: #fff;
    border-radius: 0.25rem;
    padding: 17px 20px 20px 19px;
    &--total {
      color: #f96666;
      font-size: 22px;
      font-weight: 500;
    }
  }
  .send {
    button {
      background-color: #f96666;
      border: none;
      border-radius: 0.25rem;
      color: #fff;
      cursor: pointer;
      padding: 0.5rem;
      width: 100%;
      text-align: center;
      &:hover {
        background-color: #ff0515;
        transition: all 0.5s ease;
      }
    }
  }
}
</style>
