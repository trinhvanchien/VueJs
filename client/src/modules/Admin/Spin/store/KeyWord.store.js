import WordServices from "../../../../services/modules/spinWord.services";

export default {
  state: {
    words: [],
    currentPagesWord: 1,
    totalPagesWord: 1,
    pageSizeWord: 10,
    searchKeyWord: "",
    statusWord: "",
    wordsObj: {
      name: "",
      key: "",
      theme: ""
    }
  },
  getters: {
    words: state => state.words,
    currentPagesWord: state => state.currentPagesWord,
    totalPagesWord: state => state.totalPagesWord,
    pageSizeWord: state => state.pageSizeWord,
    searchKeyWord: state => state.searchKeyWord,
    wordsObj: state => state.wordsObj,
    statusWord: state => state.statusWord
  },
  mutations: {
    setWords: (state, payload) => {
      state.words = payload;
    },
    setTotalPagesWord: (state, payload) => {
      state.totalPagesWord = payload;
    },
    setCurrentPageWord: (state, payload) => {
      state.currentPagesWord = payload;
      if (state.currentPagesWord < 1) {
        state.currentPagesWord = 1;
      } else if (state.currentPagesWord > state.totalPagesWord) {
        state.currentPagesWord = state.totalPagesWord;
      }
    },
    setPageSizeWord: (state, payload) => {
      state.pageSizeWord = payload;
    },
    setWordObj: (state, payload) => {
      state.wordsObj = payload;
    },
    setDeleteWord: (state, payload) => {
      state.words = payload;
    },
    showStatusWords: (state, payload) => {
      state.statusWord = payload;
    },
    updateStatusWords: (state, payload) => {
      state.statusWord = payload;
    },
    setSearchKeyWords: (state, payload) => {
      state.searchKeyWord = payload;
    }
  },
  actions: {
    getWords: async ({ commit }) => {
      let result;
      result = await WordServices.index();
      await commit("setWords", result.data.data.data);
      console.log("data get", result.data.data.data);
      await commit("setTotalPagesWord", result.data.data.totalPages);
    },
    setPageSizeWord: async ({ commit, state }, payload) => {
      commit("setCurrentPageWord", 1);
      commit("setPageSizeWord", parseInt(payload));
      let result;
      let data = {
        currentPages: state.currentPagesWord,
        pageSize: state.pageSizeWord,
        searchKey: state.searchKeyWord
      };
      result = await WordServices.indexOptions(data);
      await commit("setWords", result.data.data.data);
      await commit("setTotalPagesWord", result.data.data.totalPages);
    },
    createWords: async ({ commit }, payload) => {
      let result;
      await WordServices.create(payload);
      console.log("data insert", payload);
      commit("showStatusWords", "insert");
      setTimeout(() => {
        commit("updateStatusWords", null);
      }, 1000);
      result = await WordServices.index();
      await commit("setWords", result.data.data.data);
      console.log("after insert", result.data.data.data);
      await commit("setCurrentPageWord", 1);
      await commit("setTotalPagesWord", result.data.data.totalPages);
    },
    resetWords: ({ commit }) => {
      commit("setWordObj", {
        name: "",
        key: "",
        theme: ""
      });
    },
    deleteWord: async ({ commit, state }, payload) => {
      let result;
      result = state.words
        .map(item => {
          if (item._id !== payload) {
            return item;
          }
        })
        .filter(item => item !== undefined);
      commit("setDeleteWord", result);
      await WordServices.delete(payload);
      commit("showStatusWords", "delete");
      setTimeout(() => {
        commit("updateStatusWords", null);
      }, 1000);
      result = await WordServices.index();
      await commit("setCurrentPageWord", state.currentPage);
      await commit("setWords", result.data.data.data);
      await commit("setPageSizeWord", 10);
      await commit("setTotalPagesWord", result.data.data.totalPages);
    },
    searchWords: async ({ commit, state }, payload) => {
      commit("setSearchKeyWords", payload);
      commit("setCurrentPageWord", 1);
      try {
        let result;
        let data = {
          currentPages: state.currentPagesWord,
          pageSize: state.pageSizeWord,
          searchKey: state.searchKeyWord
        };
        result = await WordServices.indexOptions(data);
        commit("setWords", result.data.data.data);
        commit("setTotalPagesWord", result.data.data.totalPages);
      } catch (e) {
        return e;
      }
    },
    nextOrPrevPageWord: async ({ commit, state }, payload) => {
      let pageNum = state.currentPagesWord + payload;
      commit("setCurrentPageWord", pageNum);
      try {
        let result;
        let data = {
          currentPages: state.currentPagesWord,
          pageSize: state.pageSizeWord,
          searchKey: state.searchKeyWord
        };
        result = await WordServices.indexOptions(data);
        commit("setWords", result.data.data.data);
        commit("setTotalPagesWord", result.data.data.totalPages);
      } catch (e) {
        return e;
      }
    },
    getIdWord: async ({ commit }, payload) => {
      let result;
      result = await WordServices.getById(payload._id);
      await commit("setWordObj", result.data.data);
      console.log("get by id", result.data.data);
    },
    updateWord: async ({ commit }, payload) => {
      let result;
      await WordServices.update(payload._id, payload);
      commit("showStatusWords", "update");
      setTimeout(() => {
        commit("updateStatusWords", null);
      }, 1000);
      result = await WordServices.index();
      await commit("setWords", result.data.data.data);
      console.log("after update", result.data.data.data);
      await commit("setCurrentPageWord", 1);
      await commit("setTotalPagesWord", result.data.data.totalPages);
    }
  }
};
