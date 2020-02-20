<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4" v-click-outside="closePopup">
        <div class="modal--header">
          <div class="title">Thêm từ khoá từ file</div>
        </div>
        <div class="modal--body my_3">
          <div class="desc">Upload bộ từ khoá từ một file txt</div>
        </div>

        <div
          class="preview mt_2 d_flex align_items_center justify_content_center px_2 py_2"
        >
          <label for="upload">
            <icon-base
              class="icon--image mr_2"
              icon-name="image"
              width="18"
              height="18"
              viewBox="0 0 21 21"
            >
              <icon-image />
            </icon-base>
            <span>Chọn file từ máy tính</span>
          </label>
          <form enctype="multipart/form-data" @submit.prevent="sendFile">
            <input
              id="upload"
              hidden
              type="file"
              ref="file"
              @change="selectFile"
              accept="text/txt"
            />
          </form>
        </div>

        <div class="form_group">
          <div class="modal--body my_3">
            <div class="desc">Chọn chủ đề</div>
          </div>
          <div class="theme--body-cate">
            <multiselect
              label="name"
              placeholder="Chọn chủ đề của bộ từ vựng..."
              :options="themeList"
              v-model="selectedTheme"
            />
          </div>
          <div class="text--error mt_2" v-if="isShowAlertTheme === true">
            <span>Chủ đề không được để trống</span>
          </div>
        </div>

        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn--cancel" @click="closePopup">HỦY</button>
          <button class="btn--commit">IMPORT DỮ LIỆU</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShowAlertTheme: false
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    themeList() {
      return this.$store.getters.themeList;
    },
    selectedTheme: {
      get() {
        return this.$store.getters.selectedTheme;
      },
      set(newValue) {
        if (!newValue) {
          newValue = { name: "", description: "" };
        }
        this.$store.dispatch("updateSelectedTheme", newValue);
      }
    }
  },
  watch: {
    selectedTheme(val) {
      if (val !== "") {
        false;
      }
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    selectFile() {
      // eslint-disable-next-line no-console
      console.log("Hello World", this.isShowAlertTheme);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
