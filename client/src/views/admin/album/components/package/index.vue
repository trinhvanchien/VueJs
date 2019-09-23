<template>
  <div class="simple">
    <!-- START: OPEN UPLOAD IMAGE TO ALBUM -->
    <div class="header mb_3">
      <!--<label class="open&#45;&#45;album" @click="openUploadImages">Tải ảnh lên</label>-->
      <label for="upload">
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
    <!-- END: OPEN UPLOAD IMAGE TO ALBUM -->

    <!-- START: SHOW ALBUM PACKAGE-->
    <div class="body">
      <div class="r">
        <div class="c_3" v-if="!packages">
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
          >
            <loading-component />
          </div>
        </div>
        <div
          class="c_lg_6 c_xl_3 c_md_6 mb_3 position_relative"
          v-else
          v-for="(item, index) in packages"
          :key="`c-${index}`"
        >
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
            @click="showInfoPackage(item._id)"
          >
            <div class="icon mb_2">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="50"
                height="50"
                viewBox="0 0 481 481"
              >
                <icon-folder />
              </icon-base>
            </div>
            <div class="desc">{{ item.name }}</div>
          </div>

          <div class="above d_flex align_items_center position_absolute">
            <span @click="editMemberShipPackage(item._id)">
              <icon-base
                class="icon--remove"
                icon-name="plus"
                width="24"
                height="24"
                viewBox="0 0 25 25"
              >
                <icon-edit />
              </icon-base>
            </span>
            <span @click="deleteMemberShipPackage(item._id)">
              <icon-base
                class="icon--remove"
                icon-name="plus"
                width="24"
                height="24"
                viewBox="0 0 18 18"
              >
                <icon-remove />
              </icon-base>
            </span>
          </div>

          <!--*********** POPUP *************-->
          <transition name="popup">
            <delete-folder-popup
              v-if="isShowDeletePopup === true"
              :data-theme="currentTheme"
              :item="item._id"
              @close="isShowDeletePopup = $event"
            ></delete-folder-popup>
          </transition>
        </div>

        <div class="c_lg_6 c_xl_3 c_md_6 mb_3">
          <div
            class="card d_flex flex_column align_items_center px_3 py_5"
            @click="openPopupCreatePackage"
          >
            <div class="icon mb_2">
              <icon-base
                class="icon--add"
                icon-name="plus"
                width="50"
                height="50"
                viewBox="0 0 66 66"
              >
                <icon-plus />
              </icon-base>
            </div>
            <div class="desc">Tạo thư mục mới</div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: SHOW ALBUM PACKAGE-->

    <!-- START: POPUP CREATE NEW PACKAGE-->
    <transition name="popup">
      <album-package
        :isShowButtonDefault="isShowButtonDefault"
        v-if="isShowPopup === true"
        @closePopup="isShowPopup = $event"
        @changeButton="isShowButtonDefault = $event"
      />
    </transition>
    <!-- END: POPUP CREATE NEW PACKAGE-->
  </div>
</template>
<script>
import AlbumPackage from "./components/action/index";
export default {
  components: {
    AlbumPackage
  },
  data() {
    return {
      isShowButtonDefault: true,
      isShowDeletePopup: false,
      isShowPopup: false,
      file: ""
    };
  },
  computed: {
    packages() {
      return this.$store.getters.membershipPackages;
    },
    caseAlbum() {
      return this.$store.getters.caseAlbum;
    }
  },
  created() {
    this.$store.dispatch("getMemberShipPackage");
  },
  methods: {
    async editMemberShipPackage(val) {
      await this.$store.dispatch("getInfoMemberShipPackage", val);
      this.isShowPopup = true;
      this.isShowButtonDefault = false;
    },
    deleteMemberShipPackage(val) {
      this.$store.dispatch("deleteMemberShipPackage", val);
    },
    async openPopupCreatePackage() {
      await this.$store.dispatch("setMemberShipPackage");
      this.isShowPopup = true;
      this.isShowButtonDefault = true;
    },
    async openUploadImages() {
      await this.$store.dispatch("setCaseAlbum", 1);
    },
    showInfoPackage(val) {
      this.$router.push({ name: "package_member", params: { id: val } });
    },
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
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
