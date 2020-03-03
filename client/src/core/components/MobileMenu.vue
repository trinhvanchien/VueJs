<template>
  <ms-modal-mobile
    name="ms-mobile-menu"
    :styleCustom="{ 'z-index': 99 }"
    :hiddenClose="false"
  >
    <div class="mobile p_4">
      <!-- START: HEADER MOBILE -->
      <div
        class="mobile--header d_flex align_items_center justify_content_center text_center mb_4"
      >
        <div
          class="mobile--header-wrap d_flex flex_column align_items_center justify_content_center"
        >
          <div
            class="mobile--header-avatar d_flex align_items_center justify_content_center mb_2"
          >
            <span>{{ user.name | getFirstLetter }}</span>
          </div>
          <div class="mobile--header-info">
            <div class="mobile--header-name">
              <h5>{{ user.name }}</h5>
            </div>
            <div class="mobile--header-email">
              <span>{{ user.email }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- END: HEADER MOBILE -->
      <!-- START: MENU MOBILE @click.prevent="openModuleSelected(menu.to)" -->
      <div class="mobile--menu">
        <ul class="mobile--menu-wrap">
          <router-link
            class="menu--item d_flex align_items_center py_3"
            tag="li"
            active-class="active"
            exact
            v-for="(menu, index) in menus"
            :key="index"
            :to="{ name: menu.to }"
          >
            <a href="#">
              <icon-base
                :icon-name="menu.icon.iconName"
                :width="menu.icon.width"
                :height="menu.icon.height"
                :viewBox="menu.icon.viewBox"
              >
                <component :is="menu.icon.tagName" />
              </icon-base>
              <span class="ml_2">{{ menu.text }}</span>
            </a>
          </router-link>
        </ul>
      </div>
      <!-- END: MENU MOBILE -->
    </div>
  </ms-modal-mobile>
</template>
<script>
export default {
  props: ["user"],
  data() {
    return {
      menus: [
        {
          text: "Bảng điều khiển",
          icon: {
            iconName: "home",
            tagName: "icon-home",
            width: 20,
            height: 20,
            viewBox: "0 0 24 24"
          },
          to: "admin_dashboard"
        },
        {
          text: "Gói tài khoản",
          icon: {
            iconName: "package",
            tagName: "icon-post",
            width: 20,
            height: 20,
            viewBox: "0 0 540 540"
          },
          to: "admin_package"
        },
        {
          text: "Quản lý tài khoản",
          icon: {
            iconName: "manage-account",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_account"
        },
        {
          text: "Quản lý đại lý",
          icon: {
            iconName: "manage-agency",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_agency"
        },
        {
          text: "Quản lý mã gia hạn",
          icon: {
            iconName: "manage-agency",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_code"
        },
        {
          text: "Quản lý VPS",
          icon: {
            iconName: "fbaccount",
            tagName: "icon-location",
            width: 24,
            height: 24,
            viewBox: "0 0 65 65"
          },
          to: "admin_vps"
        },
        {
          text: "Danh mục mẫu",
          icon: {
            iconName: "folder",
            tagName: "icon-folder",
            width: 24,
            height: 24,
            viewBox: "0 0 540 540"
          },
          to: "admin_categories"
        },
        {
          text: "Chiến dịch mẫu",
          icon: {
            iconName: "folder",
            tagName: "icon-folder",
            width: 24,
            height: 24,
            viewBox: "0 0 540 540"
          },
          to: "admin_schedule"
        }
      ]
    };
  },
  methods: {
    openModuleSelected(val) {
      this.$router.push({ name: val });
      this.$modalMobile.hide({ name: "ms-mobile-menu" });
    }
  },
  filters: {
    getFirstLetter(string) {
      if (string === undefined) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  }
};
</script>
<style lang="scss" scoped>
.mobile--header {
  color: #000;
  &-avatar {
    border: 5px solid #f96666;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    span {
      color: #f96666;
      font-size: 50px;
      font-weight: 700;
    }
  }
  h5 {
    font-size: 1.75rem;
    font-weight: 600;
  }
}
.mobile--menu-wrap {
  padding-left: 0;
  list-style: none;
  color: #444;
}
.menu--item {
  border-top: 1px solid #444;
  font-family: "Open Sans", sans-serif;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  &:last-child {
    border-bottom: 1px solid #444;
    margin-bottom: 0;
  }
  a {
    color: #444;
    text-decoration: none;
    transition: all 0.4s ease;
    font-weight: normal;
    svg {
      color: #444;
      margin-right: 18px;
      vertical-align: text-top;
    }
  }
  .menu--item-text {
    -webkit-animation: fadeIn 1s;
    animation: fadeIn 1s;
  }
  .friend {
    svg {
      color: #444;
      vertical-align: middle;
      margin-top: 2px;
    }
  }
}
</style>
