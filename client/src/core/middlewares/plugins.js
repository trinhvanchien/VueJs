import Vue from "vue";
import Modal from "@/core/plugins/modal";
import ModalMobile from "@/core/plugins/modal-mobile";
import VClickOutside from "@/core/plugins/click-outside";

// Modal Custom
Vue.use(Modal);
Vue.use(ModalMobile);

// Click outside directive
Vue.use(VClickOutside);
