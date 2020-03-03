<template>
  <div>
    <h5 class="desc mb_3">
      Nhập email hoặc số điện thoại để tìm kiếm tài khoản cần kích hoạt
    </h5>
    <div
      class="top d_flex justify_content_between align_items_center mb_4"
      :data-theme="currentTheme"
    >
      <div class="top--search d_flex">
        <div class="input--wrap position_relative">
          <input
            type="text"
            placeholder="Tìm kiếm"
            v-model="search"
            @keydown.enter="searchUsers"
          />
          <div class="search--icon position_absolute">
            <icon-base
              icon-name="Tìm kiếm"
              width="16.772"
              height="17.287"
              viewBox="0 0 16.772 17.287"
            >
              <icon-input-search />
            </icon-base>
          </div>
        </div>

        <div class="btn btn--active ml_3" @click="openModalActiveCode">
          Kích hoạt bằng mã
        </div>
      </div>
      <div class="d_flex justify_content_end align_items_center">
        <div class="top--filter">
          <div
            class="select--wrapper position_relative d_flex align_items_center"
            @click="showStatusFilter"
          >
            <div class="ic--filter mr_2">
              <icon-base
                icon-name="filter"
                width="16"
                height="16"
                viewBox="0 0 400 400"
              >
                <icon-filter />
              </icon-base>
            </div>
            <div class="selected">{{ statusFilter }}</div>
            <div
              class="options position_absolute m_0"
              v-if="isShowStatusFilter === true"
            >
              <div
                class="option"
                v-for="(item, index) in statusOptions"
                :key="index"
                @click="filterByStatus(item)"
              >
                {{ item }}
              </div>
            </div>
          </div>
        </div>
        <div class="top--layout">
          <div class="layout--list ml_3" @click="changeLayout">
            <div class="icon--grid" v-if="isGrid">
              <icon-base
                icon-name="grid"
                width="24"
                height="21"
                viewBox="0 0 24 21"
              >
                <icon-grid-layout />
              </icon-base>
            </div>
            <div class="icon--list" v-else>
              <icon-base
                icon-name="list"
                width="24"
                height="18.065"
                viewBox="0 0 24 18.065"
              >
                <icon-list />
              </icon-base>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isGrid"],
  data() {
    return {
      search: "",
      isActivePopup: false,
      isShowStatusFilter: false,
      statusOptions: ["Tất cả", "Hoạt động", "Đã ngừng"],
      statusFilter: "Tất cả"
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    users() {
      return this.$store.getters.allUser;
    },
    usersFilter() {
      return this.$store.getters.usersFilter;
    }
  },
  watch: {
    search(value) {
      if (value.length === 0) {
        this.$store.dispatch("getAllUserAdmin");
      }
    }
  },
  methods: {
    changeLayout() {
      this.$emit("changeLayout", !this.isGrid);
    },
    showStatusFilter() {
      this.isShowStatusFilter = !this.isShowStatusFilter;
    },
    filterByStatus(val) {
      this.statusFilter = val;
      if (this.statusFilter === "Tất cả") {
        this.$store.dispatch("getAllUserAdmin");
      } else if (this.statusFilter === "Hoạt động") {
        this.$store.dispatch("getUserWork");
      } else if (this.statusFilter === "Đã ngừng") {
        this.$store.dispatch("getUserDontWork");
      }
    },
    async searchUsers() {
      await this.$store.dispatch("setFilter", 1);
      this.$store.dispatch("searchUserByKey", this.search);
    },
    openModalActiveCode() {
      this.$modal.show({ name: "modal-active-by-code" });
    }
  }
};
</script>

<style scoped lang="scss">
.top--search {
  .btn--active {
    border: 1px solid #ed1c24;
    border-radius: 0.625rem;
    color: #ed1c24;
    font-size: 0.875rem;
    font-weight: 600;
    height: 40px;
    line-height: 40px;
    padding: 0 0.75rem;
    transition: all 0.4s ease;
    &:hover {
      background-color: #ed1c24;
      color: #fff;
    }
  }
  input {
    border: solid 1px;
    border-radius: 10px;
    font-size: 14px;
    outline: 0;
    padding: 0.5rem 0.1rem 0.5rem 2.5rem;
    transition: all 0.4s ease;
    width: 260px;
  }
  .search--icon {
    left: 15px;
    transform: translateY(-50%);
    transition: all 0.4s ease;
    top: 50%;
  }
}
.select--wrapper {
  border: solid 1px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 14px;
  outline: none;
  padding: 0.375rem 0.75rem;
  width: 120px;
  .ic--filter {
    svg {
      stroke-width: 12;
      margin-top: 3px;
    }
  }
  .options {
    border: 1px solid;
    border-radius: 10px;
    cursor: pointer;
    left: 0;
    list-style-type: none;
    padding: 0;
    top: 34px;
    width: 100%;
    z-index: 10;
  }
  .option {
    padding: 0.25rem 0.75rem;
    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
  }
}
.top--layout {
  height: 20px;
  svg {
    cursor: pointer;
    transition: all 0.4s ease;
  }
}

/* Theme Color */
/* Light */
.top[data-theme="light"] {
  color: #444;
  .top--search {
    input {
      border-color: #e4e4e4;
      color: #444;
      &:focus {
        border-color: #ccc;
        ~ .search--icon {
          color: #ccc;
        }
      }
      &::placeholder {
        color: #ccc;
      }
    }
    .search--icon {
      color: #999;
    }
  }
  .select--wrapper {
    border-color: #e4e4e4;
    color: #999999;
    .ic--filter {
      svg {
        stroke: #999999;
      }
    }
    .options {
      background-color: #ffffff;
      border-color: #f2f2f2;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .option {
      &:hover {
        color: #fff;
        background-color: #ed1c24;
      }
    }
  }

  .top--layout {
    color: #aaa;
    svg {
      color: #ed1c24;
    }
  }
}
/* Dark */
.top[data-theme="dark"] {
  color: #f7f7f7;
  .top--search {
    input {
      background-color: #27292d;
      border-color: #444;
      color: #f7f7f7;
      &:focus {
        border-color: #666;
        ~ .search--icon {
          color: #666;
        }
      }
      &::placeholder {
        color: #666;
      }
    }
    .search--icon {
      color: #999;
    }
  }
  .select--wrapper {
    border-color: #444444;
    color: #ccc;
    .ic--filter {
      svg {
        stroke: #ccc;
      }
    }
    .options {
      background-color: #27292d;
      border-color: #444;
      box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);
    }
    .option {
      &:hover {
        color: #fff;
        background-color: #ed1c24;
      }
    }
  }

  .top--layout {
    color: #aaa;
    svg {
      color: #ed1c24;
    }
  }
}
</style>
