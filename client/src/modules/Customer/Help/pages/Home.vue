<template>
  <div class="home">
    <div class="top">
      <div class="ct">
        <div class="r pd">
          <div class="left c_xl_6 c_lg_6 c_md_6 c_12">
            <h3 class="mb_3">Có thể bạn chưa biết ?</h3>
            <ul
              class="blog"
              v-if="
                popularHelp.popular_blog && popularHelp.popular_blog.length > 0
              "
            >
              <li
                v-for="(item, index) in popularHelp.popular_blog"
                :key="`c-${index}`"
              >
                <router-link
                  class="d_inline_block"
                  :to="{
                    name: 'help_detail',
                    params: { id: item._id },
                    query: { type: 'hc_blog' }
                  }"
                  @click.native="showBlogDetail(item._id)"
                  >{{ item.title }}</router-link
                >
              </li>
            </ul>
            <div v-else>Chưa có bài viết nào</div>
          </div>
          <div
            class="right c_xl_6 c_lg_6 c_md_6 c_12"
            :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
          ></div>
        </div>
      </div>
    </div>
    <div class="ct">
      <!-- Start: Top Subject -->
      <div class="popular--topics pd">
        <h3 class="mb_4">Chủ đề phổ biến</h3>
        <div class="r m_0">
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center mb_3 mb_lg_0">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Trang cá nhân và cài đặt</div>
              <div class="content mt_2">
                Tìm hiểu cách thêm ảnh đại điện, chỉnh sửa thông tin và quản lý
                bài viết trên Dòng thời gian của bạn.
              </div>
            </div>
          </div>
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center mb_3 mb_lg_0">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Chiến dịch</div>
              <div class="content mt_2">
                Nhận trợ giúp quản lý chiến dịch và hiểu cách tương tác với
                chiến dịch mà bạn quan tâm.
              </div>
            </div>
          </div>
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Trò chuyện</div>
              <div class="content mt_2">
                Tìm câu trả lời về cách gửi và nhận tin nhắn trên hệ thống Hoot.
              </div>
            </div>
          </div>
          <div class="c_12 c_md_6 c_lg_3 topic--card text_center">
            <div class="topic--card-content">
              <div
                class="img--position"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div class="topic--name mt_2">GIỚI THIỆU</div>
              <div class="title">Thông báo</div>
              <div class="content mt_2">
                Thay đổi nội dung bạn sẽ được thông báo trên hệ thống và quyết
                định cách nhận các thông báo đó.
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Top Subject -->
      <!-- Start: Other Search-->
      <div
        class="search--other pd d_flex flex_column justify_content_center align_items_center"
      >
        <h3 class="text_center mb_3">Bạn tìm kiếm điều khác?</h3>
        <div class="text_center description">
          Khám phá Cộng đồng trợ giúp của chúng tôi hoặc tìm hiểu thêm về Quảng
          cáo trên Facebook
        </div>
        <div class="r">
          <div class="pd-lr d_inline_flex">
            <div class="c_6 text_center">
              <div
                class="img"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div>
                <a href class="access--public access--help"
                  >Nhắn tin với quản trị viên</a
                >
              </div>
              <div class="des--content">
                <div class="text">
                  Nhắn tin với quản trị viên để được hỗ trợ những gì bạn đang
                  thắc mắc.
                </div>
              </div>
            </div>

            <div class="c_6 text_center">
              <div
                class="img advertise"
                :style="{ backgroundImage: 'url(' + srcDefault + ')' }"
              ></div>
              <div>
                <a target="_blank" class="access--public access--help-advertise"
                  >Truy cập cộng đồng trợ giúp</a
                >
              </div>
              <div class="des--content">
                <div class="text">
                  Tìm hiểu thêm về cách sử dụng hệ thống qua những câu trả lời
                  trên diễn dàn.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- End: Other Search-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      srcDefault: require("@/core/assets/images/home-help.png")
    };
  },
  computed: {
    popularHelp() {
      return this.$store.getters.popularHelp;
    }
  },
  async created() {
    await this.$store.dispatch("getPopularHelp");
  },
  methods: {
    async showBlogDetail(blogId) {
      await this.$store.dispatch("getBlogById", blogId);
      await this.$store.dispatch("setHelpDetailViewActive", 3);
      this.$router.push({
        name: "help_detail",
        params: { id: blogId },
        query: {
          type: "hc_blog"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  background-color: rgba(237, 28, 36, 0.1);
}
.left {
  .blog {
    list-style-type: none;
    margin: 0;
    padding: 0;
    a {
      background-color: #ed1c24;
      border-radius: 1rem;
      color: #fff;
      cursor: pointer;
      font-size: calc(1rem + 2px);
      margin-bottom: 1rem;
      padding: 0.5rem 1rem;
      &:hover {
        text-decoration: none;
      }
    }
  }
}
.right {
  background-position: 0 0;
  background-repeat: no-repeat;
  background-size: auto;
  height: 324px;
}
.pd {
  padding: 30px 0;
}

.popular--topics {
  .topic--card {
    padding-left: 0;
    .topic--card-content {
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
      border-right: 0;
      border-radius: 0.25rem;
      cursor: pointer;
      padding: 1.5rem 1rem;
      height: 100%;
      transition: background-color 0.4s ease;
      &:hover {
        background: #f9f9f9;
      }
    }
    &:nth-child(1) {
      .img--position {
        background-position: -181px -932px;
      }
    }
    &:nth-child(2) {
      .img--position {
        background-position: 0 -751px;
      }
    }
    &:nth-child(3) {
      .img--position {
        background-position: -181px -570px;
      }
    }
    &:nth-child(4) {
      .img--position {
        background-position: 0 -570px;
      }
    }
    .img--position {
      margin: 0 auto;
      height: 180px;
      width: 180px;
      display: inline-block;
      background-size: auto;
      background-repeat: no-repeat;
    }
    .topic--name {
      text-align: left;
      font-size: 0.825rem;
      color: $color-dark-1;
    }
    .title {
      text-align: left;
      color: $color-light;
      font-size: 1rem;
      font-weight: bold;
    }
    .content {
      text-align: left;
      color: $color-dark-3;
      font-size: 0.875rem;
    }
  }
}

.search--other {
  .pd-lr {
    margin: 0 auto;
  }
  .description {
    font-size: 15px;
    margin-bottom: 15px;
  }
  .img {
    width: 244px;
    height: 244px;
    background-position: -245px -325px;
    margin: 0 auto;
  }
  .advertise {
    background-position: 0 -325px;
  }
  .access--public {
    border: 1px solid $mainBrandColor;
    border-radius: 0.5rem;
    padding: 10px 15px;
    display: inline-block;
    background: $mainBrandColor;
    color: $color-dark;
    transition: all 0.4s ease;
    &:hover {
      background: #c31920;
    }
    svg {
      transform: rotate(-180deg);
      margin-top: -7px;
      margin-right: 5px;
    }
  }
  .des--content {
    font-size: 14px;
    margin: 0;
    padding: 1rem;
    .text {
      max-width: 300px;
    }
  }
}
</style>
