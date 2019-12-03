export default {
  data() {
    return {
      category: {
        name: "",
        parent: null,
        typeMarket: 0
      },
      isUpdateCategory: false,
      isCreateCategory: true,
      categoryUpdate: {}
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allCategory;
    },
    nameParent() {
      let arr = {
        _id: "",
        name: ""
      };
      const categories = this.$store.getters.allCategory;
      categories.map(category => {
        if (category._id === this.categoryUpdate.parent) {
          (arr._id = category._id), (arr.name = category.name);
        }
      });
      return arr;
    }
  },
  methods: {
    cancelCategory() {
      this.isUpdateCategory = false;
    },
    // create
    create() {
      let dataSender;
      try {
        dataSender = {
          name: this.category.name,
          parent: this.category.parent === null ? "" : this.category.parent._id,
          typeMarket: this.category.typeMarket === "1" ? 0 : null
        };
        this.$store.dispatch("createCategory", dataSender);
        this.category.name = "";
        this.category.parent = "";
        this.category.typeMarket = 0;
      } catch (e) {
        return;
      }
    },
    actionUpdate(content) {
      this.isUpdateCategory = true;
      this.categoryUpdate = content;
    },
    updateCategory() {
      let dataSender;
      this.isUpdateCategory = false;
      dataSender = {
        _id: this.categoryUpdate._id,
        parent: this.nameParent._id,
        name: this.categoryUpdate.name,
        typeMarket: this.categoryUpdate.typeMarket === "1" ? 0 : null
      };
      this.$store.dispatch("updateCategory", dataSender);
    },
    // dalete
    deleteCategory(value) {
      const dataSender = {
        _id: value._id
      };
      this.$store.dispatch("deleteCategory", dataSender);
    },

    // update
    updateParentCategory(value) {
      this.categoryUpdate.parent = value._id;
    },

    // parent
    getNameParent(content) {
      let arr = {
        nameParentCate: ""
      };
      const categories = this.$store.getters.allCategory;
      categories.map(item => {
        if (item._id === content) {
          arr.nameParentCate = item.name;
        }
      });
      return arr.nameParentCate;
    },
    selectCategoryParent(val) {
      this.category.parent = val;
    }
  },
  async created() {
    await this.$store.dispatch("getcategories");
  }
};
