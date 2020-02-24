<template>
  <div class="ms-modal" :data-modal="name" v-if="visible">
    <div class="ms-modal__mask" style="z-index: 999;">
      <div class="ms-modal__container" :class="{ align_items_center: center }">
        <div class="ms-modal__box" style>
          <div class="ms-modal__content ms-modal__content--normal" :style="styleCustom">
            <div class="ms-modal__body">
              <slot :payload="payload" />
            </div>
          </div>
          <i class="ms-icon ms-modal__close" v-if="!hiddenClose" @click="close">
            <base-icon height="18" width="18" viewBox="100 100 800 800">
              <icon-close />
            </base-icon>
          </i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/core/plugins/modal";
export default {
  props: {
    center: {
      type: Boolean,
      default: false
    },
    hiddenClose: {
      type: Boolean,
      default: false
    },
    onHideCallback: Function,
    name: {
      type: String,
      required: true
    },
    styleCustom: Object
  },
  data() {
    return {
      onCallback: {},
      payload: {},
      visible: false
    };
  },
  methods: {
    listenOnCallback() {
      if (typeof this.onCallback === "function") {
        this.onCallback();
      }
    },
    close() {
      if (this.onHideCallback) {
        this.onHideCallback();
      }
      this.visible = false;
    },
    hide(params) {
      this.visible = false;
      this.payload = {};
      this.onCallback = params.onCallback;
    },
    show(params) {
      this.visible = true;
      if (params) {
        this.payload = params.payload;
        this.onCallback = params.onCallback;
      }
    }
  },
  beforeMount() {
    // show event
    Modal.EventBus.$on("show", params => {
      if (this.name === params.name) {
        this.show(params);
      }
    });

    // hide event
    Modal.EventBus.$on("hide", params => {
      if (this.name === params.name) {
        this.hide(params);
      }
    });
  }
};
</script>

<style lang="scss" scoped>
.ms-modal__box {
  position: relative;
  display: inline-block;
  padding: 48px 32px;
  transform-origin: top;
}
.ms-modal__close.ms-icon {
  position: absolute;
  top: 48px;
  right: 0;
  width: 16px;
  height: 16px;
  color: #fff;
  cursor: pointer;
}
.ms-modal__container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.ms-modal__content {
  color: #555;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.05), 0 16px 16px 0 rgba(0, 0, 0, 0.09);
}
.ms-modal__mask {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
