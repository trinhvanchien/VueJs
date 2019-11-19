<template>
  <div class="detail mt_4">
    <!-- Start: Select List content simple data -->
    <!-- End: Select List content simple data -->
    <!-- Start: List content simple data -->
    <div class="body">
      <div class="header mb_4">
        <span class="add mr_3" @click="comeBackFolder">Quay lại</span>
      </div>
      <div class="name">
        <input
          type="text"
          placeholder="Tên thư mục"
          v-model="campaign.title"
          @keydown.enter="updateTitleCampaign"
        />
      </div>
      <h3 class="py_3">Danh sách bài viết trong {{ campaign.title }}</h3>
      <div>
        <p>Tên chiến dịch mẫu: {{ campaign.title }}</p>
        <p>Số ngày sử dụng : {{ campaign.totalDay }}</p>
        <div v-if="campaign.postCategory">
          <p>Danh mục đăng buổi sáng: {{ campaign.postCategory.morning.title }}</p>
          <p>Danh mục đăng buổi tối: {{ campaign.postCategory.night.title }}</p>
        </div>
        <div v-if="campaign.mix">
          <p>Danh mục mở bài: {{ campaign.mix.open.title }}</p>
          <p>Danh mục kết bài: {{ campaign.mix.close.title }}</p>
        </div>
      </div>
    </div>
    <!-- End: List content simple data -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowResultDefault: true
    };
  },
  computed: {
    campaign() {
      if (this.$store.getters.infoCateDefault === undefined) return;
      return this.$store.getters.campaign;
    },
    allPost() {
      return this.$store.getters.allMarketPosts;
    },
    listPost() {
      return this.$store.getters.listPost;
    }
  },
  methods: {
    comeBackFolder() {
      this.$router.push({ name: "campaigns" });
    },
    comeBackToCampaign() {
      this.isShowResultDefault = true;
    },
    updateTitleCampaign() {
      this.$store.dispatch("updateTitleCampaign", this.campaign);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
