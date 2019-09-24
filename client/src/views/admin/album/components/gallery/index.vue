<template>
  <div class="gallery">
    <div class="top d_flex align_items_center mb_3">
      <div class="left mr_3" @click="redirectAlbum">
        « Quay lại
      </div>
      <div class="right">
        <label @click="openUploadImages">Tải ảnh lên thư mục</label>
      </div>
    </div>
    <div class="grid">
      <div class="item bg position_relative mr_2 mb_2">
        <div
          class="action position_absolute d_flex align_items_center justify_content_center"
        >
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="30"
            height="30"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="item bg position_relative mr_2 mb_2">
        <div
          class="action position_absolute d_flex align_items_center justify_content_center"
        >
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="30"
            height="30"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="item bg position_relative mr_2 mb_2">
        <div
          class="action position_absolute d_flex align_items_center justify_content_center"
        >
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="30"
            height="30"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>
      <div class="item bg position_relative mr_2 mb_2">
        <div
          class="action position_absolute d_flex align_items_center justify_content_center"
        >
          <icon-base
            class="icon--add"
            icon-name="plus"
            width="30"
            height="30"
            viewBox="0 0 15 15"
          >
            <icon-remove />
          </icon-base>
        </div>
      </div>

      <div class="clear"></div>
    </div>

    <!-- START: POPUP CREATE NEW PACKAGE-->
    <transition name="popup">
      <upload-image v-if="casePhoto === 1" />
    </transition>
    <!-- END: POPUP CREATE NEW PACKAGE-->
  </div>
</template>

<script>
import UploadImage from "./upload";

export default {
  components: {
    UploadImage
  },
  data() {
    return {
      file: ""
    };
  },
  computed: {
    casePhoto() {
      return this.$store.getters.casePhoto;
    }
  },
  methods: {
    openUploadImages() {
      this.$store.dispatch("setCasePhoto", 1);
    },
    redirectAlbum() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.gallery {
  .top {
    .left {
      cursor: pointer;
      &:hover,
      &:focus,
      &:visited,
      &:active {
        color: #ffb94a;
      }
    }
    .right {
      label {
        background-color: #ffb94a;
        border-radius: 0.5rem;
        cursor: pointer;
        color: #fff;
        font-weight: 600;
        margin-bottom: 0;
        padding: 0.5rem 1.5rem;
      }
    }
  }
  .grid {
    .item {
      background-color: #ffb94a;
      border: 1px solid #e4e4e4;
      border-radius: 0.25rem;
      float: left;
      height: 200px;
      width: 200px;
      &:hover {
        > .action {
          opacity: 1;
        }
      }
      .action {
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 9;
        background-color: rgba(153, 153, 153, 0.4);
        cursor: pointer;
        opacity: 0;
        svg {
          fill: #fff;
          color: #fff;
        }
      }
    }
    .bg {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
    .clear {
      clear: both;
    }
  }
}
</style>
