<template>
  <div class="simple position_relative" :data-theme="currentTheme">
    <bread-crumb :breadTitle="breadTitle" :breadDesc="breadDesc" />
    <div class="body">
      <div class="r">
        <div class="c_3" v-if="!campaigns">
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
          >
            <loading-component />
          </div>
        </div>
        <div
          class="c_lg_6 c_xl_3 c_md_6 mb_3 position_relative"
          v-else
          v-for="(item, index) in campaigns"
          :key="`c-${index}`"
        >
          <div
            class="card d_flex flex_column align_items_center position_relative px_3 py_5"
            @click="showInfoFolder(item._id)"
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

          <div class="above d_flex align_items_center position_absolute">
            <span class="mr_2" @click="editInfoCampaignExample(item._id)">
              <icon-base
                class="icon--edit"
                icon-name="plus"
                width="24"
                height="24"
                viewBox="0 0 25 25"
              >
                <icon-edit />
              </icon-base>
            </span>
            <span @click="deleteFolder(item._id)">
              <icon-base
                class="icon--remove"
                icon-name="plus"
                width="24"
                height="24"
                viewBox="0 0 20 20"
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
            @click="isShowCreateGroup = true"
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
    <!--*********** POPUP *************-->
    <transition name="popup">
      <create-folder-popup
        v-if="isShowCreateGroup === true"
        :data-theme="currentTheme"
        @closePopup="isShowCreateGroup = $event"
      ></create-folder-popup>
    </transition>
  </div>
</template>

<script>
import BreadCrumb from "../breadcrumb/index";
import CreateFolderPopup from "../popup/create/index";
import DeleteFolderPopup from "../popup/delete/index";
export default {
  components: {
    BreadCrumb,
    CreateFolderPopup,
    DeleteFolderPopup
  },
  data() {
    return {
      breadTitle: "Dữ liệu mẫu",
      breadDesc: "dữ liệu mẫu giúp bạn làm một cái gì gì đó dễ dàng hơn",
      isShowCreateGroup: false,
      isShowDeletePopup: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    campaigns() {
      return this.$store.getters.campaigns;
    }
  },
  methods: {
    editInfoCampaignExample(val) {
      this.$store.dispatch("getCampaignDetail", val);
      this.isShowCreateGroup = true;
    },
    deleteFolder(val) {
      this.$store.dispatch("deleteCampaign", val);
    },
    showInfoFolder(itemId) {
      this.$store.dispatch("getCampaignDetail", itemId);
      this.$router.push({ name: "campaigns_edit", params: { id: itemId } });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
