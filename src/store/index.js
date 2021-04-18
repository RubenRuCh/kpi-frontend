import { createStore } from "vuex";
import rootGetters from "./getters.js";
import rootMutations from "./mutations.js";
import rootActions from "./actions.js";

// Vuex modules
import kpiModule from "./modules/kpi/index.js";
import fieldModule from "./modules/field/index.js";
import authModule from "./modules/auth/index.js";

const store = createStore({
  modules: {
    kpis: kpiModule,
    fields: fieldModule,
    auth: authModule,
  },
  getters: rootGetters,
  mutations: rootMutations,
  actions: rootActions,

  state() {
    return {
      backendUrl: "http://localhost:8080/api",
    };
  },
});

export default store;
