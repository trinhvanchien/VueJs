<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <vue-perfect-scrollbar class="modal--content">
        <div
          class="modal--header d_flex flex_column align_items_center justify_content_center"
        >
          <div class="title">Hướng dẫn sử dụng phần mềm Hoot</div>
          <div class="divine mt_2 mb_1"></div>
        </div>
        <div class="modal--body mt_3">
          <div class="content d_flex align_items_center">
            <slides />
          </div>
        </div>
        <div
          class="modal--footer d_flex justify_content_end align_items_center px_3"
        >
          <button class="btn--skip" @click="close()">TÔI ĐÃ HIỂU</button>
        </div>
      </vue-perfect-scrollbar>
    </div>
  </div>
</template>

<script>
import Slides from "./SlideVideoGuide";
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
.modal--wrapper {
  background-color: rgba(153, 153, 153, 0.4);
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
      background-color: #eeeeee;
      border-radius: 0.5rem;
      color: #333;
      padding: 1.25rem 0;
      width: 60vw;
      max-height: 95vh;
      overflow: hidden;

      .modal--header {
        .title {
          font-size: 1.25rem;
          text-transform: uppercase;
          font-weight: 600;
          text-align: center;
        }
        .desc {
          color: #333;
        }
        .divine {
          width: 50px;
          border: 1px solid #e4e4e4;
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
