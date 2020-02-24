<template>
  <div class="notification--wrapper" :data-theme="currentTheme">
    <div class="notification--content">
      <!-- Start: Notification Header -->
      <div
        class="notification--header d_flex align_items_center justify_content_between"
      >
        <div class="title">Thông báo</div>
        <div class="action">Đánh dấu tất cả là đã đọc</div>
      </div>
      <!-- End: Notification Header -->
      <!-- Start: Notification List -->
      <VuePerfectScrollbar class="notification--body">
        <div class="notification--list">
          <div
            class="notification--list-item d_flex align_items_center"
            v-for="(item, index) in notifications"
            :key="index"
            :class="[item.status ? 'item--read' : '']"
          >
            <div class="item--image">
              <img :src="item.image" alt />
            </div>
            <div class="item--info">
              <div class="item--content mb_1">{{ item.content }}</div>
              <div class="item--time">{{ item.time }}</div>
            </div>
            <div class="item--action">
              <div
                class="btn--more text_right"
                @click="showActionDropdown(index)"
              >
                <icon-base
                  :class="[isShowActionDropdown === index ? 'active' : null]"
                  width="24px"
                  height="10px"
                  viewBox="0 0 400 400"
                >
                  <icon-three-dots-horiz />
                </icon-base>
              </div>
              <div
                class="dropdown--menu position_absolute"
                v-if="isShowActionDropdown === index"
              >
                <div class="dropdown--menu-item" @click="closeDropdown()">
                  Gỡ thông báo này
                </div>
                <div
                  class="dropdown--menu-item"
                  v-if="item.status"
                  @click="closeDropdown()"
                >
                  Đánh dấu là chưa đọc
                </div>
                <div
                  class="dropdown--menu-item"
                  v-else
                  @click="closeDropdown()"
                >
                  Đánh dấu là đã đọc
                </div>
              </div>
            </div>
          </div>
        </div>
      </VuePerfectScrollbar>
      <!-- End: Notification List -->
      <!-- Start: Notification Footer -->
      <div class="notification--footer text_center">
        <div class="btn--see-all" @click="seeAllNotifications()">
          Xem tất cả
        </div>
      </div>
      <!-- End: Notification Footer -->
    </div>
  </div>
</template>

<script>
import VuePerfectScrollbar from "vue-perfect-scrollbar";

export default {
  components: {
    VuePerfectScrollbar
  },
  props: ["notifications"],
  data() {
    return {
      isShowActionDropdown: null
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeDropdown() {
      this.isShowActionDropdown = null;
    },
    seeAllNotifications() {
      this.$router.push({ name: "notifications" });
      this.$emit("closeDropdown", false);
    },
    showActionDropdown(index) {
      this.isShowActionDropdown = index;
    }
  }
};
</script>

<style lang="scss" scoped>
.notification--wrapper {
  border: 1px solid;
  border-radius: 0.625rem;
  font-size: 0.825rem;
  transform-origin: top;
  transition: all 0.4s ease-in-out;
  &::before {
    border-radius: 6px 0 0;
    content: "";
    height: 15px;
    position: absolute;
    right: 17px;
    top: -6px;
    transform: rotate(45deg);
    width: 15px;
    z-index: 99999;
  }
  .notification--content {
    .notification--header {
      border: 1px solid;
      border-top-left-radius: 0.625rem;
      border-top-right-radius: 0.625rem;
      padding: 0.5rem 0.75rem;
      .title {
        font-weight: 600;
      }
      .action {
        cursor: pointer;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    .notification--body {
      max-height: 260px;
      .notification--list {
        border: 1px solid;
        border-top: 0;
        border-bottom: 0;
        &-item {
          border-bottom: 1px solid;
          padding: 0.5rem 0.75rem;
          transition: background-color 0.4s ease;
          &:hover {
            .item--action {
              display: block;
            }
          }
          &:last-child {
            border-bottom: 0;
          }
          .item--action {
            display: none;
            cursor: pointer;
            width: 30px;
            .btn--more {
              svg {
                transition: all 0.2s ease;
              }
            }
            .dropdown--menu {
              border-radius: 0.625rem;
              padding: 0.5rem 0;
              right: 0.75rem;
              z-index: 9999;
              &-item {
                padding: 0.375rem 0.75rem;
                transition: all 0.4s ease;
                &:hover {
                  background-color: #ed1c24;
                  color: #fff;
                }
              }
            }
          }
          .item--image {
            margin-right: 0.75rem;
            width: 50px;
            img {
              border-radius: 100%;
              height: 50px;
              width: 50px;
            }
          }
          .item--info {
            width: calc(100% - 80px - 0.75rem);
            .item--content {
              line-height: 1.2;
            }
            .item--time {
              font-size: 0.75rem;
            }
          }
        }
      }
    }
    .notification--footer {
      border: 1px solid;
      border-bottom-left-radius: 0.625rem;
      border-bottom-right-radius: 0.625rem;
      padding: 0.5rem 0.75rem;
      .btn--see-all {
        cursor: pointer;
        font-weight: 600;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}

/* Transition */
.dropdown-enter,
.dropdown-leave-to {
  transform: scaleY(0);
}

/* Theme Color */
/* Light */
.notification--wrapper[data-theme="light"] {
  background-color: #fff;
  border-color: #e4e4e4;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  color: #444;
  &::before {
    background-color: #fff;
  }
  .notification--content {
    .notification--header {
      border-color: #e4e4e4;
      .title {
      }
      .action {
        color: #ed1c24;
      }
    }
    .notification--body {
      .notification--list {
        border-color: #e4e4e4;
        &-item {
          background-color: #fafafa;
          border-bottom-color: #efefef;
          &:hover {
            background-color: #f7f7f7;
          }
          &.item--read {
            background-color: #fff;
            &:hover {
              background-color: #f7f7f7;
            }
          }
          .item--action {
            .btn--more {
              svg {
                color: #ccc;
                &:hover {
                  color: #999999;
                }
                &.active {
                  color: #666666;
                }
              }
            }
            .dropdown--menu {
              background-color: #fff;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
          }
          .item--time {
            color: #999999;
          }
        }
      }
    }
    .notification--footer {
      border-color: #e4e4e4;
      .btn--see-all {
        color: #ed1c24;
      }
    }
  }
}

/* Dark */
.notification--wrapper[data-theme="dark"] {
  background-color: #27292c;
  border-color: #444444;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
  color: #f7f7f7;
  &::before {
    background-color: #27292c;
  }
  .notification--content {
    .notification--header {
      border-color: #444444;
      .title {
      }
      .action {
        color: #ed1c24;
      }
    }
    .notification--body {
      .notification--list {
        border-color: #444444;
        &-item {
          background-color: rgba(47, 49, 54, 0.7);
          border-bottom-color: #444444;
          &:hover {
            background-color: #313437;
          }
          &.item--read {
            background-color: #27292c;
            &:hover {
              background-color: #313437;
            }
          }
          .item--action {
            .btn--more {
              svg {
                color: #666;
                &:hover {
                  color: #999999;
                }
                &.active {
                  color: #cccccc;
                }
              }
            }
            .dropdown--menu {
              background-color: #27292c;
              box-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
            }
          }
          .item--time {
            color: #999999;
          }
        }
      }
    }
    .notification--footer {
      border-color: #444444;
      .btn--see-all {
        color: #ed1c24;
      }
    }
  }
}
</style>
