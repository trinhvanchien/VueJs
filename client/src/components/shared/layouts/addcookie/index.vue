<template>
  <div class="modal--wrapper" :data-theme="currentTheme">
    <div class="modal--dialog d_flex justify_content_center align_items_center">
      <div class="modal--content">
        <div class="modal--header">
          <icon-base
            icon-name="Cookie"
            width="440.4"
            height="156.808"
            viewBox="0 0 440.4 156.808"
          >
            <icon-modal-cookie />
          </icon-base>
        </div>
        <div class="modal--body">
          <div class="modal--title">{{ nameBread }}</div>
          <div class="modal--desc">
            {{ subBread }}
          </div>
          <textarea
            placeholder="Nhập mã kích hoạt tại đây ..."
            v-model="cookie"
            @keydown.enter.exact.prevent
            @keyup.enter.exact="addCookie"
            @keydown.enter.shift.exact="newline"
          ></textarea>
        </div>
        <div
          class="modal--footer d_flex justify_content_between align_items_center"
        >
          <button class="btn-skip" @click="closeAddPopup">HỦY</button>
          <button class="btn-add" @click="addCookie">
            XONG
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["showModal", "subBread", "nameBread"],
  data() {
    return {
      cookie: ""
    };
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    }
  },
  methods: {
    closeAddPopup() {
      this.$emit("closeAddPopup", false);
    },
    addCookie() {
      this.$store.dispatch("createlAccountFb", this.cookie);
      this.$emit("closeAddPopup", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
