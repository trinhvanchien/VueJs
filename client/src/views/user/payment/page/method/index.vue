<template>
  <div class="ct method">
    <div class="title mb_4">
      <span class="text_uppercase font_weight_bold">Thanh toán</span>
    </div>
    <div class="notification p_3 mb_3">
      <span
        >Cảnh báo: Đơn hàng của bạn đang được xử lý vui lòng không tải lại trang
        !</span
      >
    </div>
    <div class="main">
      <div class="title mb_3">
        <span class="text_uppercase font_weight_bold"
          >Chọn phương thức thanh toán bên dưới</span
        >
      </div>
      <div class="content">
        <div class="snap d_flex align_items_center justify_content_center mb_4">
          <div
            class="box d_flex flex_column align_items_center justify_content_center mr_2"
            :class="status === 0 ? 'active' : ''"
            @click="changeMethodPayment(0)"
          >
            <div class="image bg">
              <icon-base
                class="icon--user mr_1"
                width="152"
                height="156"
                viewBox="0 0 60 60"
                icon-name="Thành công"
              >
                <icon-credit-card />
              </icon-base>
            </div>
            <span>Chuyển khoản trực tiếp</span>
          </div>
          <div
            class="box d_flex flex_column align_items_center justify_content_center ml_2"
            :class="status === 1 ? 'active' : ''"
            @click="changeMethodPayment(1)"
          >
            <div class="image bg">
              <icon-base
                class="icon--user mr_1"
                width="152"
                height="156"
                viewBox="0 0 60 60"
                icon-name="Thành công"
              >
                <icon-credit-card />
              </icon-base>
            </div>
            <span>Thanh toán online VNPAY</span>
          </div>
        </div>
        <div
          class="info d_flex flex_column align_items_center justify_content_center"
        >
          <!--START: DEFAULT  -->
          <div v-if="status === 0" class="info--default info--size">
            <div class="mb_4">
              <span class="text_uppercase">Thông tin tài khoản</span>
            </div>
            <div class="form_group">
              <label>Số tài khoản</label>
              <input
                type="text"
                class="form_control"
                value="19033047647025"
                readonly
              />
            </div>
            <div class="form_group">
              <label>Chủ tài khoản</label>
              <input
                type="text"
                class="form_control"
                value="Trần Quốc Toản"
                readonly
              />
            </div>
            <div class="form_group">
              <label>Ngân hàng</label>
              <input
                type="text"
                class="form_control"
                value="Techcombank chi nhánh Hà Nội"
                readonly
              />
            </div>
            <div class="form_group">
              <label>Nội dung chuyển khoản</label>
              <textarea class="form_control" readonly>
Email đăng ký trên hoot</textarea
              >
            </div>
          </div>
          <!--END: DEFAULT-->
          <!--START: INTERNET-->
          <div v-else class="info--inter info--size">
            <div class="mb_4">
              <span class="text_uppercase">Thông tin hóa đơn</span>
            </div>
            <div class="d_flex align_items_center">
              <div class="form_group w-100">
                <label>Số tiền</label>
                <input
                  :value="info.amount"
                  type="text"
                  placeholder="Nhập số tiền"
                  class="form_control"
                  disabled
                />
              </div>
            </div>
            <div class="d_flex align_items_center">
              <div v-if="info.membershipPackage" class="form_group w-50 mr_2">
                <label>Tên gói</label>
                <input
                  :value="info.membershipPackage"
                  type="text"
                  placeholder="Nhập tên gói"
                  class="form_control"
                  disabled
                />
              </div>
              <div v-if="info.monthsPurchase" class="form_group w-50">
                <label>Thời gian gia hạn <small>( tháng )</small></label>
                <input
                  :value="info.monthsPurchase"
                  type="text"
                  placeholder="Nhập số thời gian sử dụng"
                  class="form_control"
                  disabled
                />
              </div>
              <div v-if="info.postsPurchase" class="form_group w-50 mr_2">
                <label>Số bài viết mua thêm</label>
                <input
                  :value="info.postsPurchase"
                  type="text"
                  class="form_control"
                  disabled
                />
              </div>
              <div v-if="info.postsPurchaseExpireDay" class="form_group w-50">
                <label>Thời gian sử dụng <small>( ngày )</small></label>
                <input
                  :value="info.postsPurchaseExpireDay"
                  type="text"
                  class="form_control"
                  disabled
                />
              </div>
            </div>
            <div class="form_group">
              <label>Nội dung thanh toán</label>
              <textarea
                :value="info.orderDescription"
                class="form_control"
                disabled
              ></textarea>
            </div>
            <div class="info--pay">
              <button @click="handlePayment">Thanh toán</button>
            </div>
          </div>
          <!--END: INTERNET-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: 100000,
      membershipPackage: "VIP1",
      monthsPurchase: 12,
      orderDescription: "Thanh toan don hang thoi gian: 2020-01-08 23:01:46"
    };
  },
  computed: {
    status() {
      return this.$store.getters.method;
    },
    vnpayUrl() {
      return this.$store.getters.vnpayUrl;
    },
    info() {
      return this.$store.getters.infoBill;
    }
  },
  methods: {
    changeMethodPayment(val) {
      this.$store.dispatch("changeMethod", val);
    },
    async handlePayment() {
      const paymentInfo = {
        amount: this.info.amount,
        purchaseInfo: {
          type: this.info.type,
          membershipPackage: this.info.membershipPackageId,
          monthsPurchase: this.info.monthsPurchase
            ? this.info.monthsPurchase
            : undefined,
          postsPurchase: this.info.postsPurchase
            ? this.info.postsPurchase
            : undefined,
          postsPurchaseExpireDay: this.info.postsPurchaseExpireDay
            ? this.info.postsPurchaseExpireDay
            : undefined
        },
        orderDescription: this.info.orderDescription,
        bankCode: null,
        language: "vn",
        orderType: 130005
      };
      await this.$store.dispatch("createVnpayPaymentUrl", paymentInfo);
      if (this.vnpayUrl) {
        window.location.href = this.vnpayUrl;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.notification {
  background-color: #fff;
  border: 1px solid #f96666;
  border-radius: 0.5rem;
  color: #f96666;
  font-size: 0.875rem;
}
.content {
  .w-100 {
    width: 100%;
  }
  .w-50 {
    width: 50%;
  }
  .box {
    background-color: #fff;
    border: 1px solid #444;
    border-radius: 0.5rem;
    cursor: pointer;
    padding: 1rem 6rem;
    &:hover,
    &:focus {
      border-color: #ff0515;
      color: #ff0515;
      transition: all 0.5s ease;
    }
    .bg {
      background-size: cover;
      background-position: 0 0;
      background-repeat: no-repeat;
    }
    span {
      text-transform: uppercase;
      font-weight: 600;
    }
  }
  .active {
    border-color: #f96666;
    color: #f96666;
  }
  .info {
    &--size {
      width: 50%;
      label {
        font-size: 14px;
        text-transform: uppercase;
      }
      .form_control {
        &:hover,
        &:focus,
        &:active,
        &:visited {
          box-shadow: none;
          outline: 0;
        }
      }
    }
    &--pay {
      button {
        padding: 0.5rem 1.5rem;
        background-color: #f96666;
        color: #fff;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        &:hover,
        &:focus {
          background-color: #ff0515;
          transition: all 0.5s ease;
        }
      }
    }
  }
}
</style>
