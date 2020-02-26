<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div
        class="modal--content d_flex justify_content_center align_items_center"
      >
        <div class="modal--body">
          <div class="content d_flex align_items_center">
            <!-- START: LOADING WHEN SYSTEM CHANGE PASSWORD -->
            <div class="loading--block mt_4 mb_4" v-show="status === 'loading'">
              <div class="mx_auto">
                <div class="loading--bar position_relative mx_auto">
                  <div class="percent position_absolute"></div>
                </div>
              </div>
              <div class="desc text_center mt_2">
                Vui lòng chờ, đang thay đổi mật khẩu của bạn ...
              </div>
            </div>
            <!-- END: LOADING WHEN SYSTEM CHANGE PASSWORD -->
            <!-- START: SUCCESS WHEN SYSTEM CHANGED PASSWORD -->
            <div class="success text_center" v-show="status === 'success'">
              <icon-base
                class="icon--user mr_1"
                width="100"
                height="100"
                viewBox="0 0 52 52"
                icon-name="Thành công"
              >
                <icon-success />
              </icon-base>
              <div class="py_3 title">Mật khẩu của bạn đã được thay đổi</div>

              <button class="btn--skip mt_3" @click="gotoSignIn">
                ĐI TỚI TRANG ĐĂNG NHẬP
              </button>
            </div>
            <!-- END: SUCCESS WHEN SYSTEM CHANGED PASSWORD -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    status() {
      return this.$store.getters.authStatus;
    }
  },
  methods: {
    gotoSignIn() {
      this.$emit("closePopup", false);
      this.$router.push({ name: "cus_login" });
    }
  }
};
</script>
<style lang="scss" scoped>
.modal--wrapper {
  background-color: #2f3136;
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;

  .modal--dialog {
    height: 100%;
    width: 100%;

    .modal--content {
      background-color: #272a2c;
      border-color: #444;
      border-radius: .5rem;
      color: #333;
      padding: 1.25rem 0;
      width: 30vw;
      max-height: 95vh;
      overflow: hidden;

      .modal--body {
        .content {
          .loading--block {
            .desc {
              color: #ccc;
              font-size: .875rem;
            }
            .loading--bar {
              background-color: transparent;
              border: 1px solid #444;
              border-radius: 8px;
              height: 16px;
              overflow: hidden;
              width: 320px;
              .percent {
                background-color: rgb(88, 206, 65);
                background-size: 16px 16px;
                height: 100%;
                width: 40%;
                animation: animate 1.2s linear infinite;
              }
              @keyframes animate {
                0% {
                  transform: translateX(-100%);
                }
                100% {
                  transform: translateX(200%);
                }
              }
            }
          }
          .link--here {
            color: #eee;
          }
          .success {
            svg {
              color: #00c853;
            }
            .title {
              font-size: 1.2rem;
              color: #fff;
            }
            .done {
              background: #ed1c24;
              display: inline-block;
              padding: 0.4rem 1.3rem;
              border-radius: .5rem;
              font-size: 1.1rem;
              transition: all .5s ease;
              cursor: pointer;
              color: #fff;
              &:hover {
                background: #e99d24;
              }
            }
            .btn--skip {
              background-color: #c31920;
              border-radius: 10px;
              border: 0;
              cursor: pointer;
              color: #fff;
              font-size: .875rem;
              font-weight: 600;
              outline: none;
              padding: 0.5rem 0.75rem;
              transition: all 0.5s ease;
              &:hover {
                background-color: #c31920;
                color: #fff;
              }
            }
          }
        }
      }

      .modal--footer {
        font-size: .875rem;

        .btn--skip {
          background-color: transparent;
          border-radius: 10px;
          border: 0;
          cursor: pointer;
          color: #333;
          font-weight: 600;
          outline: none;
          padding: 0.5rem 0.75rem;
          transition: all 0.5s ease;

          &:hover {
            background-color: #c31920;
            color: #fff;
          }
        }
      }
    }
  }
}

/*Transition popup*/
.popup-enter-active, .popup-leave-active {
  transition: opacity 1s;
}
.popup-enter, .popup-leave-to {
  opacity: 0;
}

/* ChangeColor */

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
        color: #333;
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


// RESPONSIVE
@media screen and (max-width: 980px) and (min-width: 768px) {
  .modal--wrapper {
    .modal--dialog {
      .modal--content {
        width: 60vw;
      }
    }
  }
}

</style>
