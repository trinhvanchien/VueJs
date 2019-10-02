<template>
  <div class="wrapper" :data-theme="currentTheme">
    <div class="grid">
      <!-- Start: Grid Header -->
      <div class="grid--header d_flex align_items_center mb_1">
        <div class="d_flex align_items_center">
          <input
            type="checkbox"
            class="grid--header-checkall checkbox"
            name
            value
            v-model="selectAll"
          />
          <div
            class="grid--header-remove ml_3"
            @click="openDeleteDialog"
            v-if="selected.length > 0"
          >
            <icon-base
              icon-name="Xóa"
              width="20"
              height="20"
              viewBox="0 0 16 16"
            >
              <icon-remove />
            </icon-base>
          </div>
        </div>
        <div class="grid--header-select ml_3">
          Đã chọn
          <span class="font_weight_bold">{{ selected.length }}</span> tài khoản
        </div>
      </div>
      <!-- End: Grid Header -->
      <!-- Start: Grid Content -->
      <div class="grid--content">
        <div class="ct_f p_0">
          <!-- Start: User Data -->
          <div v-if="users && users.length > 0">

            <div
              class="card bdr-0 d_flex align_items_center justify_content_center mt_5"
              v-for="(user, index) in users"
              :key="index"
            >
              <div
                class="card_body user w-80 d_flex align_items_center justify_content_between"
              >
                <!-- Start: Avatar -->
                <div
                  class="user--avatar w-20 mt_2 mb_3 d_flex justify_content_center"
                >
                  <div
                    v-if="user.imageAvatar"
                    class="avatar--content avatar--img position_relative d_block"
                    :style="{
                      backgroundImage: 'url(' + user.imageAvatar + ')'
                    }"
                    @click="openPopupInfo(user._id)"
                  ></div>
                  <div
                    v-else
                    class="avatar--content avatar--default position_relative d_block"
                    @click="openPopupInfo(user._id)"
                  >
                    <span class="position_absolute">{{
                      user.name | getFirstLetter
                    }}</span>
                  </div>
                </div>
                <!-- End: Avatar -->

                <!-- START: USER INFO -->
                <div class="information w-65 d_flex align_items_center">
                  <div class="w-50">
                    <div>
                      <label>Tên người dùng: </label>
                      <span>{{ user.name }}</span>
                    </div>

                    <div>
                      <label>Email người dùng: </label>
                      <span>{{ user.email }}</span>
                    </div>

                    <div>
                      <label>Số điện thoại: </label>
                      <span>{{ user.phone }}</span>
                    </div>

                    <div>
                      <label>Gói tài khoản áp dụng: </label>
                      <span>{{ user.name }}</span>
                    </div>

                    <div>
                      <label>Ngày tạo tài khoản: </label>
                      <span>{{ user.created_at | formatDate }}</span>
                    </div>

                  </div>

                  <div class="w-50">
                    <div>
                      <label>Phân quyền người dùng: </label>
                      <span>{{ user._role.level }}</span>
                    </div>

                    <div>
                      <label>Giới hạn tài khoản Facebook: </label>
                      <span>{{ user.maxAccountFb }}</span>
                    </div>

                    <div>
                      <label>Server đang hoạt động: </label>
                      <span>{{ user.name }}</span>
                    </div>

                    <div>
                      <label>Trạng thái tài khoản: </label>
                      <span :class="user.status === true ? 'alive': 'die'">{{ user.status === true ? 'Hoạt động' : 'Ngừng hoạt động' }}</span>
                    </div>

                    <div>
                      <label>Ngày hết hạn: </label>
                      <span>{{ user.expireDate | formatDate }}</span>
                    </div>
                  </div>
                </div>
                <!-- END: USER INFO -->

                <!-- Start: Edit Btn -->
                <div class="user--edit text_center w-15">
                  <div class="btn--edit" @click="openPopupEdit(user._id)">
                    <span class="mr_2">Chỉnh sửa</span>
                    <icon-base
                      icon-name="Sửa"
                      width="16"
                      height="16"
                      viewBox="0 0 20 20"
                    >
                      <icon-edit />
                    </icon-base>
                  </div>
                </div>
                <!-- End: Edit Btn -->
              </div>
            </div>
          </div>
          <!-- Start: User Data -->
          <!-- Start: Empty Data -->
          <div class="data--empty text_center pt_4" v-else>
            Không có dữ liệu.
          </div>
          <!-- End: Empty Data -->
        </div>
      </div>
      <!-- End: Grid Content -->
    </div>

    <!-- ************** POPUP ************** -->
    <transition name="popup">
      <edit-popup
        v-if="showEdit === true"
        @closeAddEdit="showEdit = $event"
      ></edit-popup>
    </transition>
    <transition name="popup">
      <info-popup
        v-if="showInfo === true"
        @closeAddInfo="showInfo = $event"
        @openAddEdit="showEdit = $event"
        @userSelectEdit="userSelectEdit = $event"
      ></info-popup>
    </transition>
    <transition name="popup">
      <delete-popup
        v-if="showDeleteDialog === true && selected.length > 0"
        :selectedUIDs="selected"
        @closeDialog="showDeleteDialog = $event"
      ></delete-popup>
    </transition>
    <transition name="fade">
      <div
        v-if="showInfo === true || showEdit === true"
        class="backdrop position_fixed"
      ></div>
    </transition>
  </div>
</template>

<script src="./index.script.js"></script>

<style scoped lang="scss">
@import "./index.style";
</style>
