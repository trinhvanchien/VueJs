import SpinWordServices from "@/services/modules/spinWord.services";

const state = {
  word: {
    name: "",
    key: "",
    theme: ""
  },
  words: [],
  wordStatus: ""
};
const getters = {
  word: state => state.word,
  words: state => state.words,
  wordStatus: state => state.wordStatus
};
const mutations = {
  word_request: state => {
    state.wordStatus = "loading";
  },
  word_success: state => {
    state.wordStatus = "success";
  },
  word_error: state => {
    state.wordStatus = "error";
  },
  setDeleteWord: (state, payload) => {
    state.words = payload;
  },
  setWords: (state, payload) => {
    state.words = payload;
  },
  setWord: (state, payload) => {
    state.word = payload;
  }
};
const actions = {
  createNewWord: async ({ commit }, payload) => {
    try {
      let results;
      commit("word_request");
      if (payload.theme) {
        payload.theme = payload.theme._id;
      }
      await SpinWordServices.create(payload);
      results = await SpinWordServices.index();
      commit("setWords", results.data.data);
      commit("word_success");
    } catch (e) {
      commit("word_error");
      return e;
    }
  },
  deleteWord: async ({ commit, state }, payload) => {
    try {
      let results;
      commit("word_request");
      results = state.words
        .map(item => {
          if (item._id !== payload) {
            return item;
          }
        })
        .filter(item => item !== undefined);
      commit("setDeleteWord", results);
      await SpinWordServices.delete(payload);
      commit("word_success");
    } catch (e) {
      commit("word_error");
      return e;
    }
  },
  getAllWords: async ({ commit }) => {
    try {
      let results;
      commit("word_request");
      results = await SpinWordServices.index();
      commit("setWords", results.data.data);
      commit("word_success");
    } catch (e) {
      commit("word_error");
      return e;
    }
  },
  getWordById: async ({ commit }, payload) => {
    try {
      let results;
      commit("word_request");
      results = await SpinWordServices.getById(payload);
      commit("setWord", results.data.data);
      commit("word_success");
    } catch (e) {
      commit("word_error");
      return e;
    }
  },
  updateWord: async ({ commit }, payload) => {
    try {
      let results;
      commit("word_request");
      if (payload.theme) {
        payload.theme = payload.theme_id;
      }
      await SpinWordServices.update(payload._id, payload);
      results = await SpinWordServices.index();
      commit("setWords", results.data.data);
      commit("word_success");
    } catch (e) {
      commit("word_error");
      return e;
    }
  },
  setWordDefault: ({ commit }) => {
    commit("setWord", {
      name: "",
      key: "",
      theme: ""
    });
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
