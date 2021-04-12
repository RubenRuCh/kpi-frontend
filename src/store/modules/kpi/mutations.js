export default {
  addKpi(state, payload) {
    state.kpis.push(payload);
  },
  setKpis(state, payload) {
    state.kpis = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
