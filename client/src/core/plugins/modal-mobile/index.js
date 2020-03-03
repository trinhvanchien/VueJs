import AppModal from "./components/Layout";

const ModalMobile = {
  install(Vue) {
    this.EventBus = new Vue();

    Vue.component("ms-modal-mobile", AppModal);

    Vue.prototype.$modalMobile = {
      show(params) {
        ModalMobile.EventBus.$emit("show", params);
      },
      hide(params) {
        ModalMobile.EventBus.$emit("hide", params);
      }
    };
  }
};

export default ModalMobile;
