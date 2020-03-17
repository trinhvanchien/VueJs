<template>
  <div class="container">
    <!-- =-=-=-=-=-=-=-=-notification-=-=-=-=-=-=-=-=-= -->
    <div style="border-radius: 25px" class="alert-popup">
      <div
        class="alert notification text-center"
        v-if="pageStatus === 'insert'"
        style="font-size:15px"
      >
        <i class="far fa-check-circle" style="font-size:20px"></i
        >&nbsp;&nbsp;Thêm chủ đề thành công !!!
      </div>
      <div
        class="alert notification text-center"
        v-else-if="pageStatus === 'update'"
        style="font-size:15px"
      >
        <i class="far fa-check-circle" style="font-size:20px"></i
        >&nbsp;&nbsp;Cập nhật chủ đề thành công !!!
      </div>
      <div
        class="alert notification text-center"
        v-else-if="pageStatus === 'delete'"
        style="font-size:15px"
      >
        <i class="far fa-check-circle" style="font-size:20px"></i
        >&nbsp;&nbsp;Xóa chủ đề thành công !!!
      </div>
    </div>
    <!-- =-=-=-=-=-=-=-=-notification-=-=-=-=-=-=-=-=-= -->
    <div class="row">
      <div class="col-4">
        <div class="card" style="border-radius: 20px">
          <div class="card-body">
            <p
              class="card-title text-center font-weight-bold"
              style="font-size:18px"
              v-if="themesObj._id"
            >
              Cập nhật chủ đề
            </p>
            <p
              class="card-title text-center font-weight-bold"
              style="font-size:18px"
              v-else
            >
              Tạo mới chủ đề
            </p>
            <label>Tên chủ đề</label>
            <input
              type="text"
              placeholder="Nhập tên chủ đề"
              class="form-control mb-3"
              v-model="themesObj.name"
            />
            <div class="text-danger" v-if="isShowValidate === true">
              <span>Tên chủ đề không được bỏ trống</span>
            </div>
            <label>Mô tả chủ đề</label>
            <textarea
              type="text"
              placeholder="Nhập mô tả chủ đề"
              class="form-control"
              style="min-height:110px"
              v-model="themesObj.description"
            ></textarea>
            <br />
            <div>
              <button
                v-if="themesObj._id"
                type="submit"
                @click="update(themesObj)"
              >
                Cập nhật
              </button>
              <button v-else type="submit" @click="create()">
                Tạo mới
              </button>
              <button v-if="themesObj._id" @click="cancel" class="float_right">
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="col-8">
        <div class="d-flex mb-2">
          <div class="search-bar-div">
            <i class="fas fa-search"></i>
            <input
              class="search-input form-control"
              type="text"
              placeholder="Tìm kiếm"
              v-model="searchKey"
            />
          </div>
          <select class="page-size ml-auto" v-model="pageSize">
            <option value="10" selected>Hiển thị 10</option>
            <option value="25">Hiển thị 25</option>
            <option value="50">Hiển thị 50</option>
          </select>
        </div>
        <div class="text-center py-3">
          <button
            class="btn-page"
            @click="nextOrPrevPage(-1)"
            :disabled="currentPage === 1"
          >
            <i class="fas fa-backward"></i>
            Trang trước
          </button>
          &nbsp;
          <span>{{ this.currentPage }} / {{ this.totalPages }}</span>
          &nbsp;
          <button
            class="btn-page"
            @click="nextOrPrevPage(1)"
            :disabled="currentPage === totalPages"
          >
            Trang sau <i class="fas fa-forward"></i>
          </button>
        </div>
        <table class="table table-hover">
          <thead style="background:#f5f5f5">
            <tr>
              <th scope="col">Tên chủ đề</th>
              <th scope="col">Mô tả chủ đề</th>
              <th scope="col">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="theme.length === 0">
              Không có dữ liệu
            </tr>
            <tr v-else v-for="(item, index) in theme" :key="index">
              <td>{{ item.name }}</td>
              <td>{{ item.description }}</td>
              <td>
                <i
                  class="far fa-trash-alt mr-3"
                  style="font-size:25px"
                  @click="handleDelete(item)"
                ></i>
                <i
                  class="far fa-edit"
                  style="font-size:25px"
                  @click="getIdTheme(item)"
                ></i>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <transition name="popup">
      <modal-delete
        :theme="themeSelected"
        v-if="isShowPopupDelete === true"
        @closePopup="isShowPopupDelete = $event"
      />
    </transition>
  </div>
</template>
<script>
import ModalDelete from "../../modal/Modal.Theme";
import "./style.css";
export default {
  components: {
    ModalDelete
  },
  data() {
    return {
      themeSelected: {},
      isShowPopupDelete: false,
      isShowValidate: false
    };
  },
  watch: {
    "themesObj.name"(val) {
      if (val !== "") {
        this.isShowValidate = false;
      }
    }
  },
  created() {
    this.$store.dispatch("getThemes");
  },
  computed: {
    theme() {
      return this.$store.getters.themes;
    },
    themesObj() {
      return this.$store.getters.themesObj;
    },
    totalPages() {
      return this.$store.getters.totalPages;
    },
    currentPage() {
      return this.$store.getters.currentPage;
    },
    pageSize: {
      get() {
        return this.$store.getters.pageSize;
      },
      set(val) {
        this.$store.dispatch("setPageSize", val);
      }
    },
    searchKey: {
      get() {
        return this.$store.getters.searchKey;
      },
      set(val) {
        this.$store.dispatch("searchTheme", val);
      }
    },
    pageStatus() {
      return this.$store.getters.pageStatus;
    }
  },
  methods: {
    nextOrPrevPage(val) {
      this.$store.dispatch("nextOrPrevPage", val);
    },
    create() {
      if (this.themesObj.name === "") {
        this.isShowValidate = true;
        return;
      } else {
        this.$store.dispatch("createTheme", this.themesObj);
        this.$store.dispatch("resetTheme");
      }
    },
    cancel() {
      this.$store.dispatch("resetTheme");
    },
    update(val) {
      this.$store.dispatch("updateTheme", val);
      this.$store.dispatch("resetTheme");
    },
    getIdTheme(val) {
      this.$store.dispatch("getIdTheme", val);
    },
    handleDelete(val) {
      this.isShowPopupDelete = true;
      this.themeSelected = val;
    }
  }
};
</script>
