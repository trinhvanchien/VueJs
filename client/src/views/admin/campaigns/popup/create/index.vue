<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content px_4 py_3" v-click-outside="close">
        <!-- Start: Modal Body -->
        <div class="body">
          <div class="r">
            <div class="c_6">
              <div class="font_weight_bold">Tên chiến dịch</div>
              <input
                type="text"
                class="form_control"
                placeholder="Nhập tên chiến dịch mẫu"
                v-model="campaign.title"
              />
            </div>
            <div class="c_6">
              <div class="font_weight_bold">Số ngày hoạt động</div>
              <div class="total">
                <input
                  type="number"
                  class="form_control"
                  placeholder="Nhập số ngày hoạt động của chiến dịch"
                  v-model="campaign.totalDay"
                />
              </div>
            </div>
          </div>
          <div class="font_weight_bold mt_2">
            Chọn danh mục sử dụng trong chiến dịch
          </div>
          <div class="post mt_1">
            <div>
              <p class="font_weight_bold">Danh mục đăng buổi sáng:</p>
              <multiselect
                label="title"
                placeholder="Chọn danh mục sử dụng"
                :options="categories"
                v-model="campaign.postCategory.morning"
                @input="selectCategoryMorning"
              />
            </div>
            <div>
              <p class="font_weight_bold">Danh mục đăng buổi tối:</p>
              <multiselect
                label="title"
                placeholder="Chọn danh mục sử dụng"
                :options="categories"
                v-model="campaign.postCategory.night"
                @input="selectCategoryNight"
              />
            </div>
          </div>
          <div class="font_weight_bold mt_2">
            Chọn danh mục mở bài và kết bài
          </div>
          <div class="post mt_1">
            <div>
              <p class="font_weight_bold">Danh mục mở bài:</p>
              <multiselect
                label="title"
                placeholder="Chọn danh mục mở bài"
                :options="categories"
                v-model="campaign.mix.open"
                @input="selectCategoryOpen"
              />
            </div>
            <div>
              <p class="font_weight_bold">Danh mục kết bài:</p>
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
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center mt_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button class="btn bg_primary" @click="createNewFolder">
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
      postList: []
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
  async created() {
    await this.$store.dispatch("getAllCategoryDefault");
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    async createNewFolder() {
      await this.$store.dispatch("createCampaign", this.campaign);
      this.close();
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
