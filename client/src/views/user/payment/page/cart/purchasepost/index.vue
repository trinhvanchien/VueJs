<template>
  <div class="purchase-post">
    <div class="purchase-post--counter">
      <div class="counter">
        <div class="counter--description">
          <span>Số bài đăng <small>( Tối thiểu 10 bài )</small> </span>
        </div>
        <div class="counter--amount">
          <button>-</button>
          <input type="text" readonly v-model="number" class="text_center" />
          <button>+</button>
        </div>
      </div>
    </div>
    <div class="purchase-post--price">
      10000 VNĐ
    </div>
    <div class="purchase-post--button">
      <button class="button--purchase">
        Thanh toán
      </button>
    </div>
  </div>
</template>

<script>
export default {};
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
    min-width: 8rem;
    padding: 0 1rem;
    text-align: right;
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
</style>
