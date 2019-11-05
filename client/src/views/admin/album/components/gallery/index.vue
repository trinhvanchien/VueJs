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
      <div
        v-if="photos && photos.length === 0"
        class="text_center px_3 py_3 alert_danger"
      >
        Album chưa có ảnh nào, vui lòng thêm ảnh.
      </div>
      <div
        class="item bg position_relative mr_2 mb_2"
        v-else
        v-for="(item, index) in photos"
        :key="index"
        :style="{
          backgroundImage: 'url(' + baseUrl + '/' + item.previewUrl + ')'
        }"
      >
        <div
          class="action position_absolute d_flex align_items_center justify_content_center"
        >
          <div class="mr_2" @click="editPhotoLibrary(item._id)">
            <icon-base
              class="icon--add"
              icon-name="plus"
              width="30"
              height="30"
              viewBox="0 0 20 20"
            >
              <icon-edit />
            </icon-base>
          </div>
          <div @click="deletePhotoLibrary(item._id)">
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
      </div>
      <div class="clear"></div>
    </div>

    <!-- START: POPUP CREATE NEW PACKAGE-->
    <transition name="popup">
      <upload-image
        v-if="isUploadPopup === true"
        @closePopup="isUploadPopup = $event"
      />
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
      baseUrl: `${process.env.VUE_APP_API_URL}`,
      isUploadPopup: false
    };
  },
  computed: {
    casePhoto() {
      return this.$store.getters.casePhoto;
    },
    photos() {
      return this.$store.getters.photoAlbum;
    }
  },
  created() {
    const albumId = this.$route.params.id;
    // if check have data then dont dispatch event.

    this.$store.dispatch("getInfoAlbum", albumId);
    this.$store.dispatch("getPhotoAlbumCategory", albumId);
    this.$store.dispatch("getMemberShipPackage");
  },
  methods: {
    async editPhotoLibrary(val) {
      await this.$store.dispatch("getInfoPhoto", val);
      this.isUploadPopup = true;
    },
    deletePhotoLibrary(val) {
      this.$store.dispatch("deletePhotoAlbum", val);
    },
    openUploadImages() {
      this.isUploadPopup = true;
      this.$store.dispatch("resetPhotoUpload");
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
