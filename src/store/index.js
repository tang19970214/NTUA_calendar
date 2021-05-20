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
        color: "#EE6B6B",
      },
      {
        id: 2,
        typeName: "展覽",
        color: "#E28F15",
      },
      {
        id: 3,
        typeName: "表演",
        color: "#B600F5",
      },
      {
        id: 4,
        typeName: "播映",
        color: "#9C2626",
      },
      {
        id: 5,
        typeName: "學術",
        color: "#2093D3",
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
