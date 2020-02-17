<template>
  <div class="section p_3" :data-theme="currentTheme">
    <div class="section--body ct_0">
      <!-- Start: Name -->
      <div class="item mb_4">
        <span>*Tên bài viết</span>
        <input
          type="text"
          class="item--input mt_2"
          :class="{ 'input--error': inputValidateError.postTitle }"
          placeholder="Nhập tên bài viết"
          v-model="postMarket.title"
        />
      </div>
      <!-- End: Name -->
      <div class="d_flex align_items_center">
        <div class="font_weight_bold mr_4 mb_2">Thể loại :</div>
        <div class="radio--item mr_4">
          <label for="category" class="radio--custom d_flex align_items_center">
            <input
              type="radio"
              id="category"
              v-model="postType"
              value="1"
              @click="updatePostCase(1)"
            />
            <div class="pl_2">Danh mục sản phẩm</div>
          </label>
        </div>
        <div class="radio--item">
          <label
            for="post"
            class="radio--custom d_flex align_items_center mr_2"
          >
            <input
              type="radio"
              id="post"
              v-model="postType"
              value="2"
              @click="updatePostCase(2)"
            />
            <div class="pl_2">Danh mục mẫu</div>
          </label>
        </div>
      </div>
      <!-- START: SHOW CONTENT PRODUCT MARKET -->
      <div v-if="type === 1">
        <!-- Start: Categrories and Price -->
        <div class="enhance d_flex align_items_center">
          <div class="item mb_4 pr_2">
            <span>*Danh mục sản phẩm</span>
            <div
              class="cate mt_2"
              :class="{ 'input--error': inputValidateError.productCategory }"
            >
              <multiselect
                label="name"
                placeholder="Chọn danh mục đăng bài..."
                :options="categories"
                :value="convertCategoryPost"
                @input="updateProductCategory"
              />
            </div>
          </div>

          <div class="item mb_4 pl_2">
            <span>*Đơn giá</span>
            <input
              type="number"
              class="item--input mt_2"
              :class="{ 'input--error': inputValidateError.productPrice }"
              placeholder="Nhập đơn giá bài viết"
              v-model="product.priceCents"
            />
          </div>
        </div>
        <!-- End:  Categrories and Price -->

        <!-- Start: Attribute and Property -->
        <div class="item mb_4">
          <span>Đặc điểm</span>
          <div
            class="enhance d_flex align_items_center position_relative pr_4"
            v-for="(att, index) in product.attributes"
            :key="index"
          >
            <div class="item pr_3">
              <input
                type="text"
                class="item--input mt_2"
                placeholder="Nhập tên"
                v-model="att.name"
              />
            </div>
            <div class="item">
              <input
                type="text"
                class="item--input mt_2"
                placeholder="Nhập giá trị"
                v-model="att.value"
              />
            </div>
            <div
              class="icon--remove position_absolute"
              @click="deleteAttribute(index)"
            >
              <icon-base
                icon-name="remove"
                class="icon--remove"
                width="20"
                height="20"
                viewBox="0 0 16 16"
              >
                <icon-remove />
              </icon-base>
            </div>
          </div>

          <div
            class="add--attribute d_inline_flex mt_3 align_items_center p_2"
            @click="addAtttibute"
          >
            <icon-base
              icon-name="icon-plus"
              class="icon-plus mr_2"
              width="25"
              height="25"
              viewBox="0 0 60 70"
            >
              <icon-plus />
            </icon-base>
            Thêm đặc điểm
          </div>
        </div>
        <!-- End: Attribute and Property -->

        <!-- Start: tag -->
        <div class="item mb_4">
          <span>*Thẻ</span>
          <div
            class="mt_2"
            :class="{ 'input--error': inputValidateError.productTags }"
          >
            <taggle
              class="taggle form_control"
              placeholder="Nhập từ khóa và enter để kết thúc"
              v-model="product.tags"
            />
          </div>
        </div>
        <!-- End: tag -->

        <!-- Start: image -->
        <div class="item form_group">
          <span>*Ảnh đại diện</span>
          <div
            class="img--preview my_2"
            v-if="product.previews && product.previews.thumbnail"
          >
            <img :src="product.previews.thumbnail" alt="" height="120px" />
          </div>
          <div class="mt_2">
            <input
              type="file"
              ref="file"
              @change="selectFile()"
              accept="image/x-png,image/gif,image/jpeg"
              class="form_control p_1"
              :class="{ 'input--error': inputValidateError.productThumbnail }"
            />
          </div>
          <div class="contain--images"></div>
        </div>
        <!-- End: image -->

        <!-- Start: Content -->
        <div class="item mb_4">
          <span>*Nội dung</span>
          <div
            class="wrap mt_2"
            :class="{ 'input--error': inputValidateError.postContent }"
          >
            <contenteditable
              tag="div"
              class="contenteditable"
              contenteditable
              v-model="postMarket.content"
              placeholder="Cập nhật nội dung bài viết"
            />
          </div>
        </div>
        <!-- End: Content -->
        <!-- Start: Image -->
        <div class="item mb_4">
          <span>Hình ảnh</span>
          <image-gallery
            :photos="postMarket.photos"
            @updatePhotos="updatePhotos($event)"
            @removePhoto="postMarket.photos = $event"
          ></image-gallery>
        </div>
        <!-- End: Image -->
      </div>
      <!-- END: SHOW CONTENT PRODUCT MARKET -->
      <!-- START: SHOW CONTENT CATEGORY DEFAULT -->
      <div v-else>
        <div class="item mb_4 pr_2">
          <span>*Danh mục sản phẩm</span>
          <div
            class="cate mt_2"
            :class="{ 'input--error': inputValidateError.productCategory }"
          >
            <multiselect
              label="name"
              placeholder="Chọn danh mục đăng bài..."
              :options="categories"
              :value="convertCategoryPost"
              @input="updateProductCategory"
            />
          </div>
        </div>
        <!-- Start: Content -->
        <div class="item mb_4">
          <span>*Nội dung</span>
          <div
            class="wrap mt_2"
            :class="{ 'input--error': inputValidateError.postContent }"
          >
            <contenteditable
              tag="div"
              class="contenteditable"
              contenteditable
              v-model="postMarket.content"
              placeholder="Cập nhật nội dung bài viết"
            />
          </div>
        </div>
        <!-- End: Content -->
        <!-- Start: Image -->
        <div class="item mb_4">
          <span>Hình ảnh</span>
          <image-gallery
            :photos="postMarket.photos"
            @updatePhotos="updatePhotos($event)"
            @removePhoto="postMarket.photos = $event"
          ></image-gallery>
        </div>
        <!-- End: Image -->
      </div>
      <!-- END: SHOW CONTENT CATEGORY DEFAULT -->
      <div class="d_flex align_items_center">
        <button class="btn btn_info mr_3" @click="createPost">
          Lưu
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import ImageGallery from "./images";

export default {
  components: {
    ImageGallery
  },
  data() {
    return {
      file: "",
      postType: "1",
      inputValidateError: {
        postTitle: false,
        postContent: false,
        productCategory: false,
        productPrice: false,
        productTags: false,
        productThumbnail: false
      }
    };
  },
  computed: {
    categories() {
      return this.$store.getters.allCategory;
    },
    convertCategoryPost() {
      let dataCategory = {
        _id: "",
        name: ""
      };
      if (!this.product._category) return "";
      this.categories.forEach(item => {
        if (item._id === this.product._category) {
          dataCategory._id = item._id;
          dataCategory.name = item.name;
        }
      });
      return dataCategory;
    },
    currentTheme() {
      return this.$store.getters.themeName;
    },
    postMarket() {
      return this.$store.getters.postMarket;
    },
    product() {
      return this.$store.getters.product;
    },
    type() {
      return this.$store.getters.typeProduct;
    }
  },
  async created() {
    const status = this.$store.getters.marketControlStatus;
    if (status === 0) {
      await this.$store.dispatch("setPostDefaultMarket");
      await this.$store.dispatch("getProductDefault");
    }
    await this.$store.dispatch("getcategories");
  },
  watch: {
    "postMarket.title"(val) {
      this.inputValidateError.postTitle = !val || val === "";
    },
    "postMarket.content"(val) {
      this.inputValidateError.postContent = !val || val === "";
    },
    "product._category"(val) {
      this.inputValidateError.productCategory = !val || val === "";
    },
    "product.priceCents"(val) {
      this.inputValidateError.productPrice = !val || val === "" || val < 0;
    }
  },
  methods: {
    async createPost() {
      if (this.type === 1) {
        this.postMarket.typeMarket = null;
        //create post simple
        // Validate
        if (!this.postMarket.title || this.postMarket.title === "") {
          this.inputValidateError.postTitle = true;
          return;
        }
        if (!this.product._category || this.product._category === "") {
          this.inputValidateError.productCategory = true;
          return;
        }
        if (
          !this.product.priceCents ||
          this.product.priceCents === "" ||
          this.product.priceCents < 0
        ) {
          this.inputValidateError.productPrice = true;
          return;
        }
        if (!this.product.tags || this.product.tags.length === 0) {
          this.inputValidateError.productTags = true;
          return;
        }
        if (!this.product.previews || this.product.previews.thumbnail === "") {
          this.inputValidateError.productThumbnail = true;
          return;
        }
        if (!this.postMarket.content || this.postMarket.content === "") {
          this.inputValidateError.postContent = true;
          return;
        }

        //create post simple
        await this.$store.dispatch("createMarketPost", this.postMarket);
        //create post product market
        const postId = this.$store.getters.marketPost;
        if (postId) {
          this.product.content = postId;
        }
        this.product.name = this.postMarket.title;
        this.product.typeProduct = 0;
        this.product.description = this.postMarket.content.slice(0, 50);
        this.product.summary = this.postMarket.content.slice(0, 460);

        await this.$store.dispatch("createProduct", this.product);
      } else {
        this.postMarket.typeMarket = 0;
        // Validate
        if (!this.postMarket.title || this.postMarket.title === "") {
          this.inputValidateError.postTitle = true;
          return;
        }
        if (!this.product._category || this.product._category === "") {
          this.inputValidateError.productCategory = true;
          return;
        }
        if (!this.postMarket.content || this.postMarket.content === "") {
          this.inputValidateError.postContent = true;
          return;
        }
        await this.$store.dispatch("createMarketPost", this.postMarket);
      }
      // reset post
      await this.$store.dispatch("setPostDefaultMarket");
      await this.$store.dispatch("getProductDefault");
      await this.$store.dispatch("setTypePost", 1);
      // redirect to post list
      this.$router.push({ name: "market_post" });
    },
    updatePhotos(photos) {
      photos.forEach(item => {
        this.postMarket.photos.push(item);
      });
    },
    selectFile() {
      this.file = this.$refs.file.files;
      this.sendFile();

      // reset ref
      const input = this.$refs.file;
      input.type = "text";
      input.type = "file";
    },
    async sendFile() {
      const formData = new FormData();
      Array.from(this.file).forEach(file => {
        formData.append("photos", file);
      });

      await this.$store.dispatch("uploadMarketPostPhotos", formData);
      const dataEmit = await this.$store.getters.marketPostPhotosUpload;
      this.product.previews.thumbnail = dataEmit[0];
    },
    updateProductCategory(value) {
      this.product._category = value._id;
    },
    updatePostCase(val) {
      this.$store.dispatch("setTypePost", val);
    },
    addAtttibute() {
      this.$store.dispatch("createAttribute");
    },
    deleteAttribute(index) {
      this.$store.dispatch("deleteAttribute", index);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./index.style";
</style>
