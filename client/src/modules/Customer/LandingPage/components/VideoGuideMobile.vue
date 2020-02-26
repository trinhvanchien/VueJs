<template>
  <div class="modal--wrapper--mobile">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <!-- Start: Header -->
        <div class="modal--header d_flex align_items_center">
          <div @click="close">
            <icon-base
              icon-name="arrow-down"
              class="arrow-down"
              width="20"
              height="20"
              viewBox="0 0 130 130"
            >
              <icon-arrow-down />
            </icon-base>
          </div>
          <p class="name--modal mb_0">Hướng dẫn sử dụng</p>
        </div>
        <!-- End: Header -->
        <div class="modal--body mt_3">
          <div class="content d_flex align_items_center">
            <slides />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slides from "./SlidesVideoResponsive";
export default {
  components: {
    Slides
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--wrapper--mobile {
  background-color: #fff;
  bottom: 0;
  font-family: "Open Sans", sans-serif;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 999;
  height: 100vh;
  width: 100vw;

  .modal--dialog {
    .modal--content {
      // max-height: 80vh;
      width: 100vw;
      color: #333;

      .modal--header {
        padding: 0.625rem 0;
        border-bottom: 1px solid #444;
        .arrow-down {
          transform: rotate(90deg);
          margin-left: 0.5rem;
        }
        .name--modal {
          margin: auto;
        }
      }

      .modal--body {
        .intro {
        }
        .content {
          .item {
            img {
              width: 100%;
              height: 250px;
            }
          }
          .move {
            width: 40px;
            height: 40px;
          }
        }
      }

      .modal--footer {
        font-size: 0.875rem;

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
  }
}

/*Transition popup*/
.popup-enter-active,
.popup-leave-active {
  transition: opacity 1s;
}
.popup-enter,
.popup-leave-to {
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
