<template>
  <div
    class="wrapper--footer"
    :style="{
      backgroundImage: 'url(' + backgroundShow + ')'
    }"
  >
    <div class="content ct">
      <div class="r m_0">
        <div class="c_lg_3 mb_3">
          <div class="title--footer logo">
            <icon-base
              width="72"
              icon-name="Logo Hoot"
              height="36"
              viewBox="0 0 664 301"
            >
              <hoot-logo-black />
            </icon-base>
          </div>
          <div class="font--13">
            Hoot luôn mong muốn hỗ trợ mọi người kinh doanh online tốt hơn, có
            nhiều thời gian hơn bên gia đình và người thân.
          </div>
        </div>
        <div class="c_lg_3 mb_3">
          <div class="title--footer">Thông Tin Hỗ Trợ</div>
          <ul>
            <li>Địa Chỉ: Toà nhà Capital, 102 Trường Chinh, Hà Nội</li>
            <li>
              Hotline:
              <!-- <span v-if="agencyInfo" v-text="agencyInfo.phone"></span> -->
              <span>(+84) 856449666 - (+84) 799449666</span>
            </li>
            <li>
              Email:
              <!-- <span v-if="agencyInfo" v-text="agencyInfo.email"></span> -->
              <span>Cskh@hoot.Vn</span>
            </li>
          </ul>
        </div>
        <div class="c_lg_3 mb_3">
          <div class="title--footer">Chính Sách</div>
          <ul>
            <li>Chính sách bảo mật</li>
            <li>Điều kiện</li>
            <li>Quảng cáo</li>
          </ul>
        </div>
        <div class="c_lg_3 mb_3 register">
          <div class="title--footer">Đăng Ký Bản Tin</div>
          <div class="position_relative">
            <form action="" method="POST">
              <input type="email" required placeholder="Email" />
              <span class="icon--submit position_absolute">
                <icon-base
                  class
                  icon-name="Submit"
                  width="22"
                  height="22"
                  viewBox="0 0 33 33"
                >
                  <icon-arrow-right />
                </icon-base>
                <!-- <icon-base class="fb" icon-name="Submit" width="24" height="24" viewBox="0 0 25 25">
                  <icon-close/>
                </icon-base>-->
              </span>
            </form>
          </div>
          <div class="list--contact d_flex mt_4">
            <div class="icon">
              <a href="https://www.facebook.com/zinbeeauto/" target="_blank">
                <icon-base
                  class="facebook"
                  icon-name="facebook"
                  width="24"
                  height="24"
                  viewBox="0 0 105 105"
                >
                  <icon-facebook />
                </icon-base>
              </a>
            </div>
            <!-- <div class="icon">
              <a href="https://www.facebook.com/zinbeeauto/" target="_blank"></a>
              <icon-base
                class="instagram"
                icon-name="instagram"
                width="30"
                height="30"
                viewBox="0 0 550 550"
              >
                <icon-instagram-simple />
              </icon-base>
            </div>-->
            <div class="icon">
              <a
                href="https://www.youtube.com/channel/UC95EoWnJWWbRUzc4BRgKCZg"
                target="_blank"
              >
                <icon-base
                  class="youtube"
                  icon-name="youtube"
                  width="26"
                  height="26"
                  viewBox="0 0 100 100"
                >
                  <icon-youtube />
                </icon-base>
              </a>
            </div>
            <!-- <div class="icon">
              <a href="https://www.facebook.com/zinbeeauto/" target="_blank"></a>
              <icon-base
                class="twitter"
                icon-name="twitter"
                width="30"
                height="30"
                viewBox="0 0 500 500"
              >
                <icon-tiwtter />
              </icon-base>
            </div>-->
          </div>
        </div>
      </div>
    </div>
    <div class="copy">
      <div class="ct m_auto d_flex align_items_center content--copy">
        <div class="title">Copyright © 2019 hoot.vn</div>
        <div class="ml_auto d_flex contact">
          <!-- <div class="items">Chính sách bảo mật</div>
          <div class="items">Giới thiệu</div>
          <div class="items">Hỏi đáp</div>-->
          <!-- <div class="items">Liên hệ hỗ trợ</div> -->
          <div class="items">
            <a
              class="btn--live-chat"
              target="_blank"
              href="https://www.facebook.com/zinbeeauto/?ref=br_tf&epa=SEARCH_BOX"
              >Liên hệ hỗ trợ</a
            >
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
      backgroundShow: require("@/assets/images/home/map-bg.jpg")
    };
  },
  computed: {
    agencyInfo() {
      return this.$store.getters.agencyInfo;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
