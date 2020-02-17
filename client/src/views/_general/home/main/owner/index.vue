<template>
  <section
    id="owner"
    class="owner text_center px_3"
    :style="{
      backgroundImage: 'url(' + backgroundShow + ')'
    }"
  >
    <div class="title">Hơn 5000 doanh nghiệp và chủ shop đã sử dụng!</div>
    <div class="desc">
      Liên hệ ngay để được tư vấn dùng thử 3 ngày miễn phí!
    </div>
    <a
      class="btn--live-chat"
      target="_blank"
      href="https://www.facebook.com/hootvietnam/"
      >LIÊN HỆ NGAY BÂY GIỜ</a
    >
  </section>
</template>

<script>
export default {
  data() {
    return {
      backgroundShow: require("@/assets/images/home/polygon-bg-white.jpg")
    };
  }
};
</script>

<style scoped lang="scss">
$colorLogo: rgb(237, 28, 36);
$colorHover: #c31920;
// owner
.owner {
  background-attachment: fixed;
  background-size: cover;
  color: #333;
  padding: 6.25rem 0;
  &:before {
    background-color: rgba(0, 0, 0, 0.4);
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 38px;
    line-height: 44px;
    font-weight: 500;
  }
  .desc {
    font-size: 22px;
    margin: 1rem 0;
  }
  .btn--live-chat {
    display: block;
    cursor: pointer;
    width: 290px;
    padding: 0.7rem 0;
    margin: 0 auto;
    text-align: center;
    border-radius: 40px;
    font-size: 20px;
    background: $colorLogo;
    color: #fff;
    font-weight: 600;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &:hover {
      background: $colorHover;
    }
  }
}
@import "../index.style";
</style>
