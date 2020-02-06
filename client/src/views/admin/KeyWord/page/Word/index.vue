<template>
  <div class="theme">
    <div class="r">
      <div class="c_lg_5 c_md_12 c_sm_12 c_xs_12">
        <div class="theme--top py_4 px_5">
          <div class="theme--title text_center text_uppercase py_3">
            <span v-if="word._id">Cập nhật từ khóa</span>
            <span v-else>Tạo mới từ khóa</span>
          </div>
          <div class="theme--body">
            <div class="form_group">
              <label>Tên từ khóa</label>
              <input
                type="text"
                class="form_control"
                placeholder="Nhập tên chủ đề"
                v-model="word.name"
              />
              <div class="text--error mt_2" v-if="isShowAlertName === true">
                <span>Tên từ khóa không được để trống</span>
              </div>
            </div>
            <div class="form_group">
              <label>
                Giá trị chung
                <small>( các từ cùng nghĩa có chung giá trị )</small>
              </label>
              <input
                type="text"
                class="form_control"
                placeholder="Nhập giá trị chung cho các từ khóa có cùng nghĩa"
                v-model="word.key"
              />
              <div class="text--error mt_2" v-if="isShowAlertKey === true">
                <span>Giá trị chung không được để trống</span>
              </div>
            </div>
            <div class="form_group">
              <label>Chọn chủ đề</label>
              <div class="theme--body-cate">
                <multiselect
                  label="name"
                  placeholder="Chọn danh mục đăng bài..."
                  :options="spin"
                  v-model="word.theme"
                  @input="handleSelectTheme"
                />
              </div>
              <div class="text--error mt_2" v-if="isShowAlertTheme === true">
                <span>Chủ đề không được để trống</span>
              </div>
            </div>
          </div>
          <div
            class="theme--footer d_flex align_items_center justify_content_between"
          >
            <button class="btn--cancel" @click="resetWord">Hủy</button>
            <button class="btn--submit" v-if="word._id" @click="updateWord">
              Cập nhật
            </button>
            <button class="btn--submit" v-else @click="createNewWord">
              Thêm mới
            </button>
          </div>
        </div>
      </div>
      <div class="c_lg_7 c_md_12 c_sm_12 c_xs_12">
        <div class="search--bar--div">
          <span class="search--icon">
            <icon-base
              icon-name="Tìm kiếm"
              width="20"
              height="20"
              viewBox="0 0 20 20"
            >
              <icon-input-search />
            </icon-base>
          </span>
          <input
            class="search--input"
            type="text"
            placeholder="Tìm kiếm"
            v-model="search"
            @keydown.enter="updateSearch"
          />
        </div>
        <div class="theme--content">
          <div class="post--data">
            <div class="item--header d_flex align_items_center px_3 py_2">
              <div class="col col--name px_2">
                <span class="sort">Tên từ khóa</span>
              </div>
              <div class="col col--key px_2">
                <span class="sort">Giá trị</span>
              </div>
              <div class="col col--category px_2">Chủ đề</div>
              <div class="col col--action px_2">Hành động</div>
            </div>
            <div
              class="item--body data--empty d_flex align_items_center justify_content_center px_3 py_2"
              v-if="spinWord.length === 0"
            >
              Không có dữ liệu.
            </div>
            <word-item
              v-else
              v-for="(item, index) in spinWord"
              :key="index"
              :item="item"
              @deleteWord="handleDelete($event)"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- POPUP: DELETE WORD -->
    <transition name="popup">
      <delete-word
        v-if="isShowDeleteWord === true"
        :word="wordSelected"
        @closePopup="isShowDeleteWord = $event"
      />
    </transition>
    <!-- POPUP: DELETE WORD -->
  </div>
</template>

<script>
import WordItem from "./WordItem";
import DeleteWord from "../../popup/Word/WordDelete";
export default {
  components: {
    DeleteWord,
    WordItem
  },
  data() {
    return {
      isShowAlertName: false,
      isShowAlertKey: false,
      isShowAlertTheme: false,
      isShowDeleteWord: false,
      wordSelected: []
    };
  },
  computed: {
    spin() {
      return this.$store.getters.themes;
    },
    word() {
      return this.$store.getters.word;
    },
    spinWord() {
      return this.$store.getters.words;
    }
  },
  created() {
    const spin = this.$store.getters.themes;
    if (spin.length === 0) {
      this.$store.dispatch("getAllSpinTheme");
    }
    this.$store.dispatch("getAllWords");
  },
  watch: {
    "word.name"(val) {
      if (val !== "") {
        this.isShowAlertName = false;
      }
    },
    "word.key"(val) {
      if (val !== "") {
        this.isShowAlertKey = false;
      }
    },
    "word.theme"(val) {
      if (val.length > 0) {
        this.isShowAlertTheme = false;
      }
    },
    search(val) {
      // eslint-disable-next-line no-empty
      if (val.length === 0) {
      }
    }
  },
  methods: {
    createNewWord() {
      if (this.word.name === "") {
        this.isShowAlertName = true;
        return;
      } else if (this.word.key === "") {
        this.isShowAlertKey = true;
        return;
      } else if (this.word.theme.length === 0) {
        this.isShowAlertTheme = true;
        return;
      } else {
        this.$store.dispatch("createNewWord", this.word);
        this.resetWord();
      }
    },
    handleSelectTheme(val) {
      this.word.theme = val;
    },
    handleDelete(val) {
      this.isShowDeleteWord = true;
      this.wordSelected = val;
    },
    updateWord() {
      if (this.word.name === "") {
        this.isShowAlertName = true;
        return;
      } else if (this.word.key === "") {
        this.isShowAlertKey = true;
        return;
      } else if (this.word.theme.length === 0) {
        this.isShowAlertTheme = true;
        return;
      } else {
        this.$store.dispatch("updateWord", this.word);
        this.resetWord();
      }
    },
    resetWord() {
      this.$store.dispatch("setWordDefault");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
