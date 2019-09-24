<template>
  <div class="simple">
    <!-- START: SHOW ALBUM PACKAGE-->
    <div class="body">
      <div class="r">
        <div class="c_3" v-if="!albumCategories">
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
          >
            <loading-component />
          </div>
        </div>
        <div
          class="c_lg_6 c_xl_3 c_md_6 mb_3 position_relative"
          v-else
          v-for="(item, index) in albumCategories"
          :key="`c-${index}`"
        >
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
            @click="showInfoAlbumCategory(item._id)"
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
            <span @click="editAlbumCategory(item._id)">
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
            <span @click="deleteAlbumCategory(item._id)">
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
        </div>

        <div class="c_lg_6 c_xl_3 c_md_6 mb_3">
          <div
            class="card d_flex flex_column align_items_center px_3 py_5"
            @click="openPopupCreateAlbum"
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
import AlbumPackage from "./components/index";
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
    albumCategories() {
      return this.$store.getters.albums;
    }
  },
  created() {
    this.$store.dispatch("getAlbumCategory");
  },
  methods: {
    async editAlbumCategory(val) {
      await this.$store.dispatch("getInfoAlbum", val);
      this.isShowPopup = true;
      this.isShowButtonDefault = false;
    },
    deleteAlbumCategory(val) {
      this.$store.dispatch("deleteAlbumCategory", val);
    },
    async openPopupCreateAlbum() {
      await this.$store.dispatch("resetAlbumCategory", {
        key: "name",
        value: ""
      });
      this.isShowPopup = true;
      this.isShowButtonDefault = true;
    },
    showInfoAlbumCategory(val) {
      this.$router.push({ name: "album_package", params: { id: val } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
