<template>
  <div class="gallery">
    <div class="top d_flex align_items_center mb_3">
      <div class="left mr_3" @click="redirectAlbum">
        « Quay lại
      </div>
      <div class="right">
        <label for="upload">
          <icon-base
            class="icon--image mr_2"
            icon-name="image"
            width="18"
            height="18"
            viewBox="0 0 21 21"
          >
            <icon-image />
          </icon-base>
          <span>Tải ảnh lên thư mục</span>
        </label>
        <form enctype="multipart/form-data" @submit.prevent="sendFile">
          <input
            id="upload"
            hidden
            type="file"
            ref="file"
            @change="selectFile"
            accept="image/x-png,image/gif,image/jpeg"
            multiple
          />
        </form>
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
      <upload-image v-if="isShowUpload === true" />
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
      isShowUpload: false
    };
  },
  methods: {
    selectFile() {
      // this.file = this.$refs.file.files;
      //
      // this.sendFile();
      //
      // // reset ref
      // const input = this.$refs.file;
      // input.type = "text";
      // input.type = "file";
    },
    async sendFile() {
      // let uploadFiles;
      // const formData = new FormData();
      //
      // Array.from(this.file).forEach(f => {
      //   formData.append("attachments", f);
      // });
      //
      // await this.$store.dispatch("uploadPostAttachments", formData);
      // if (this.statusImage === "success") {
      //   uploadFiles = this.postAttachmentsUpload.map(item => {
      //     return {
      //       link: item,
      //       typeAttachment: 1
      //     };
      //   });
      //   this.post.attachments = this.post.attachments.concat(uploadFiles);
      // }
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
