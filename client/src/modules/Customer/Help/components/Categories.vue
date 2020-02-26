<template>
  <div class>
    <!-- Start: Category Introduce -->
    <div class="section introduce py_2">
      <div class="introduce--label">{{ category.label }}</div>
      <div
        class="introduce--img"
        :style="{ backgroundImage: 'url(' + category.icon + ')' }"
      ></div>
      <h2 class="title">{{ category.title }}</h2>
      <div class="content" v-html="category.content"></div>
      <hr class="line" />
    </div>
    <!-- End: Category Introduce -->
    <!-- Start: Popular Blog -->
    <div class="section popular--blog" v-if="category.popularBlog.length > 0">
      <h3 class="title mb_4">Bài viết phổ biến đến chủ đề này</h3>
      <div class="list--group">
        <div
          class="list--group-item"
          v-for="(blog, index) in category.popularBlog"
          :key="index"
        >
          <router-link
            class="link"
            :to="{
              name: 'help_detail',
              params: { id: blog._id },
              query: { type: 'hc_blog' }
            }"
            @click.native="showBlogDetail(blog._id)"
            >{{ blog.title }}</router-link
          >
        </div>
      </div>
    </div>
    <!-- End: Popular Blog -->
    <!-- Start: Related Categories -->
    <div
      class="section related--categories"
      v-if="category.relatedCategory.length > 0"
    >
      <h3 class="title">Chủ đề liên quan</h3>
      <div class="r cards mx_0">
        <div
          class="c_4 card p_4 d_flex flex_column align_items_center justify_content_center"
          v-for="(item, index) in category.relatedCategory"
          :key="`c-${index}`"
        >
          <router-link
            class="card--link"
            :to="{
              name: 'help_detail',
              params: { id: item._id },
              query: { type: 'hc_global_nav' }
            }"
            @click.native="showRelatedCategory(item._id)"
          >
            <div
              class="card--img mx_auto"
              :style="{ backgroundImage: 'url(' + item.icon + ')' }"
            ></div>
            <div class="content">
              <h5 class="describe mb_1">{{ item.label }}</h5>
              <h5 class="card--title mb_2">{{ item.title }}</h5>
              <div class="card--desc">{{ item.description }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <!-- End: Related Categories -->
  </div>
</template>

<script>
export default {
  props: ["category"],
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
    },
    async showRelatedCategory(categoryId) {
      await this.$store.dispatch("getCurrentHelpCategory", {
        id: categoryId,
        type: "hc_global_nav"
      });
      if (this.$store.getters.currentHelpCategory._blogHelp.length === 0) {
        await this.$store.dispatch("setHelpDetailViewActive", 1);
      } else {
        await this.$store.dispatch("setHelpDetailViewActive", 2);
      }
      this.$router.push({
        name: "help_detail",
        params: {
          id: categoryId
        },
        query: {
          type: "hc_global_nav"
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
/* Introduce */
.introduce {
  &--label {
    background: #6bcfef;
    border-radius: 4px;
    color: #fff;
    display: inline-block;
    font-size: 14px;
    padding: 4px 8px;
  }
  &--img {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    border-radius: 100%;
    cursor: pointer;
    margin: 0 0 0.625rem 0.625rem;
    float: right;
    height: 180px;
    width: 180px;
  }
  .title {
    color: #1c1e21;
    font-weight: 700;
    font-size: 2.25rem;
    line-height: 48px;
    margin: 12px 0 24px 0;
  }
  .content {
    /deep/ * {
      font-size: 1.125rem;
    }
    /deep/ img {
      width: 100%;
    }
    /deep/ p {
      margin-bottom: 1.125rem;
    }
  }
  .line {
    background: #e4e4e4;
    border-width: 0;
    height: 1px;
  }
}

/* Popular Blog */
.popular--blog {
  .title {
    color: #1c1e21;
    font-size: 1.375rem;
    font-weight: 100;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }
  .list--group {
    &-item {
      margin: 0.75rem 0;
      .link {
        color: #365899;
        cursor: pointer;
        font-size: 1.125rem;
        text-transform: none;
        &:hover,
        &:focus {
          text-decoration: underline;
        }
      }
    }
  }
}

/* Related Categories */
.related--categories {
  .title {
    color: #1c1e21;
    font-size: 1.375rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1.5rem;
  }
  .cards {
    .card {
      border: 1px solid #e4e4e4;
      border-radius: 0 !important;
      cursor: pointer;
      transition: background-color 0.4s ease;
      &:first-child {
        border-top-left-radius: 0.5rem !important;
        border-bottom-left-radius: 0.5rem !important;
      }
      &:nth-child(2) {
        border-left: 0 !important;
        border-right: 0 !important;
      }
      &:last-child {
        border-top-right-radius: 0.5rem !important;
        border-bottom-right-radius: 0.5rem !important;
      }
      &:hover,
      &:focus,
      &:active,
      &:visited {
        background-color: #f9f9f9;
      }
      &--link {
        color: #8d949e;
        text-decoration: none;
      }
      &--img {
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
        border-radius: 100%;
        margin-bottom: 1.5rem;
        height: 180px;
        width: 180px;
      }
    }
    .content {
      .describe {
        color: #6bcfef;
        font-size: 0.75rem;
        font-weight: 600;
        margin-bottom: 0;
        text-transform: uppercase;
      }
      .card--title {
        color: #1c1e21;
        font-size: calc(1rem + 2px);
        font-weight: 700;
      }
      .card--desc {
        font-size: calc(1rem - 3px);
      }
    }
  }
}
</style>
