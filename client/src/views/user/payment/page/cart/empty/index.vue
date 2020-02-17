<template>
  <div class="empty">
    <div class="empty--alert p_3 mb_3">
      <span class="icon mr_3">
        <icon-base icon-name="close" width="14" height="14" viewBox="0 0 23 23">
          <icon-close />
        </icon-base>
      </span>
      <span>Giỏ hàng không có sản phẩm. Vui lòng thực hiện lại.</span>
    </div>
    <div class="empty--amount mb_3">
      <div class="empty--amount-title d_flex align_items_center">
        <span class="empty--amount-cart">GIỎ HÀNG</span>
        <span class="empty--amount-number ml_1">( 0 sản phẩm )</span>
      </div>
    </div>
    <div class="empty--main text_center d_flex flex_column align_items_center">
      <div
        class="empty--image mb_3"
        :style="{ backgroundImage: 'url( ' + imgCart + ' )' }"
      ></div>
      <div class="mb_3">Không có sản phẩm nào trong giỏ hàng của bạn.</div>
      <div class="empty--action">
        <label class="btn--back">Quay lại trang chủ</label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      imgCart: require("@/assets/images/add_to_cart.svg")
    };
  }
};
</script>
<style lang="scss" scoped>
.empty {
  &--alert {
    background-color: #fff;
    border: 1px solid #f96666;
    border-radius: 0.5rem;
    color: #f96666;
    font-size: 0.875rem;
  }
  &--amount {
    &-cart {
      font-size: 18px;
      font-weight: 500;
    }
    &-number {
      font-size: 0.875rem;
    }
  }
  &--main {
    padding: 30px;
    background-color: #fff;
  }
  &--image {
    width: 200px;
    height: 160px;
    background-position: 0 0;
    background-size: 200px 160px;
    background-repeat: no-repeat;
  }
  &--action {
    label {
      background-color: #f96666;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      padding: 0.5rem 1rem;
    }
  }
}
</style>
