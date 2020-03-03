<template>
  <ms-modal
    name="modal-delete-user"
    :style-custom="{ width: '448px' }"
    :hiddenClose="true"
  >
    <div class="modal--content">
      <div class="modal--header">
        <div class="title--small mt_2">Xóa các tài khoản đã chọn</div>
        <div class="desc mt_3">
          Hành động này sẽ không thể hoàn tác. Bạn có chắc chắn muốn xóa không?
        </div>
      </div>
      <div
        class="modal--footer d_flex justify_content_between align_items_center"
      >
        <button class="btn-skip" @click="closeDialog">HỦY</button>
        <button class="btn-submit" @click="deleteSelected">
          XÓA
        </button>
      </div>
    </div>
  </ms-modal>
</template>
<script>
export default {
  props: ["selectedUIDs"],

  data() {
    return {};
  },

  computed: {},

  methods: {
    closeDialog() {
      this.$modal.hide({ name: "modal-delete-user" });
    },
    deleteSelected() {
      const dataSender = {
        userId: this.selectedUIDs
      };

      this.$store.dispatch("deleteUsers", dataSender);
      this.closeDialog();
    }
  }
};
</script>
<style lang="scss" scoped>
.modal--content {
  color: #444444;
  width: 440px;
  border-radius: 10px;
  padding: 1.25rem;

  .modal--header {
    .title {
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    }
    .title--small {
      font-size: 1rem;
      font-weight: 600;
      text-align: left;
    }
    .desc {
      color: #999999;
    }
  }

  .modal--body {
    margin-top: 0.5rem;
    &-input {
      width: 100%;
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
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
  }

  .modal--footer {
    margin-top: 1.5rem;
    font-size: 14px;

    .btn-submit {
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      background-color: #ed1c24;
      border: 1px solid #ed1c24;
      font-weight: 600;
      color: #fff;
      transition: all 0.4s ease;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: #c31920;
      }
    }

    .btn-skip {
      padding: 0.5rem 0.75rem;
      border-radius: 10px;
      background-color: transparent;
      border: 0;
      color: #999;
      font-weight: 600;
      cursor: pointer;
      outline: none;

      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}
.modal--content {
  background-color: #fff;
  .modal--body {
    &-input {
      color: #444;
      border: 1px solid #e4e4e4;
      &::placeholder {
        color: #cccccc;
      }
    }
  }
  .modal--footer {
    .btn-skip {
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
}
</style>
