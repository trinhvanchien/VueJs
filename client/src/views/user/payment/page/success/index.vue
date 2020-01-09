<template>
  <div class="ct success">
    <div class="card">
      <div class="card_body d_flex align_items_center justify_content_center">
        <div class="info">
          <div class="info--status text_center mb_4">
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
                  >Thông tin khác</span
                >
              </div>
              <div
                class="info--bill-card d_flex align_items_center justify_content_between"
              >
                <span>Số thẻ thanh toán</span>
                <span class="show">11222332323232332</span>
              </div>
              <div
                class="info--bill-price d_flex align_items_center justify_content_between"
              >
                <span>Tổng tiền thanh toán</span>
                <span class="price">600000 VND</span>
              </div>
            </div>
            <div class="mt_4 text_center">
              <button>Quay lại trang chủ</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.info {
  width: 40%;
  &--status {
    color: #00c853;
    svg {
      color: #00c853;
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
