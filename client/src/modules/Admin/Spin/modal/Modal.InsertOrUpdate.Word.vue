<template>
  <div class="modal--wrapper">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content px_3 py_4">
        <div class="modal--header">
          <div v-if="modalControl === true" class="title">Cập nhật từ khóa</div>
          <div v-else class="title">Thêm mới từ khóa</div>
        </div>
        <div class="modal--body my_3">
          <label>Tên từ khóa</label>
          <input
            type="text"
            placeholder="Nhập tên từ khóa"
            class="form-control input-key"
            v-model="wordsObj.name"
          />
          <div class="text-danger mt-2" v-if="isShowAlertName === true">
            <span>Tên từ khóa không được bỏ trống</span>
          </div>
          <br />
          <label>Giá trị chung</label>
          <span style="font-size:13px">
            ( các từ cùng nghĩa có chung giá trị)</span
          >
          <input
            type="text"
            placeholder="Nhập giá trị"
            class="form-control input-key"
            v-model="wordsObj.key"
          />
          <br />
          <label>Chọn chủ đề</label>
          <select class="custom-select select-theme" v-model="wordsObj.themes">
            <option v-for="item in theme_Word" :key="item._id">
              {{ item.name }}
            </option>
          </select>
          <div
            class="modal--footer d_flex justify_content_between align_items_center"
          >
            <button
              v-if="modalControl === true"
              class="btn--submit"
              @click="update"
            >
              Cập nhật
            </button>
            <button v-else class="btn--submit" @click="insert()">
              Tạo
            </button>
            <button class="btn--submit" @click="closePopup()">
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["modalControl"],
  data() {
    return {
      isShowAlertName: false
    };
  },
  created() {
    const theme_Word = this.$store.getters.themes;
    if (theme_Word.length === 0) {
      this.$store.dispatch("getThemes");
    }
  },
  watch: {
    "wordsObj.name"(val) {
      if (val !== "") {
        this.isShowAlertName = false;
      }
    }
  },
  computed: {
    wordsObj() {
      return this.$store.getters.wordsObj;
    },
    theme_Word() {
      return this.$store.getters.themes;
    }
  },
  methods: {
    closePopup() {
      this.$emit("closePopup", false);
    },
    insert() {
      if (this.wordsObj.name === "") {
        this.isShowAlertName = true;
        return;
      } else {
        this.$store.dispatch("createWords", this.wordsObj);
        console.log("wordsObj", this.wordsObj);
        this.$store.dispatch("resetWords");
        this.closePopup();
      }
    },
    async update(val) {
      await this.$store.dispatch("updateWord", val);
      await this.$store.dispatch("resetWords");
      await this.closePopup();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./style";
</style>
