import SpinWordServices from "@/services/modules/spinWord.services";

const state = {
  word: {
    name: "",
    key: "",
    theme: ""
  },
  wordList: [],
  wordStatus: "",
  selectedTheme: "",
  currentWordPage: 1,
  totalWordPages: 1,
  wordPageSize: 10,
  wordSearchKey: ""
};
const getters = {
  word: state => state.word,
  wordList: state => state.wordList,
  wordStatus: state => state.wordStatus,
  selectedTheme: state => state.selectedTheme,
  currentWordPage: state => state.currentWordPage,
  totalWordPages: state => state.totalWordPages,
  wordPageSize: state => state.wordPageSize,
  wordSearchKey: state => state.wordSearchKey
};
const mutations = {
  request_init: state => {
    state.wordStatus = "loading";
  },
  request_success: state => {
    state.wordStatus = "success";
  },
  request_error: state => {
    state.wordStatus = "error";
  },
  setDeleteWord: (state, payload) => {
    state.wordList = payload;
  },
  setWordList: (state, payload) => {
    state.wordList = payload;
  },
  setWord: (state, payload) => {
    state.word = payload;
  },
  setSelectedTheme: (state, payload) => {
    state.selectedTheme = payload;
  },
  setWordSearchKey: (state, payload) => {
    state.wordSearchKey = payload;
  },
  setCurrentWordPage: (state, payload) => {
    state.currentWordPage = payload;
    if (state.currentWordPage < 1) {
      state.currentWordPage = 1;
    } else if (state.currentWordPage > state.totalWordPages) {
      state.currentWordPage = state.totalWordPages;
    }
  },
  setTotalWordPages: (state, payload) => {
    state.totalWordPages = payload;
  },
  setWordPageSize: (state, payload) => {
    state.wordPageSize = payload;
  }
};
const actions = {
  createNewWord: async ({ commit }, payload) => {
    try {
      let results;
      commit("request_init");
      if (payload.theme) {
        payload.theme = payload.theme._id;
      }
      await SpinWordServices.create(payload);
      results = await SpinWordServices.index();
      commit("setWordList", results.data.data.data);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  deleteWord: async ({ commit, state }, payload) => {
    try {
      let results;
      commit("request_init");
      results = state.wordList
        .map(item => {
          if (item._id !== payload) {
            return item;
          }
        })
        .filter(item => item !== undefined);
      commit("setDeleteWord", results);
      await SpinWordServices.delete(payload);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  index: async ({ commit }) => {
    try {
      let results;
      commit("request_init");
      results = await SpinWordServices.index();
      commit("setWordList", results.data.data.data);
      commit("setTotalWordPages", results.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  getWordById: async ({ commit }, payload) => {
    try {
      let results;
      commit("request_init");
      results = await SpinWordServices.getById(payload);
      commit("setWord", results.data.data);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  updateWord: async ({ commit }, payload) => {
    try {
      let results;
      commit("request_init");
      if (payload.theme) {
        payload.theme = payload.theme_id;
      }
      await SpinWordServices.update(payload._id, payload);
      results = await SpinWordServices.index();
      commit("setWordList", results.data.data.data);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  setWordDefault: ({ commit }) => {
    commit("setWord", {
      name: "",
      key: "",
      theme: ""
    });
  },
  updateSelectedTheme: ({ commit }, payload) => {
    commit("setSelectedTheme", payload);
  },
  nextOrPrevPage: async ({ commit }, payload) => {
    let pageNum = state.currentWordPage + payload;
    commit("setCurrentWordPage", pageNum);
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.wordSearchKey,
        currentPage: state.currentWordPage,
        pageSize: state.wordPageSize
      };
      result = await SpinWordServices.indexOptions(data);
      commit("setWordList", result.data.data.data);
      commit("setTotalWordPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  jumpToPage: async ({ commit }, payload) => {
    commit("setCurrentWordPage", payload);
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.wordSearchKey,
        currentPage: state.currentWordPage,
        pageSize: state.wordPageSize
      };
      result = await SpinWordServices.indexOptions(data);
      commit("setWordList", result.data.data.data);
      commit("setTotalWordPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  search: async ({ commit }, payload) => {
    commit("setCurrentWordPage", 1);
    commit("setWordSearchKey", payload);
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.wordSearchKey,
        currentPage: state.currentWordPage,
        pageSize: state.wordPageSize
      };
      result = await SpinWordServices.indexOptions(data);
      commit("setWordList", result.data.data.data);
      commit("setTotalWordPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  },
  setWordPageSize: async ({ commit }, payload) => {
    commit("setCurrentWordPage", 1);
    commit("setWordPageSize", parseInt(payload));
    try {
      let result;
      commit("request_init");
      let data = {
        searchKey: state.wordSearchKey,
        currentPage: state.currentWordPage,
        pageSize: state.wordPageSize
      };
      result = await SpinWordServices.indexOptions(data);
      commit("setWordList", result.data.data.data);
      commit("setTotalWordPages", result.data.data.totalPages);
      commit("request_success");
    } catch (e) {
      commit("request_error");
      return e;
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
