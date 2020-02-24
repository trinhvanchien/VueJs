import AppModal from "./components/Layout";

const Modal = {
  install(Vue) {
    this.EventBus = new Vue();

    Vue.component("ms-modal", AppModal);

    Vue.prototype.$modal = {
      show(params) {
        Modal.EventBus.$emit("show", params);
      },
      hide(params) {
        Modal.EventBus.$emit("hide", params);
      }
    };
  }
};

export default Modal;
