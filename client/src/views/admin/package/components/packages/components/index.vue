<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center">
      <div class="modal--content">
        <!-- Start: Modal Body -->
        <div class="body">
          <VuePerfectScrollbar class="scroll">
            <div class="px_4 py_3">
              <div class="form_group">
                <label class="">Tạo package mới</label>
                <input
                  v-model="membership.name"
                  type="text"
                  class="form_control"
                  placeholder="Nhập tên thư mục"
                />
              </div>

              <div class="form_group">
                <label>Số bài đăng trong 1 ngày</label>
                <input
                  v-model="membership.limit.post"
                  type="number"
                  placeholder="Nhập số bài đăng tối đa của gói"
                  class="form_control"
                />
              </div>

              <div class="form_group">
                <label>Số chiến dịch tạo trong 1 ngày</label>
                <input
                  v-model="membership.limit.campaign"
                  type="number"
                  placeholder="Nhập số bài đăng tối đa của gói"
                  class="form_control"
                />
              </div>

              <div class="form_group">
                <label>Số sự kiện tạo trong 1 ngày</label>
                <input
                  v-model="membership.limit.slot"
                  type="number"
                  placeholder="Nhập số bài đăng tối đa của gói"
                  class="form_control"
                />
              </div>

              <!--START: PRICE PACKAGE BY MONTH-->
              <div class="price">
                <div class="desc py_2">
                  <span class="font_weight_bold text_uppercase"
                    >Giá bán theo tháng</span
                  >
                  <small class="ml_2"
                    >( các trường giá trị dưới đây là bắt buộc )</small
                  >
                </div>
                <div class="item">
                  <div class="title mb_1">
                    <span>1 tháng</span>
                  </div>
                  <div
                    class="main d_flex align_items_center justify_content_between mb_1"
                  >
                    <div class="form_group w_50 mr_2">
                      <label>Giá bán gốc</label>
                      <input
                        v-model="membership.price.one.original"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                    <div class="form_group w_50">
                      <label>Giá khuyến mại</label>
                      <input
                        v-model="membership.price.one.promotional"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="title mb_1">
                    <span>3 tháng</span>
                  </div>
                  <div
                    class="main d_flex align_items_center justify_content_between mb_1"
                  >
                    <div class="form_group w_50 mr_2">
                      <label>Giá bán gốc</label>
                      <input
                        v-model="membership.price.three.original"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                    <div class="form_group w_50">
                      <label>Giá khuyến mại</label>
                      <input
                        v-model="membership.price.three.promotional"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="title mb_1">
                    <span>6 tháng</span>
                  </div>
                  <div
                    class="main d_flex align_items_center justify_content_between mb_1"
                  >
                    <div class="form_group w_50 mr_2">
                      <label>Giá bán gốc</label>
                      <input
                        v-model="membership.price.six.original"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                    <div class="form_group w_50">
                      <label>Giá khuyến mại</label>
                      <input
                        v-model="membership.price.six.promotional"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                  </div>
                </div>
                <div class="item">
                  <div class="title mb_1">
                    <span>12 tháng</span>
                  </div>
                  <div
                    class="main d_flex align_items_center justify_content_between mb_1"
                  >
                    <div class="form_group w_50 mr_2">
                      <label>Giá bán gốc</label>
                      <input
                        v-model="membership.price.twelve.original"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                    <div class="form_group w_50">
                      <label>Giá khuyến mại</label>
                      <input
                        v-model="membership.price.twelve.promotional"
                        type="number"
                        placeholder="Nhập số tiền của gói"
                        class="form_control"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <!--END: PRICE PACKAGE BY MONTH-->
            </div>
          </VuePerfectScrollbar>
        </div>
        <!-- End: Modal Body -->
        <!-- Start: Modal Footer -->
        <div class="footer d_flex align_items_center px_4 py_3">
          <div class="ml_auto d_flex">
            <button class="btn bg_danger mr_2" @click="close">
              Hủy bỏ
            </button>
            <button
              class="btn bg_primary"
              v-if="isShowButtonDefault === true"
              @click="createNewPackage"
            >
              Tạo mới
            </button>
            <button
              class="btn bg_primary"
              v-if="isShowButtonDefault === false"
              @click="updateMemberShipPackage"
            >
              Cập nhật
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
  props: ["isShowButtonDefault", "currentTheme"],
  data() {
    return {};
  },
  computed: {
    membership() {
      return this.$store.getters.membershipPackage;
    }
  },
  methods: {
    close() {
      this.$emit("closePopup", false);
    },
    async createNewPackage() {
      await this.$store.dispatch("createMemberShipPackage", this.membership);
      this.close();
    },
    async updateMemberShipPackage() {
      await this.$store.dispatch("updateMemberShipPackage", this.membership);
      await this.$emit("changeButton", true);
      this.close();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "index.style";
</style>
