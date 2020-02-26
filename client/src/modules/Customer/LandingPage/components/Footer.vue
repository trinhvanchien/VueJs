<template>
  <div
    class="wrapper--footer"
    :style="{
      backgroundImage: 'url(' + backgroundShow + ')'
    }"
  >
    <div class="content ct">
      <div class="r m_0">
        <div class="c_lg_3">
          <div class="title--footer logo">
            <icon-base width="72" icon-name="Logo Hoot" height="36" viewBox="0 0 664 301">
              <hoot-logo-black />
            </icon-base>
          </div>
          <!-- <div class="font--13 mb_3">
            Hoot luôn mong muốn hỗ trợ mọi người kinh doanh online tốt hơn, có
            nhiều thời gian hơn bên gia đình và người thân.
          </div>-->
          <div class="font--13 mb_3">CÔNG TY TNHH CÔNG NGHỆ VÀ DỊCH VỤ MASSO VIỆT NAM</div>
          <div class="font--13">
            Địa chỉ: Số 653, Ngõ 7, Đường Hồ Tùng Mậu, Tổ 17, Phường Cầu Diễn,
            Quận Nam Từ Liêm, Thành phố Hà Nội
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
              <span>hoot@massocorp.com</span>
            </li>
          </ul>
        </div>
        <div class="c_lg_3 mb_3">
          <div class="title--footer">Chính Sách</div>
          <ul>
            <router-link to="/policy" target="_blank">
              <li>Chính sách bảo mật</li>
            </router-link>
            <li>Điều kiện</li>
            <li>Quảng cáo</li>
          </ul>
        </div>
        <div class="c_lg_3 mb_3 register">
          <div class="title--footer">Đăng Ký Bản Tin</div>
          <div class="position_relative">
            <form action method="POST">
              <input type="email" required placeholder="Email" />
              <span class="icon--submit position_absolute">
                <icon-base class icon-name="Submit" width="22" height="22" viewBox="0 0 33 33">
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
              <a href="https://www.facebook.com/hootvietnam/" target="_blank">
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
              <a href="javascript: void(0)">
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
              href="https://www.facebook.com/hootvietnam/"
            >Liên hệ hỗ trợ</a>
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
      backgroundShow: require("@/core/assets/images/home/map-bg.jpg")
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
$color: #282828;
$colorLogo: rgb(237, 28, 36);
$colorHover: #c31920;
.wrapper--footer {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  font-size: 1rem;
  letter-spacing: 0px;
  color: #333;
  background-size: cover;
  // background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: center;
  //  Common
  img {
    max-width: 100%;
  }
  p {
    margin-bottom: 0;
    padding: 0;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  // Style
  .content {
    padding: 6.25rem 0;
    .title--footer {
      font-weight: 500;
      font-size: 1.4rem;
      color: $colorLogo;
      padding-bottom: 2rem;
      &.logo {
        color: #282828;
      }
    }
    ul {
      font-size: 1rem;
      color: #333;
      li {
        margin-bottom: 0.5rem;
      }
    }
    .register {
      input {
        font-size: 0.825rem;
        padding-left: 0.625rem;
        color: #333;
        height: 40px;
        box-shadow: none;
        outline: none;
        text-shadow: none;
        border: 0;
        width: 100%;
        border-radius: 0.625rem;
        background: #fff;
        padding-right: 40px;
        &::placeholder {
          color: #999;
        }
      }
      .icon--submit {
        right: 10px;
        top: 59%;
        transform: translateY(-50%);
        z-index: 10;
        cursor: pointer;
        svg {
          color: #999;
          transition: all 0.4s ease;
          &:hover {
            color: #666;
          }
        }
      }
      .list--contact {
        .icon {
          padding-right: 1rem;
          svg {
            // color: #fae9a0;
            transition: 0.4s;
            cursor: pointer;
            &.facebook {
              &:hover {
                color: #4267b2;
              }
            }
            &.youtube {
              &:hover {
                color: #ff0000;
              }
            }
          }
        }
      }
    }
  }
  .copy {
    color: #666;
    background-color: #eeeeee;
    padding: 1rem 0;
    font-size: 0.825rem;
    .contact {
      .items {
        padding: 0 1rem;
        transition: all 0.4s ease;
        &:hover {
          color: #444;
          text-decoration: underline;
        }
      }
    }
  }
}

// ============= RESPONSIVE
@media screen and (max-width: 991px) {
  .wrapper--footer {
    .copy {
      padding: 1rem 0;
      .content--copy {
        flex-direction: column;
      }
      .contact {
        margin-left: 0 !important;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .wrapper--footer {
    .content {
      .title--footer {
        padding-bottom: 0;
      }
    }
    .copy {
      .contact {
        display: none !important;
      }
    }
  }
}
</style>
