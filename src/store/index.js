import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    tokenExpire: "",
    isLoading: false,
    tagGroup: [
      {
        id: 1,
        typeName: "行政",
        color: "#f7a5b6",
      },
      {
        id: 2,
        typeName: "展覽",
        color: "#77c7ee",
      },
      {
        id: 3,
        typeName: "表演",
        color: "#7ab878",
      },
      {
        id: 4,
        typeName: "播映",
        color: "#aa8ff5",
      },
      {
        id: 5,
        typeName: "學術",
        color: "#e5976c",
      },
    ],
  },
  actions: {
    //loading
    loadingHandler(context, payload) {
      context.commit("LOADING", payload);
    },
  },
  mutations: {
    LOADING(state, payload) {
      state.isLoading = payload;
    },
    SAVE_TOKEN(state, data) {
      state.token = data;
      window.localStorage.setItem("Token", data);
    },
    SAVE_TOKEN_EXPIRE(state, data) {
      state.tokenExpire = data;
      window.localStorage.setItem("TokenExpire", data);
    },
  },

  modules: {},
});
