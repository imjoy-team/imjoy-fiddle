import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    octokit: null
  },
  mutations: {
    setOctokit(state, octokit) {
      state.octokit = octokit;
    }
  }
});
