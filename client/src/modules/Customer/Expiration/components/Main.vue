<template>
  <div class="wrapper--main">
    <!-- Start: Price -->
    <section id="price" class="price">
      <price-expire />
    </section>
    <!-- End: Price -->
    <!-- Start: guide -->
    <section
      id="guide"
      class="guide"
      :style="{
        backgroundImage: 'url(' + backgroundMap + ')'
      }"
    >
      <div class="ct">
        <div class="section--title-content text_center py_3">
          <h3 class="title mb_0">HƯỚNG DẪN NÂNG CẤP GÓI SỬ DỤNG</h3>
          <h4 class="desc pt_3 mb_0">
            Để nâng cấp gói sử dụng các bạn vui lòng theo hướng dẫn dưới đây
          </h4>
        </div>
        <div class="r m_0">
          <div class="c_lg_6 c_md_12 mb_md_3 mb_3 c">
            <img src="@/assets/images/home/giahan.png" alt="Banner hoot" />
          </div>
          <div class="c_lg_6 c_md_12 mb_md_3 pl_md_3 pl_0">
            <p>
              Chuyển khoản số tiền theo các gói 3 tháng, 6 tháng, 1 năm đến số
              tài khoản:
            </p>
            <ul class="info--transfer">
              <li><span class="pr_5 mr_5">STK:</span> 19033047647025</li>
              <li><span class="pr_5 mr_5">Tên:</span> Trần Quốc Toản</li>
              <li><span class="mr_5">Ngân hàng:</span> Techcombank</li>
              <li><span class="mr_5">Chi nhánh:</span> Hà Nội</li>
              <li>
                Thông tin chuyển khoản với nội dung: "Email đăng ký Hoot của
                bạn"
              </li>
              <li>Hoot sẽ nâng cấp cho bạn ngay lập tức</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
    <!-- End: guide -->
  </div>
</template>

<script>
import PriceExpire from "./MainPrice";
export default {
  components: {
    PriceExpire
  },
  data() {
    return {
      backgroundMap: require("@/core/assets/images/home/map-bg.jpg")
    };
  }
};
</script>

<style scoped lang="scss">
@import "./styles/index.styles"
</style>
