<template>
  <div class="member">
    <!-- START: HEADER CONTAIN SEARCH MEMBER -->
    <div class="header d_flex align_items_center justify_content_between mb_3">
      <div class="right">
        <div class="back" @click="redirectToPackage">Quay lại</div>
      </div>
      <div class="left position_relative">
        <input
          type="text"
          placeholder="Thêm thành viên"
          class="form_control"
          v-model="key"
          @keydown.enter="searchMembers"
        />

        <div
          class="result position_absolute px_2 py_2"
          v-if="isShowResultSearchMember === true"
        >
          <div v-if="!user" class="text_center py_2">
            Tài khoản bạn tìm kiếm không tồn tại
          </div>
          <div
            v-else
            class="account d_flex align_items_center justify_content_between"
          >
            <div class="info d_flex align_items_center justify_content_center">
              <div class="avatar mr_2">
                <div
                  v-if="user.imageAvatar"
                  class="size"
                  :style="{ backgroundImage: 'url(' + user.imageAvatar + ')' }"
                ></div>
                <div
                  v-else
                  class="default size d_flex align_items_center justify_content_center"
                >
                  <span>{{ user.name | getFirstLetter }}</span>
                </div>
              </div>
              <div class="email">{{ user.email }}</div>
            </div>
            <div class="action" @click="addMemberForPackage(user._id)">
              Thêm
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- END: HEADER CONTAIN SEARCH MEMBER -->

    <!-- START: SHOW INFORMATION PACKAGE -->
    <div
      class="py_3 d_flex align_items_center justify_content_center"
      v-if="this.$store.getters.statusMembership === 'loading'"
    >
      <span
        >Thông tin gói tài khoản đang được cập nhật, xin chờ trong giây lát
        ...</span
      >
    </div>
    <div class="information py_2 px_3" v-else>
      <div class="d_flex align_items_center">
        <div class="name w_50">
          <label>Tên gói tài khoản :</label
          ><span>{{ memberShipPackage.name }}</span>
        </div>
        <div class="total w_50" v-if="memberShipPackage.limit">
          <label>Số sự kiện được phép tạo trong 1 ngày :</label
          ><span>{{ memberShipPackage.limit.slot }}</span>
        </div>
      </div>
      <div class="d_flex align_items_center">
        <div class="limit--post w_50" v-if="memberShipPackage.limit">
          <label>Số bài viết được phép đăng trong 1 ngày :</label>
          <span>{{ memberShipPackage.limit.post }}</span>
        </div>
        <div class="limit--campaign w_50" v-if="memberShipPackage.limit">
          <label>Số kế hoạch được phép tạo trong 1 ngày :</label>
          <span>{{ memberShipPackage.limit.campaign }}</span>
        </div>
      </div>
      <div class="d_flex align_items_center">
        <div class="now w_50" v-if="memberShipPackage.members">
          <label>Tổng số thành viên hiện tại của gói</label>
          <span>{{ memberShipPackage.members.length }}</span>
        </div>
        <div class="slot w_50" v-if="memberShipPackage.limit">
          <label>Số lượng còn trống trong gói :</label>
          <span>vô hạn</span>
        </div>
      </div>
    </div>
    <!-- END: SHOW INFORMATION PACKAGE -->

    <!-- START: TABLE CONTAIN LIST MEMBER -->
    <div class="body mt_2">
      <div class="content--body">
        <div class="table-container" role="table" aria-label="Destinations">
          <div class="flex-table header" role="rowgroup">
            <div class="flex-row first" role="columnheader">Tên thành viên</div>
            <div class="flex-row" role="columnheader">email</div>
            <div class="flex-row" role="columnheader">số điện thoại</div>
            <div class="flex-row" role="columnheader">Hành động</div>
          </div>
          <div v-if="members && members.length === 0" class="empty text_center">
            Vui lòng thêm ít nhất 1 thành viên vào gói tài khoản
          </div>
          <div v-else>
            <member
              v-for="(item, index) in members"
              :key="index"
              :item="item"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- START: TABLE CONTAIN LIST MEMBER -->
  </div>
</template>
<script>
import Member from "./components";
export default {
  components: {
    Member
  },
  data() {
    return {
      key: "",
      isShowResultSearchMember: false
    };
  },
  computed: {
    user() {
      return this.$store.getters.usersFilter[0];
    },
    members() {
      return this.$store.getters.membersPackage;
    },
    memberShipPackage() {
      return this.$store.getters.membershipPackage;
    }
  },
  async created() {
    const id = this.$route.params.id;
    await this.$store.dispatch("getInfoMemberShipPackage", id);
  },
  methods: {
    async addMemberForPackage(val) {
      let dataSender;
      this.members.push(val);

      dataSender = {
        _id: this.$route.params.id,
        members: this.members
      };
      await this.$store.dispatch("updateMemberShipPackage", dataSender);
      this.isShowResultSearchMember = false;
    },
    searchMembers() {
      this.$store.dispatch("searchUserByKey", this.key);
      this.isShowResultSearchMember = true;
    },
    redirectToPackage() {
      this.$router.go(-1);
    }
  },
  filters: {
    getFirstLetter(string) {
      if (string === undefined) {
        return;
      }
      return string.charAt(0).toUpperCase();
    }
  }
};
</script>
<style lang="scss" scoped>
@import "./index.style";
</style>
