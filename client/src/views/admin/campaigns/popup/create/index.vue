<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="r">
            <div class="c_6">
              <div class="font_weight_bold mb_2">Tên chiến dịch</div>
              <input
                type="text"
                class="form_control"
                :class="alertTitle === true ? 'danger' : ''"
                placeholder="Nhập tên chiến dịch mẫu"
                v-model="campaign.title"
              />
            </div>
            <div class="c_6">
              <div class="font_weight_bold mb_2">Số ngày hoạt động</div>
              <div class="total">
                <input
                  type="number"
                  class="form_control"
                  :class="alertDay === true ? 'danger' : ''"
                  placeholder="Nhập số ngày hoạt động của chiến dịch"
                  v-model="campaign.totalDay"
                />
              </div>
            </div>
          </div>
          <!-- START: SELECT CATEGORY FOR SCHEDULE -->
          <div class="select-category">
            <div class="font_weight_bold mt_2">
              Chọn danh mục sử dụng trong chiến dịch
            </div>
            <div class="post mb_3">
              <div>
                <p class="font_weight_bold mb_2">Danh mục đăng buổi sáng:</p>
                <div
                  class="item"
                  :class="alertCategoryMorning === true ? 'danger' : ''"
                >
                  <multiselect
                    label="title"
                    placeholder="Chọn danh mục sử dụng"
                    :options="categories"
                    v-model="campaign.postCategory.morning"
                    @input="selectCategoryMorning"
                  />
                </div>
              </div>
              <div>
                <p class="font_weight_bold mb_2">Danh mục đăng buổi tối:</p>
                <div
                  class="item"
                  :class="alertCategoryNight === true ? 'danger' : ''"
                >
                  <multiselect
                    label="title"
                    placeholder="Chọn danh mục sử dụng"
                    :options="categories"
                    v-model="campaign.postCategory.night"
                    @input="selectCategoryNight"
                  />
                </div>
              </div>
            </div>

            <div class="post">
              <div>
                <p class="font_weight_bold mb_2">Danh mục mở bài:</p>
                <div
                  class="item"
                  :class="alertCategoryOpen === true ? 'danger' : ''"
                >
                  <multiselect
                    label="title"
                    placeholder="Chọn danh mục mở bài"
                    :options="categories"
                    v-model="campaign.mix.open"
                    @input="selectCategoryOpen"
                  />
                </div>
              </div>
              <div>
                <p class="font_weight_bold mb_2">Danh mục kết bài:</p>
                <div
                  class="item"
                  :class="alertCategoryClose === true ? 'danger' : ''"
                >
                  <multiselect
                    label="title"
                    placeholder="Chọn danh mục kết bài"
                    :options="categories"
                    v-model="campaign.mix.close"
                    @input="selectCategoryClose"
                  />
                </div>
              </div>
            </div>
          </div>
          <!-- END: SELECT CATEGORY FOR SCHEDULE -->
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button
              v-if="campaign._id"
              class="btn bg_success"
              @click="updateCampaign"
            >
              Cập nhật
            </button>
            <button v-else class="btn bg_primary" @click="createNewFolder">
              Tạo mới
            </button>
          </div>
        </div>
        <!-- End: Modal Footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    currentTheme: String
  },
  data() {
    return {
      postList: [],
      alertTitle: false,
      alertDay: false,
      alertCategoryMorning: false,
      alertCategoryNight: false,
      alertCategoryOpen: false,
      alertCategoryClose: false
    };
  },
  computed: {
    posts() {
      return this.$store.getters.allMarketPosts;
    },
    campaign() {
      return this.$store.getters.campaignDetail;
    },
    categories() {
      return this.$store.getters.allCategoryDefault;
    }
  },
  watch: {
    "campaign.title"(val) {
      if (val.length > 0) {
        this.alertTitle = false;
      }
    },
    "campaign.totalDay"(val) {
      if (parseInt(val) <= 7) {
        this.alertDay = false;
      }
    }
  },
  methods: {
    close() {
      this.$store.dispatch("setCampaignDefault");
      this.$emit("closePopup", false);
    },
    async createNewFolder() {
      // check validator before create campaign
      try {
        if (this.campaign.title === "" || this.campaign.title.length === 0) {
          this.alertTitle = true;
          return false;
        } else if (parseInt(this.campaign.totalDay) > 7) {
          this.alertDay = true;
          return false;
        } else if (
          this.campaign.postCategory.morning === "" ||
          this.campaign.postCategory.morning.length === 0
        ) {
          this.alertCategoryMorning = true;
          return false;
        } else if (
          this.campaign.postCategory.night === "" ||
          this.campaign.postCategory.night.length === 0
        ) {
          this.alertCategoryNight = true;
          return false;
        } else if (
          this.campaign.mix.open === "" ||
          this.campaign.mix.open.length === 0
        ) {
          this.alertCategoryOpen = true;
          return false;
        } else if (
          this.campaign.mix.close === "" ||
          this.campaign.mix.close.length === 0
        ) {
          this.alertCategoryClose = true;
          return false;
        }
        // create campaign example
        await this.$store.dispatch("createCampaign", this.campaign);
        this.close();
      } catch (error) {
        return error;
      }
    },
    pushToCampaign(val) {
      this.postList.push(val);
    },
    selectCategoryMorning(val) {
      this.campaign.postCategory.morning = val;
    },
    selectCategoryNight(val) {
      this.campaign.postCategory.night = val;
    },
    selectCategoryOpen(val) {
      this.campaign.mix.open = val;
    },
    selectCategoryClose(val) {
      this.campaign.mix.close = val;
    },
    updateCampaign() {
      try {
        // check validator
        if (this.campaign.title === "" || this.campaign.title.length === 0) {
          this.alertTitle = true;
          return false;
        } else if (parseInt(this.campaign.totalDay) > 7) {
          this.alertDay = true;
          return false;
        }

        this.$store.dispatch("updateCampaignExample", this.campaign);
        this.close();
      } catch (error) {
        return error;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
