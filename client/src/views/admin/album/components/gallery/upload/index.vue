<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3">
        <div
          class="header d_flex align_items_center justify_content_center mb_3"
        >
          <span>
            Thông tin ảnh
          </span>
        </div>
        <!-- START: SHOW LIST IMAGES AND OPTION SELECT PACKAGE -->
        <div class="body">
          <div class="list d_flex align_items_center">
            <!-- START: SHOW LIST IMAGES UPLOAD -->
            <div class="images d_flex align_items_center">
              <div
                v-if="photo.url.length === 0"
                class="item d_flex align_items_center justify_content_center"
              >
                <label for="upload">
                  Chọn ảnh
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
              <div
                v-else
                class="item bg"
                :style="{ backgroundImage: 'url(' + photo.url + ')' }"
              ></div>
            </div>
            <!-- END: SHOW LIST IMAGES UPLOAD -->

            <!-- START: SHOW OPTION SELECT PACKAGE -->
            <div class="option ml_2">
              <div class="d_flex align_items_center mb_2">
                <label class="title">Tên ảnh:</label>
                <div class="select">
                  <input
                    v-model="photo.name"
                    type="text"
                    placeholder="Nhập tên ảnh"
                    class="form_control"
                  />
                </div>
              </div>
              <div class="d_flex align_items_center mb_2">
                <label class="title">Thuộc tính ảnh :</label>
                <div class="select">
                  <taggle
                    v-model="photo.attribute"
                    class="taggle"
                    placeholder="Nhập thuộc tính và ấn enter để hoàn thành"
                    @input="updateAttribute"
                  />
                </div>
              </div>
              <div class="d_flex align_items_center mb_2">
                <label class="title">Chọn gói sử dụng :</label>
                <div class="select multi">
                  <multiselect
                    label="name"
                    multiple
                    placeholder="Chọn gói được sử dụng"
                    :options="membership"
                    v-model="photo.isAvailable"
                    @input="selectMemberShip"
                  />
                </div>
              </div>

              <div class="d_flex align_items_center mb_2">
                <label class="title">Đường dẫn ảnh:</label>
                <div class="select">
                  <input
                    v-model="photo.url"
                    type="text"
                    placeholder="Nhập tên ảnh"
                    class="form_control"
                  />
                </div>
              </div>
            </div>
            <!-- END: SHOW OPTION SELECT PACKAGE -->
          </div>
        </div>
        <!-- END: SHOW LIST IMAGES AND OPTION SELECT PACKAGE -->

        <!-- START: FOOTER -->
        <div class="footer d_flex align_items_center justify_content_between">
          <div class="empty"></div>
          <div class="action">
            <button class="btn btn_danger mr_3" @click="close">Hủy</button>
            <button
              class="btn btn_success"
              v-if="photo._id"
              @click="updatePhoto"
            >
              Cập nhật
            </button>
            <button class="btn btn_success" v-else @click="createPhoto">
              Tải ảnh
            </button>
          </div>
        </div>
        <!-- END: FOOTER -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["isShowButtonDefault", "currentTheme"],
  data() {
    return {};
  },
  computed: {
    photo() {
      return this.$store.getters.photoLibrary;
    },
    photoUpload() {
      return this.$store.getters.photoUpload;
    },
    membership() {
      return this.$store.getters.membershipPackages;
    }
  },
  created() {
    this.$store.dispatch("getMemberShipPackage");
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
      this.$store.dispatch("setCasePhoto", 0);
    },
    createPhoto() {
      this.photo._category = this.$route.params.id;
      this.$store.dispatch("createUploadPhotoLibrary", this.photo);
      this.close();
    },
    updateAttribute(val) {
      this.photo.attribute = val;
    },
    updatePhoto() {
      this.$store.dispatch("updatePhotoAlbum", this.photo);
      this.close();
    },
    selectMemberShip(val) {
      this.photo.isAvailable = val;
    },
    selectFile() {
      this.file = this.$refs.file.files;

      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    async sendFile() {
      const formData = new FormData();

      Array.from(this.file).forEach(f => {
        formData.append("attachments", f);
      });

      await this.$store.dispatch("uploadPhotoLibrary", formData);

      this.photo.url = this.photoUpload[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
