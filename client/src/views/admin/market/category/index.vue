<template>
  <div class="modal--wrapper">
    <div class="modal--content">
      <!-- Start: create -->
      <div class="create mb_3">
        <h3>Tao danh muc moi</h3>
        <!-- create -->
        <form action class="card card_body" v-if="isUpdateCategory === false">
          <div class="form_group">
            <label for class>Tên danh mục</label>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập tên danh mục"
              v-model="category.name"
            />
          </div>
          <div class="d_flex align_items_center justify_content_between">
            <div class="form_group w_50">
              <label for class>Lựa chọn danh mục cha</label>
              <div class="multi">
                <multiselect
                  label="name"
                  placeholder="Chọn danh mục cha"
                  :options="categories"
                  v-model="category.parent"
                  @input="selectCategoryParent"
                />
              </div>
            </div>
            <div class="form_group w_50 ml_3">
              <label for class>Loại danh mục</label>
              <div class="">
                <select v-model="category.typeMarket" class="form_control">
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bottom">
            <label class="btn btn_success" @click="create">Tao moi</label>
          </div>
        </form>
        <!-- update -->
        <form action class="card card_body" v-if="isUpdateCategory === true">
          <div class="form_group">
            <label for class>Tên danh mục</label>
            <input
              type="text"
              class="form_control"
              placeholder="Nhập tên danh mục"
              v-model="categoryUpdate.name"
            />
          </div>
          <div class="d_flex align_items_center justify_content_between">
            <div class="form_group w_50">
              <label for class>Lựa chọn danh mục cha</label>
              <div class="multi">
                <multiselect
                  label="name"
                  placeholder="Chọn danh mục cha ..."
                  :options="categories"
                  :value="nameParent"
                  @input="updateParentCategory"
                />
              </div>
            </div>
            <div class="form_group w_50 ml_3">
              <label class>Loại danh mục</label>
              <div class="">
                <select
                  v-model="categoryUpdate.typeMarket"
                  class="form_control"
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                </select>
              </div>
            </div>
          </div>
          <div class="bottom">
            <label class="btn btn_success" @click="updateCategory"
              >Update</label
            >
            <label class="btn btn_danger ml_3" @click="cancelCategory"
              >Hủy</label
            >
          </div>
        </form>
      </div>
      <!-- End: create -->
      <!-- Start: List -->
      <div class="list">
        <h3>Danh sach danh muc</h3>
        <div class="card card_body">
          <div class="content">
            <!-- Start: title -->
            <div class="item--list-header d_flex align_items_center">
              <div class="title p_2">Tiêu đề</div>
              <div class="cate--parent p_2">Danh muc cha</div>
              <div class="creator p_2">Nguoi tao</div>
              <div class="updator p_2">Nguoi update</div>
              <div class="action p_2"></div>
            </div>
            <!-- End: title -->
            <!-- Start: Item list -->
            <div
              class="item--list-content d_flex align_items_center"
              v-for="(category, index) in categories"
              :key="index"
            >
              <div class="title p_2">{{ category.name }}</div>
              <div class="cate--parent p_2">
                <div v-if="category.parent.length > 0">
                  {{ getNameParent(category.parent) }}
                </div>
                <div v-else>None</div>
              </div>
              <div class="creator p_2">{{ category._creator.name }}</div>
              <div class="updator p_2" v-if="category._editor === undefined">
                Chua co nguoi update
              </div>
              <div class="updator p_2" v-else>{{ category._editor.name }}</div>
              <div class="d_flex px_2 action">
                <div class="btn btn_info mr_1" @click="actionUpdate(category)">
                  Sua
                </div>
                <div class="btn btn_danger" @click="deleteCategory(category)">
                  Xoa
                </div>
              </div>
            </div>
            <div v-if="categories.length === 0" class="text_center p_2">
              Khong co noi dung
            </div>
            <!-- End: Item list -->
          </div>
        </div>
      </div>
      <!-- Start: List -->
    </div>
  </div>
</template>

<script src="./index.script.js"></script>

<style lang="scss" scoped>
@import "./index.style.scss";
</style>
