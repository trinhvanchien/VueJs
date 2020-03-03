import ModalEditUserInfo from "../ModalEdit";
import ModalUserInfo from "../ModalInfo";
import ModalDeleteUser from "../ModalDelete";

export default {
  components: {
    ModalEditUserInfo,
    ModalUserInfo,
    ModalDeleteUser
  },
  data() {
    return {
      showEdit: false,
      showInfo: false,
      showDeleteDialog: false,
      userSelectInfo: null,
      userSelectEdit: null,
      selected: []
    };
  },
  filters: {
    formatDate(d) {
      const newDate = new Date(d),
        year = newDate.getFullYear(),
        month = String(newDate.getMonth() + 1).padStart(2, 0),
        date = String(newDate.getDate()).padStart(2, 0);

      return `${date}/${month}/${year}`;
    },
    getFirstLetter(string) {
      return string.charAt(0).toUpperCase();
    }
  },
  computed: {
    currentTheme() {
      return this.$store.getters.themeName;
    },
    user() {
      // if(Object.entries(this.$store.getters.usersFilter).length === 0 && this.$store.getters.usersFilter.constructor === Object) return;
      return this.$store.getters.usersFilter;
    },
    selectAll: {
      get: function() {
        return this.users ? this.selected.length === this.users.length : false;
      },
      set: function(value) {
        let selected = [];

        if (value) {
          this.users.forEach(user => {
            selected.push(user._id);
          });
        }
        this.selected = selected;
      }
    }
  },
  methods: {
    async openPopupInfo(user) {
      await this.$store.dispatch("getUserAdminById", user);
      this.$modal.show({ name: "modal-user-info" });
    },
    async openPopupEdit(user) {
      await this.$store.dispatch("getUserAdminById", user);
      this.$modal.show({ name: "modal-edit-user-info" });
      this.userSelectEdit = user;
    },
    openDeleteDialog() {
      this.$modal.show({ name: "modal-delete-user" });
    },
    userStatus(startDate, endDate) {
      const startDateTime = new Date(startDate),
        endDateTime = new Date(endDate),
        time = endDateTime.getTime() - startDateTime.getTime();

      return time > 0;
    }
  }
};
