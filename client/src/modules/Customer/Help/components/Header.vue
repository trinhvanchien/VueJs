<template>
  <div class="content--header-help">
    <div class="ct">
      <div class="r mx_0 mb_3">
        <!-- Start header logo help   -->
        <div class="c_md_3">
          <div class="logo d_flex align_items_end">
            <icon-base width="72" height="36" viewBox="0 0 664 301">
              <hoot-logo-white />
            </icon-base>
            <div class="center--support ml_2" @click="goToHelpHome">
              Trung tâm trợ giúp
            </div>
          </div>
        </div>
        <!-- End header logo help   -->
        <!-- Start search help   -->
        <div class="c_md_6">
          <div class="wrap--search">
            <div class="search">
              <icon-base
                icon-name="search"
                width="26"
                height="24"
                viewBox="0 0 24 24"
              >
                <icon-input-search />
              </icon-base>
              <input
                type="text"
                placeholder="Xin chào, chúng tôi có thể giúp gì cho bạn?"
                v-model="keyword"
                @keydown.enter="searchQuestion"
              />
            </div>
          </div>
        </div>
        <!-- End search help   -->
        <!-- Start back facebook   -->
        <div class="c_md_3 d_flex align_items_center">
          <div class="content--back">
            <div class="icon">
              <icon-base
                icon-name="back"
                width="25"
                height="22"
                viewBox="0 0 25 25"
              >
                <icon-logout />
              </icon-base>
            </div>
            <router-link to="/">
              <div class="text">Quay lại Hoot</div>
            </router-link>
          </div>
        </div>
        <!-- End back facebook   -->
      </div>
      <!-- Start: Navigation help-->
      <div class="wrap--nav">
        <nav>
          <ul class="menu--help d_inline_flex">
            <!-- Start: Home -->
            <li class="menu--help-item flex_fill item--active">
              <a @click="goToHelpHome">Trang chủ</a>
            </li>
            <!-- End: Home -->
            <!-- Start: Menu Items Loop -->
            <li
              class="menu--help-item flex_fill"
              v-for="(category, index) in allHelpCategories.slice(0, 4)"
              :key="index"
            >
              {{ category.title }}
              <ul
                class="dropdown--menu"
                v-if="category.children && category.children.length > 0"
              >
                <li
                  class="dropdown--menu-item"
                  v-for="(categoryChild, cindex) in category.children"
                  :key="cindex"
                >
                  <router-link
                    :to="{
                      name: 'help_detail',
                      params: { id: categoryChild._id },
                      query: { type: 'hc_global_nav' }
                    }"
                    @click.native="showCurrentHelpCategory(categoryChild._id)"
                    >{{ categoryChild.title }}</router-link
                  >
                </li>
              </ul>
            </li>
            <!-- End: Menu Items Loop -->
            <!-- Start: Mail -->
            <li class="menu--help-item flex_fill" @click="openEmail">
              <a :href="`https://mail.google.com`" target="_blank">
                <div class="mail--help d_flex">
                  <div class="icon--envelope mr_1">
                    <icon-base
                      icon-name="mail"
                      width="22"
                      height="20"
                      viewBox="0 0 22 22"
                    >
                      <icon-envelope />
                    </icon-base>
                  </div>
                  <div>Hộp thư hỗ trợ</div>
                </div>
              </a>
            </li>
            <!-- End: Mail -->
          </ul>
        </nav>
      </div>
      <!-- End: Navigation help-->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      hrefDefault: "mailto:khangle0608@gmail.com",
      keyword: "",
      sizeDefault: 100,
      pageDefault: 1
    };
  },
  computed: {
    allHelpCategories() {
      return this.$store.getters.allHelpCategoriesChild;
    }
  },
  async created() {
    const keyword = this.$route.query.key,
      dataSender = {
        keyword: keyword,
        size: this.sizeDefault,
        page: this.pageDefault
      };

    if (keyword) {
      await this.$store.dispatch("searchBlog", dataSender);
      await this.$store.dispatch("setKeySearch", this.keyword);
      this.$router.push({
        name: "help_search",
        query: { key: keyword }
      });
    }
    this.keyword = keyword;
  },
  methods: {
    goToHelpHome() {
      this.$router.push({ name: "help" });
    },
    async showCurrentHelpCategory(categoryId) {
      await this.$store.dispatch("getCurrentHelpCategory", {
        id: categoryId,
        type: "hc_global_nav"
      });
      if (this.$store.getters.currentHelpCategory._blogHelp.length === 0) {
        await this.$store.dispatch("setHelpDetailViewActive", 1);
      } else {
        await this.$store.dispatch("setHelpDetailViewActive", 2);
      }
    },
    openEmail() {
      window.location.assign("mailto: kythuatchatbee@gmail.com");
    },
    async searchQuestion() {
      const dataSender = {
        keyword: this.keyword,
        size: this.sizeDefault,
        page: this.pageDefault
      };
      await this.$store.dispatch("searchBlog", dataSender);
      await this.$store.dispatch("setKeySearch", this.keyword);
      this.$router.push({
        name: "help_search",
        query: { key: this.keyword }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.content--header-help {
  background-color: #272a2c;
  padding-top: 20px;
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
}

// header logo help
.logo {
  cursor: pointer;
  .icon {
    color: $color-dark;
    margin: 0;
  }
  .center--support {
    font-weight: bold;
    color: $color-dark;
  }
}

// header--search

.wrap--search {
  svg {
    color: rgba(255, 255, 255, 0.5);
  }
  input {
    background-color: #fff;
    border: 0;
    border-radius: 5px;
    color: #444444;
    font-size: 0.875rem;
    height: 40px;
    line-height: 40px;
    outline: none;
    padding-left: 2.25rem;
    width: 100%;
    &::placeholder {
      font-size: 0.825rem;
    }
  }
  .search svg {
    position: absolute;
    top: 12px;
    left: 25px;
    z-index: 100;
    color: #ed1c24;
    stroke: #ed1c24;
    stroke-width: 0.5;
  }
}

// content--back

.content--back {
  color: #fff;
  cursor: pointer;
  display: flex;
  opacity: 0.75;
  transition: opacity 0.4s ease;
  svg {
    color: #fff;
    margin-top: -7px;
    margin-right: 5px;
    transform: rotate(-180deg);
    stroke: #fff;
    stroke-width: 1;
  }
  &:hover {
    opacity: 1;
  }
}

a {
  text-decoration: none;
  color: inherit;
}
// menu
.menu--help {
  .item--active {
    border-bottom: 2px solid #fff;
    color: #fff !important;
  }
  .menu--help-item {
    position: relative;
    color: rgba(255, 255, 255, 0.75);
    height: 45px;
    cursor: pointer;
    padding: 0.75rem 1rem;
    font-size: 0.875rem;
    font-weight: 600;
    transition: all 0.4s ease;
    &:hover {
      background: #ed1c24;
      border-radius: 0.5rem 0.5rem 0 0;
      color: #fff;
      .dropdown--menu {
        display: block;
      }
    }
    .dropdown--menu {
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
      position: absolute;
      top: 100%;
      left: 0;
      background: $mainDefault;
      color: $color-dark-2;
      min-width: 300px;
      z-index: 100;
      display: none;
      &-item {
        color: #666;
        font-weight: normal;
        padding: 0.5rem 1rem;
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
}

.mail--help {
  .icon--envelope {
    margin-top: 4px;
    svg {
      color: #fff;
      stroke: #fff;
      stroke-width: 0.2;
    }
  }
}
</style>
