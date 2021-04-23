import getters from "./getters.js";
import mutations from "./mutations.js";
import actions from "./actions.js";

export default {
  namespaced: true,
  getters,
  mutations,
  actions,

  state() {
    return {
      lastFetch: null,
      registers: [],
    };
  },
};
