<template>
  <div class="content">
    <div class="content--header">
      <div class="d_flex mb_3">
        <div class="left">
          <div class="d_flex">
            <button class="btn btn_success" @click="createNewPost">
              Viết bài đăng mới
            </button>
            <form class="ml_3" role="search-post">
              <input class="form_control" type="text" placeholder="Tìm kiếm" />
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="content--body">
      <div class="table-container" role="table" aria-label="Destinations">
        <div class="flex-table header" role="rowgroup">
          <div class="flex-row first" role="columnheader">Nội dung</div>
          <div class="flex-row title--images" role="columnheader">Hình ảnh</div>
          <div class="flex-row name--user" role="columnheader">Người tạo</div>
          <div class="flex-row" role="columnheader">Hành động</div>
        </div>
        <div v-if="this.$store.getters.statusLib === 'loading'">
          <loading-component />
        </div>
        <div v-else v-for="(item, index) in allPostLibraries" :key="index">
          <item :item="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./item";
export default {
  components: {
    Item
  },
  data() {
    return {
      isFilterTime: "Không sắp xếp"
    };
  },
  computed: {
    newPostLibraries() {
      return this.$store.getters.newPostLibraries;
    },
    allPostLibraries() {
      const resutl = this.$store.getters.allPostLibraries;
      return resutl.reverse();
    }
  },
  async created() {
    await this.$store.dispatch("getAllPostLibraries");
  },
  methods: {
    async createNewPost() {
      const dataSender = {};
      await this.$store.dispatch("createNewPostLibraries", dataSender);
      this.$router.push({
        name: "libraries_details",
        params: { id: this.newPostLibraries._id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$table-header: #ed1c24;
$table-header-border: #fff6f4;
$table-border: #d9d9d9;
$row-bg: #f4f2f1;

.table-container {
  display: block;
  margin: auto;
  width: 100%;
  max-width: 100%;
}

.flex-table {
  display: flex;
  flex-flow: row wrap;
  border-left: solid 1px $table-border;
  transition: 0.5s;
  &:first-of-type {
    border-top: solid 1px $table-header-border;
    border-left: solid 1px $table-header-border;
  }
  &:first-of-type .flex-row {
    background: $table-header;
    color: white;
    border-color: $table-header-border;
  }
  &.row:nth-child(odd) .flex-row {
    background: $row-bg;
  }
  &:hover {
    background: #f5f5f5;
    transition: 500ms;
  }
  .flex-row {
    overflow: hidden;
    width: calc(100% / 4);
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.5em 0.5em;
    border-right: solid 1px $table-border;
    border-bottom: solid 1px $table-border;
  }
}
// ====================== RESPONSIVE

@media screen and (max-width: 1050px) {
  .flex-table {
    .flex-row {
      width: 33.333%;
    }
    .title--images {
      display: none;
    }
  }
}

@media screen and (max-width: 920px) {
  .flex-table {
    .flex-row {
      width: 50%;
    }
    .name--user {
      display: none;
    }
  }
}
</style>
