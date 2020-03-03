<template>
  <div class="account--mobile">
    <!-- START: SEARCH -->
    <div class="search px_2 py_3">
      <div class="search__wrap">
        <input type="text" placeholder="Nhập email, số điện thoại" />
        <button>Tìm kiếm</button>
      </div>
    </div>
    <!-- END: SEARCH -->
    <!-- START: BODY -->
    <div class="body px_2">
      <div class="card">
        <div
          class="card_body d_flex align_items_center justify_content_between"
        >
          <div class="avatar">
            <div class="av default">
              <img src="" alt="" />
            </div>
            <div class="av default">
              <span>L</span>
            </div>
          </div>
          <div class="info">
            <div class="name">
              <span class="desc">Tên người dùng :</span> <span>Le Khang</span>
            </div>
            <div class="email">
              <span class="desc">Email người dùng :</span> <span>Le Khang</span>
            </div>
            <div class="phone">
              <span class="desc">Số điện thoại :</span> <span>Le Khang</span>
            </div>
            <div class="package">
              <span class="desc">Gói tài khoản :</span> <span>Le Khang</span>
            </div>
            <div class="status">
              <span class="desc">Trạng thái hoạt động :</span>
              <span>Le Khang</span>
            </div>
            <div class="role">
              <span class="desc">Phân quyền :</span> <span>Le Khang</span>
            </div>
            <div class="limit">
              <span class="desc">Giới hạn tài khoản :</span>
              <span>Le Khang</span>
            </div>
            <div class="server">
              <span class="desc">Server hoạt động :</span> <span>Le Khang</span>
            </div>
            <div class="started">
              <span class="desc">Ngày tạo :</span> <span>Le Khang</span>
            </div>
            <div class="expire">
              <span class="desc">Ngày hết hạn :</span> <span>Le Khang</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: BODY -->
    <button @click="openModal">open modal mobile</button>
    <modal-user-info />
  </div>
</template>
<script>
import ModalUserInfo from "../components/MobileModalUserInfo";
export default {
  components: {
    ModalUserInfo
  },
  methods: {
    openModal() {
      this.$modalMobile.show({ name: "modal-user-info-mobile" });
    }
  }
};
</script>
