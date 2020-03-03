<template>
  <ms-modal
    name="modal-active-by-code"
    :style-custom="{ width: '448px' }"
    :hiddenClose="true"
  >
    <div class="modal--content px_3 py_4">
      <div class="modal--header">
        <div class="title text_left">Kích hoạt tài khoản</div>
      </div>
      <div class="modal--body my_3">
        <div
          class="alert alert_danger"
          v-if="this.$store.getters.activeAccount !== ''"
        >
          {{ activeAccountError }}
        </div>
        <div class="desc">
          Kích hoạt tài khoản nâng cao bằng mã kích hoạt. Vui lòng nhập đúng mã
          kích hoạt và thời gian gia hạn cho các tài khoản cần kích hoạt
        </div>
        <div class="content mt_3">
          <div class="form_group">
            <label>
              <b>Áp dụng với mã kích hoạt:</b>
            </label>
            <input
              class="modal--body-input"
              placeholder="Nhập mã kích hoạt"
              type="text"
              v-model="user.presenter"
            />
          </div>
          <div class="form_group">
            <label>
              <b>Ngày gia hạn:</b>
            </label>
            <div>
              <date-picker
                class="date--input"
                placeholder="Chọn ngày gia hạn"
                role="date"
                format="DD/MM/YYYY"
                v-model="user.expireDate"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="modal--footer d_flex justify_content_between align_items_center"
      >
        <button class="btn--skip" @click="closePopup()">HỦY</button>
        <button class="btn--submit" @click="activeAccount()">KÍCH HOẠT</button>
      </div>
    </div>
  </ms-modal>
</template>
<script>
export default {
  data() {
    return {
      user: {
        presenter: "",
        expireDate: new Date()
      }
    };
  },
  computed: {
    activeAccountError() {
      return this.$store.getters.activeAccountError;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    async activeAccount() {
      await this.$store.dispatch("activeAccount", this.user);

      if (this.$store.getters.activeAccount === "") {
        this.closePopup();
      }
    },
    closePopup() {
      this.$modal.hide({ name: "modal-active-by-code" });
    }
  }
};
</script>
<style lang="scss" scoped>
.modal--content {
  background-color: #fff;
  border-radius: 0.625rem;
  padding: 1.25rem;
  width: 440px;

  .modal--header {
    .title {
      font-size: 1.25rem;
      font-weight: 600;
      text-align: center;
    }
    .desc {
      color: #999999;
    }
  }

  .modal--body {
    font-size: 0.875rem;
    margin-top: 0.5rem;
    &-input {
      border-radius: 0.625rem;
      font-size: 0.875rem;
      padding: 0.5rem 0.75rem;
      width: 100%;
      &:active,
      &:focus {
        border-color: #c31920;
        border-radius: 10px;
        outline: 0 !important;
      }
      &::placeholder {
        text-transform: none;
        color: #cccccc;
      }
    }
    .content {
      .date--input {
        border-radius: 0.625rem;
        cursor: pointer;
      }
    }
  }

  .modal--footer {
    font-size: 0.875rem;
    margin-top: 1.5rem;

    .btn--submit {
      background-color: #ed1c24;
      border: 1px solid #ed1c24;
      border-radius: 0.625rem;
      color: #fff;
      cursor: pointer;
      font-weight: 600;
      outline: none;
      padding: 0.5rem 0.75rem;
      transition: all 0.4s ease;

      &:hover {
        background-color: #c31920;
      }
    }

    .btn--skip {
      background-color: transparent;
      border-radius: 10px;
      border: 0;
      cursor: pointer;
      color: #999;
      font-weight: 600;
      outline: none;
      padding: 0.5rem 0.75rem;

      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}
// Light
.modal--wrapper[data-theme="light"] {
  color: #444444;
  .modal--content {
    background-color: #fff;
    .modal--body {
      &-input {
        border: 1px solid #e4e4e4;
        color: #444;
        &::placeholder {
          color: #cccccc;
        }
      }
    }
    .modal--footer {
      .btn--skip {
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
  }
}

//Dark
.modal--wrapper[data-theme="dark"] {
  color: #f7f7f7;
  .modal--content {
    background-color: #27292d;
    .modal--body {
      &-input {
        background-color: #27292d;
        border: 1px solid #444;
        color: #f7f7f7;
        &::placeholder {
          color: #666;
        }
        &:active,
        &:focus {
          border-color: #ed1c24;
        }
      }
    }
    .modal--footer {
      .btn--skip {
        &:hover {
          background-color: #2f3136;
        }
      }
    }
  }
}
</style>
