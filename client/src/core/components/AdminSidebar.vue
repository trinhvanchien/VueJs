<template>
  <div
    class="sidebar text_left"
    :data-theme="currentTheme"
    :class="{ collapseMenu: collapseMenu }"
  >
    <div class="sidebar--logo d_inline_block text_center">
      <router-link to="/">
        <div class="sidebar--logo-icon">
          <icon-base width="80" height="40" viewBox="0 0 664 301">
            <hoot-logo-black />
          </icon-base>
        </div>
      </router-link>
    </div>
    <ul class="sidebar--menu" v-if="roles && roles === 'Collaborator'">
      <router-link
        class="menu--item d_flex align_items_center"
        tag="li"
        active-class="active"
        exact
        v-for="(menu, index) in menusCoborator"
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
    <ul class="sidebar--menu" v-else>
      <router-link
        class="menu--item d_flex align_items_center"
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
</template>

<script>
import CookieFunction from "@/core/utils/cookie";
export default {
  data() {
    return {
      roles: "",
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
          to: "admin_account"
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
          text: "Quản lý ảnh",
          icon: {
            iconName: "manage-album",
            tagName: "icon-image",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_album"
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
          text: "Trợ giúp",
          icon: {
            iconName: "help",
            tagName: "icon-info",
            width: 24,
            height: 24,
            viewBox: "0 0 24 24"
          },
          to: "admin_help"
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
        },
        {
          text: "Quản lý market",
          icon: {
            iconName: "manage-market",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_store"
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
          text: "Quản lý từ khóa",
          icon: {
            iconName: "manage-key",
            tagName: "icon-post",
            width: 20,
            height: 20,
            viewBox: "0 0 540 540"
          },
          to: "admin_spin"
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
        }
      ],
      menusCoborator: [
        {
          text: "Quản lý ảnh",
          icon: {
            iconName: "manage-album",
            tagName: "icon-image",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_album"
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
        },
        {
          text: "Quản lý market",
          icon: {
            iconName: "manage-market",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_store"
        },
        {
          text: "Quản lý mã gia hạn",
          icon: {
            iconName: "manage-market",
            tagName: "icon-account",
            width: 24,
            height: 24,
            viewBox: "0 0 26 26"
          },
          to: "admin_code"
        }
      ]
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    collapseMenu() {
      return this.$store.getters.collapseMenu;
    }
  },
  async created() {
    const res = CookieFunction.getCookie("cfr");
    this.roles = res;
  }
};
</script>

<style scoped lang="scss">
.sidebar {
  padding: 28px 60px;
  width: 300px;
  transition: transform 0.3s ease-in-out, width 0.3s ease-in-out;
  .sidebar--logo {
    margin-bottom: 48px;
    height: 60px;
  }
  .sidebar--menu {
    padding-left: 0;
    list-style: none;
  }
  .menu--item {
    margin-bottom: 32px;
    font-family: "Open Sans", sans-serif;
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    &:last-child {
      margin-bottom: 0;
    }
    a {
      text-decoration: none;
      transition: all 0.4s ease;
      font-weight: normal;
      svg {
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
        vertical-align: middle;
        margin-top: 2px;
      }
    }
  }
  &.collapseMenu {
    width: 152px;
    .sidebar--logo-text {
      display: none;
    }
    .menu--item {
      .menu--item-text {
        display: none;
      }
    }
  }
}

/* ChangeColor */

// Light
.sidebar[data-theme="light"] {
  .sidebar--logo {
    a {
      color: #000;
    }
  }
  .menu--item {
    a {
      color: #666;
      &.active,
      &:hover {
        color: #000;
      }
    }
  }
  .menu--item.active {
    a {
      color: #000;
      font-weight: 600;
    }
  }
}

//Dark
.sidebar[data-theme="dark"] {
  .sidebar--logo {
    a {
      color: #f7f7f7;
    }
  }
  .menu--item {
    a {
      color: #ccc;
      &.active,
      &:hover {
        color: #f7f7f7;
      }
    }
  }
  .menu--item.active {
    a {
      color: #f7f7f7;
      font-weight: 600;
    }
  }
}

// Extra small devices (portrait phones, less than 576px)
// No media query for `xs` since this is the default in Bootstrap
// Small devices (landscape phones, 576px and up)
@media (min-width: 576px) {
}

// Medium devices (tablets, 768px and up)
@media (max-width: 768px) {
}

@media (min-width: 768px) {
}

// Large devices (desktops, 992px and up)
@media (min-width: 992px) {
}

// Extra large devices (large desktops, 1200px and up)
@media (min-width: 1200px) {
}
</style>
