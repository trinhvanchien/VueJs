<template>
  <div class="ct success">
    <div class="card">
      <div class="card_body d_flex align_items_center justify_content_center">
        <div v-if="code === '00'" class="info">
          <div class="info--success text_center mb_4">
            <icon-base
              class="icon--user mr_1"
              width="100"
              height="100"
              viewBox="0 0 52 52"
              icon-name="Thành công"
            >
              <icon-success />
            </icon-base>
            <div class="mt_2">Thanh toán hóa đơn thành công</div>
          </div>
          <div class="info--bill">
            <div class="info--user mb_3">
              <div class="mb_3">
                <span class="text_uppercase font_weight_bold"
                  >Thông tin tài khoản trên hệ thống</span
                >
              </div>
              <div
                class="info--bill-email d_flex align_items_center justify_content_between"
              >
                <span>Email</span>
                <span class="show">khangle0608@gmail.com</span>
              </div>
              <div
                class="info--bill-name d_flex align_items_center justify_content_between"
              >
                <span>Tên</span>
                <span class="show">Le Khang</span>
              </div>
              <div
                class="info--bill-phone d_flex align_items_center justify_content_between"
              >
                <span>Số điện thoại</span>
                <span class="show">0986167832</span>
              </div>
              <div
                class="info--bill-package d_flex align_items_center justify_content_between"
              >
                <span>Gói tài khoản</span>
                <span class="show">Free</span>
              </div>
              <div
                class="info--bill-expire d_flex align_items_center justify_content_between"
              >
                <span>Hạn sử dụng</span>
                <span class="show">12/12/2020</span>
              </div>
            </div>
            <div class="info--more">
              <div class="mb_3">
                <span class="text_uppercase font_weight_bold"
                  >Thông tin thanh toán toán</span
                >
              </div>
              <div
                class="info--bill-card d_flex align_items_center justify_content_between"
              >
                <span>Ngân hàng </span>
                <span class="show">{{ bankCode }}</span>
              </div>
              <div
                class="info--bill-card d_flex align_items_center justify_content_between"
              >
                <span>Mã giao dịch ngân hàng </span>
                <span class="show">{{ bankTranNo }}</span>
              </div>
              <div
                class="info--bill-card d_flex align_items_center justify_content_between"
              >
                <span>Mã giao dịch hệ thống </span>
                <span class="show">{{ transactionNo }}</span>
              </div>
              <div
                class="info--bill-card d_flex align_items_center justify_content_between"
              >
                <span>Mã đơn hàng </span>
                <span class="show">{{ orderId }}</span>
              </div>
              <div
                class="info--bill-card d_flex align_items_center justify_content_between"
              >
                <span>Nội dung thanh toán </span>
                <span class="show">{{ orderDescription }}</span>
              </div>
              <div
                class="info--bill-price d_flex align_items_center justify_content_between"
              >
                <span>Tổng tiền thanh toán</span>
                <span class="price">{{ amount / 100 }} VND</span>
              </div>
            </div>
            <div class="mt_4 text_center">
              <button @click="backToHome">Quay lại trang chủ</button>
            </div>
          </div>
        </div>
        <div v-else class="info">
          <div class="info--error text_center mb_4">
            <icon-base
              class="icon--user mr_1"
              width="100"
              height="100"
              viewBox="0 0 52 52"
              icon-name="Thành công"
            >
              <icon-error />
            </icon-base>
            <div class="mt_2">Thanh toán thất bại</div>
            {{ errorMessage }}
          </div>
          <div class="mt_4 text_center">
            <button @click="backToPayment">Quay lại trang thanh toán</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: "",
      bankCode: "",
      bankTranNo: "",
      orderDescription: "",
      transactionNo: "",
      orderId: "",
      code: "",
      errorMessage: "",
      errorResponseList: [
        {
          code: "01",
          message: "Giao dịch đã tồn tại"
        },
        {
          code: "02",
          message: "Merchant không hợp lệ (kiểm tra lại vnp_TmnCode)"
        },
        {
          code: "03",
          message: "Dữ liệu gửi sang không đúng định dạng"
        },
        {
          code: "04",
          message: "Khởi tạo GD không thành công do Website đang bị tạm khóa"
        },
        {
          code: "05",
          message:
            "Giao dịch không thành công do: Quý khách nhập sai mật khẩu quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch"
        },
        {
          code: "13",
          message:
            "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch."
        },
        {
          code: "07",
          message: "Giao dịch bị nghi ngờ là giao dịch gian lận"
        },
        {
          code: "09",
          message:
            "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng."
        },
        {
          code: "10",
          message:
            "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần"
        },
        {
          code: "11",
          message:
            "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch."
        },
        {
          code: "12",
          message:
            "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa."
        },
        {
          code: "51",
          message:
            "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch."
        },
        {
          code: "65",
          message:
            "Giao dịch không thành công do: Hệ thống Ngân hàng đang bảo trì. Xin quý khách tạm thời không thực hiện giao dịch bằng thẻ/tài khoản của Ngân hàng này."
        },
        {
          code: "99",
          message: "Lỗi ngoại lệ"
        },
        {
          code: "24",
          message: "Bạn đã hủy giao dịch"
        }
      ]
    };
  },
  created() {
    this.amount = this.$route.query.vnp_Amount;
    this.bankCode = this.$route.query.vnp_BankCode;
    this.bankTranNo = this.$route.query.vnp_BankTranNo;
    this.orderDescription = this.$route.query.vnp_OrderInfo;
    this.transactionNo = this.$route.query.vnp_TransactionNo;
    this.orderId = this.$route.query.vnp_TxnRef;
    this.code = this.$route.query.vnp_ResponseCode;
    if (this.code !== "00") {
      const errorResponse = this.findErrorCode(this.code);
      this.errorMessage = errorResponse.message;
    }
  },
  methods: {
    findErrorCode(code) {
      return this.errorResponseList.find(data => data.code === code);
    },
    backToHome() {
      this.$router.push({ name: "homepage" });
    },
    backToPayment() {
      this.$router.push({ name: "payment_cart" });
    }
  }
};
</script>

<style lang="scss" scoped>
.info {
  width: 40%;
  &--success {
    color: #00c853;
    svg {
      color: #00c853;
    }
  }
  &--error {
    color: #c8000a;
    svg {
      color: #c8000a;
    }
  }
  &--bill,
  &--more {
    div {
      margin-bottom: 0.5rem;
    }
    span {
      font-size: 15px;
    }
    span.show {
      color: #000;
      opacity: 0.8;
      font-size: 1rem;
      font-weight: 500;
    }
    span.price {
      font-size: 18px;
      font-weight: 600;
      color: #f96666;
    }
  }
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
</style>
