<template>
  <ms-modal
    name="modal-edit-user-info"
    :style-custom="{ width: '448px' }"
    :hiddenClose="true"
  >
    <div class="modal--content" v-click-outside="closeAddEdit">
      <div class="modal--header pl_4 pr_4 pt_3 pb_3">Cấu hình tài khoản</div>
      <div class="modal--body pt_3 pb_0 pl_4 pr_4" v-if="user">
        <!-- Start: User General Info -->
        <div class="user d_flex justify_content_start align_items_center mb_4">
          <div class="user--avatar mr_4">
            <div
              v-if="user.imageAvatar"
              class="avatar--content avatar--img position_relative d_block"
              :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
            ></div>
            <div
              v-else
              class="avatar--content avatar--default position_relative d_block"
            >
              <span class="position_absolute">
                {{ user.name | getFirstLetter }}
              </span>
            </div>
          </div>
          <div class="user--info">
            <div class="user--info-name mb_2">{{ user.name }}</div>
            <div class="user--info-mail">{{ user.email }}</div>
          </div>
        </div>
        <!-- End: User General Info -->
        <!-- Start: User Edit -->
        <div class="edit">
          <!-- Start: Expire Date -->
          <div
            v-if="user.expireDate === undefined || user.expireDate === ''"
          ></div>
          <div
            v-else
            class="edit--time d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Ngày hết hạn"
                class="mr_3"
                width="15.333"
                height="20"
                viewBox="0 0 15.333 20"
              >
                <icon-hourglass /> </icon-base
              >Ngày hết hạn:
            </div>
            <div class>
              <date-picker
                class="date--input"
                placeholder="Chọn ngày gia hạn"
                role="date"
                format="DD/MM/YYYY"
                :default-value="new Date(user.expireDate)"
                v-model="user.expireDate"
                @change="changeDateSetup"
              ></date-picker>
            </div>
          </div>
          <!-- End: Expire Date -->
          <!-- Start: Status -->
          <div
            class="edit--status d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Kích hoạt"
                class="mr_3"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-check-active /> </icon-base
              >Kích hoạt:
            </div>
            <div class="status--radio">
              <input
                id="check-active"
                class="radio"
                type="checkbox"
                :checked="user.status"
                @change="updateStatus"
              />
              <label for="check-active"></label>
            </div>
          </div>
          <!-- End: Status -->
          <!-- Start: Accounts Qty -->
          <div
            class="edit--account d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Số lượng"
                class="mr_3"
                width="20"
                height="20"
                viewBox="0 0 20 20"
              >
                <icon-infinity /> </icon-base
              >Số lượng tài khoản giới hạn:
            </div>
            <div class="account--input">
              <input type="number" v-model="user.maxAccountFb" size="10" />
            </div>
          </div>
          <!-- End: Accounts Qty -->
          <!-- Start: Account Type -->
          <div
            class="edit--type d_flex justify_content_between align_items_center mb_3"
          >
            <div class="edit--desc d_flex align_items_center">
              <icon-base
                icon-name="Loại"
                class="mr_3"
                width="16.667"
                height="20"
                viewBox="0 0 16.667 20"
              >
                <icon-role /> </icon-base
              >Loại tài khoản:
            </div>
            <div class="type--select-level">{{ user._role.level }}</div>
          </div>
          <!-- End: Account Type -->
        </div>
        <!-- End: User Edit -->
      </div>
      <div v-else>Không có dữ liệu nhé mày</div>
      <div
        class="modal--footer d_flex justify_content_end align_items_center pl_4 pr_4 pb_4 pt_2"
      >
        <button class="btn-cancel" @click="closeAddEdit">Hủy</button>
        <button class="btn-done ml_4" @click="updateAccount">Xong</button>
      </div>
    </div>
  </ms-modal>
</template>
<script>
export default {
  computed: {
    roles() {
      return this.$store.getters.roles;
    },
    user() {
      return this.$store.getters.userInfo;
    },
    formatDateCreate: {
      get() {
        const newDate = new Date(this.user.expireDate),
          year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          date = newDate.getDate();

        return `${date}-${month}-${year}`;
      },
      set(val) {
        let valArr = val.split("-");
        const newDate = new Date(valArr[2], valArr[1] - 1, valArr[0]),
          year = newDate.getFullYear(),
          month = newDate.getMonth() + 1,
          date = newDate.getDate();

        this.user.expireDate = `${year}-${month}-${date}`;
      }
    }
  },
  methods: {
    closeAddEdit() {
      this.$modal.hide({ name: "modal-edit-user-info" });
    },
    updateStatus(val) {
      const dataSender = {
        status: val.target.checked,
        userId: this.user._id
      };
      this.$store.dispatch("changeStatusOfUser", dataSender);
      this.user.status = !this.user.status;
    },
    changeDateSetup(value) {
      const dataSender = {
        userId: this.user._id,
        value: new Date(
          new Date(value).getFullYear(),
          new Date(value).getMonth(),
          new Date(value).getDate(),
          new Date(value).getHours(),
          new Date(value).getMinutes(),
          0
        )
      };
      this.$store.dispatch("changeExpireDateOfUser", dataSender);
    },
    updateAccount() {
      const dataSender = {
        userId: this.user._id,
        expireDate: this.user.expireDate,
        maxAccountFb: this.user.maxAccountFb
      };

      this.$store.dispatch("updateUserByAdmin", dataSender);
      this.$emit("closeAddEdit", false);
    }
  },
  async created() {
    await this.$store.dispatch("getRoles");
  },
  filters: {
    getFirstLetter(string) {
      if (string === undefined) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  },
  data() {
    return {
      radio: true
    };
  }
};
</script>
<style lang="scss" scoped>
.modal--content {
  background-color: #ffffff;
  border-radius: 8px;
  width: 600px;
}
.modal--header {
  border-bottom: 1px solid #f1f1f1;
  color: #666;
  font-size: 16px;
  font-weight: 600;
}
.modal--footer {
  button {
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
    outline: none;
    padding: 0.375rem 0.75rem;
    transition: all 0.4s ease;
    &.btn-cancel {
      color: #aaaaaa;
      &:hover {
        border-color: #aaaaaa;
      }
    }
    &.btn-done {
      color: #ed1c24;
      &:hover {
        border-color: #ed1c24;
      }
    }
  }
}
.user {
  .user--info {
    .user--info-name {
      color: #3d3d3d;
      font-size: 16px;
      font-weight: bold;
    }
    .user--info-mail {
      color: #7e7e7e;
      font-size: 14px;
    }
  }
  .avatar--content {
    border: 1px solid #f7f7f7;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
    width: 64px;

    &:before {
      content: "";
      display: block;
      padding-top: 100%;
    }
    &.avatar--img {
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &.avatar--default {
      background-color: #f7f7f7;
      color: #ed1c24;
      font-size: 32px;
      font-weight: 600;
      span {
        left: 50%;
        transform: translate(-50%, -50%);
        top: 50%;
      }
    }
  }
}

.edit {
  color: #747474;
  font-weight: 600;
}

.edit--status {
  .edit--desc {
    svg {
      color: #ed1c24;
    }
  }
  .status--radio {
    $transition-duration: 0.4s;
    position: relative;
    .radio {
      cursor: pointer;
      height: 20px;
      opacity: 0;
      position: absolute;
      width: 40px;
      z-index: 1;

      + label {
        border: solid 1px;
        border-radius: 20px;
        cursor: pointer;
        display: inline-flex;
        height: 20px;
        position: relative;
        transition: all $transition-duration;
        width: 40px;

        &::after {
          border: solid 1px;
          border-radius: 50%;
          content: "";
          display: block;
          font-weight: 400;
          height: 10px;
          left: 6px;
          position: absolute;
          transition: all $transition-duration;
          top: 4px;
          width: 10px;
          z-index: 11;
        }
      }
      &:checked {
        + label {
          background-color: #ed1c24;
          border-color: #ed1c24 !important;
          &::after {
            background-color: #ffffff;
            border-color: #fff !important;
            content: "";
            left: calc(100% - 16px);
            transform: rotate(360deg);
          }
        }
      }
    }
  }
}

.edit--account {
  input[type="number"] {
    border: solid 1px #e4e4e4;
    border-radius: 10px;
    color: #444444;
    font-size: 14px;
    height: 40px;
    outline: none;
    text-align: center;
    width: 70px;
    -moz-appearance: textfield; /* Firefox */
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
  }
}

.edit--type {
  .select--wrapper {
    select {
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #ffffff;
      border: solid 1px #e4e4e4;
      border-radius: 10px;
      color: #444;
      cursor: pointer;
      font-size: 14px;
      height: 40px;
      line-height: 1.57;
      outline: none;
      padding: 0 16px;
      padding-right: 38px;

      &::-ms-expand {
        display: none;
      }
    }

    &:after {
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 6px solid #999;
      content: "";
      height: 0;
      pointer-events: none;
      position: absolute;
      right: 16px;
      transform: translateY(-50%);
      top: 50%;
      width: 0;
    }
  }
}

.edit--time {
  .time--tick-icon {
    color: #747474;
    pointer-events: none;
    right: 10px;
    top: 11px;
    svg {
      color: #999;
    }
  }
}

.edit--time {
  .time--tick {
    border-radius: 10px;
    border: solid 1px #e4e4e4;
    color: #444;
    cursor: pointer;
    font-size: 0.875rem;
    height: 42px;
    padding: 0;
  }
  .picker-wrap {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    box-shadow: none !important;
    height: auto !important;
    margin-top: 1px !important;
    right: 0;
    width: 283px !important;
  }
  .date-head {
    background-color: #56e8bd !important;
    height: 40px;
    position: relative;
    .btn-prev-year,
    .btn-next-year {
      display: none;
      pointer-events: none;
    }
    .btn-next-date,
    .btn-prev-date {
      background-color: #fff !important;
      border-radius: 50%;
      color: #56e8bd;
      height: 20px;
      line-height: 20px;
      padding: 0;
      text-align: center;
      top: 8px;
      width: 20px;

      &:hover {
        background-color: #fff !important;
      }
    }
    .btn-prev-date {
      left: 10px;
      position: absolute;
    }
    .btn-next-date {
      position: absolute;
      right: 10px;
    }
    .show-year {
      margin-right: 55px;
      position: relative;
      &:before {
        content: "/";
        left: -7px;
        position: absolute;
      }
    }
    .show-month {
      margin-left: 70px;
      margin-right: -10px;
    }
    th:first-child {
      border-top-left-radius: 10px;
    }
    th:nth-child(2) {
      border-top-right-radius: 10px;
    }
  }
  .date-days {
    font-size: 12px !important;
    height: 40px;
    th {
      border: solid 1px rgba(0, 0, 0, 0.03) !important;
      font-weight: normal !important;
    }
  }
  td {
    border: solid 1px rgba(0, 0, 0, 0.03) !important;
    height: 36px !important;
    transition: all 0.5s ease;
    &:hover {
      color: #56e8bd !important;
    }
  }
  .date-active {
    background-color: #56e8bd !important;
    color: #fff !important;
    &:hover {
      color: #fff !important;
    }
  }
}
</style>
