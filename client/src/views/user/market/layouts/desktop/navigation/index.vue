<template>
  <div class="nav--root r mx_0">
    <div class="ct">
      <div class="d_flex align_items_center">
        <ul class="nav--list" data-test-selector="category-menu">
          <li class="nav--item">
            <a class="nav--link" @click.prevent="goToHome">Tất cả</a>
          </li>
          <li
            class="nav--item"
            v-if="!currentParentMarketCategory.children"
          ></li>
          <li
            v-else
            class="nav--item"
            v-for="(category,
            index) in currentParentMarketCategory.children.slice(0, 7)"
            :key="index"
            @click.prevent="loadProductByCategory(category._id)"
          >
            <a class="nav--link">{{ category.name }}</a>
          </li>
          <li class="nav--item position_relative" aria-label="more">
            <a class="nav--link" @click="isShowMore = !isShowMore">Xem thêm</a>
            <ul
              class="cate--more position_absolute"
              v-if="isShowMore === true"
              v-click-outside="close"
            >
              <li v-if="!currentParentMarketCategory.children"></li>
              <li
                v-else
                v-for="(category,
                rindex) in currentParentMarketCategory.children.slice(7)"
                :key="rindex"
                @click.prevent="loadProductByCategory(category._id)"
              >
                {{ category.name }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowMore: false
    };
  },
  computed: {
    currentParentMarketCategory() {
      return this.$store.getters.currentParentMarketCategory;
    }
  },
  methods: {
    close() {
      this.isShowMore = false;
    },
    goToHome() {
      this.$router.push({ name: "market_home" });
    },
    async loadProductByCategory(categoryId) {
      await this.$store.dispatch("getProductsByCategory", categoryId);
      await this.close();
      this.$router.push({
        name: "market_list",
        params: {
          categoryParent: this.currentParentMarketCategory._id,
          subCategory: categoryId
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.nav--root {
  background-color: #f5f5f5;
  border-bottom: 1px solid #e1e8ed;
  .nav--list {
    font-size: 0.875rem;
    float: left;
    list-style: none;
    padding: 7px 0 0;
    margin: 0;
    .nav--item {
      float: left;
      position: relative;
      &:hover .nav--link {
        background-color: #ddd;
        color: #000;
        cursor: pointer;
      }
    }
    .nav--link {
      border-radius: 0.25rem;
      color: hsl(0, 0%, 40%);
      display: block;
      padding: 0 10px;
      white-space: nowrap;
      line-height: 35px;
      height: 35px;
      text-decoration: none;
      transition: all 0.4s ease;
    }
  }
  .cate--more {
    list-style: none;
    border: 1px solid #e4e4e4;
    background-color: #fafafa;
    min-width: 230px;
    max-width: 300px;
    padding-left: 0;
    margin-bottom: 0;
    z-index: 99;
    li {
      cursor: pointer;
      padding: 0.5rem 1rem;
      &:hover,
      &:focus,
      &:visited,
      &:active {
        background-color: #e4e4e4;
        color: #ed1c24;
        transition: all 0.5s ease;
      }
    }
  }
}
</style>
