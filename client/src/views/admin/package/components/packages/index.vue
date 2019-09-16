<template>
  <div>
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
            @click="showInfoPackage(1)"
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
            <div class="desc">{{ item.title }}</div>
          </div>

          <div
            class="above d_flex align_items_center position_absolute"
            @click="deleteFolder(item._id)"
          >
            <icon-base
              class="icon--remove"
              icon-name="plus"
              width="24"
              height="24"
              viewBox="0 0 20 20"
            >
              <icon-remove />
            </icon-base>
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
            @click="isShowPopup = true"
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

    <!-- START: POPUP CREATE NEW PACKAGE-->
    <transition name="popup">
      <popup-package
        v-if="isShowPopup === true"
        @closePopup="isShowPopup = $event"
      />
    </transition>
    <!-- END: POPUP CREATE NEW PACKAGE-->
  </div>
</template>
<script>
import PopupPackage from "./components";
export default {
  components: {
    PopupPackage
  },
  data() {
    return {
      isShowPopup: false
    };
  },
  computed: {
    packages() {
      return this.$store.getters.packages;
    }
  },
  methods: {
    showInfoPackage(val) {
      this.$router.push({ name: "package_member", params: { id: val } });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
