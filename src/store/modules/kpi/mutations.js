export default {
  addKpi(state, payload) {
    state.kpis.push(payload);
  },
  updateKpi(state, payload) {
    const isSameKpi = (kpi) => kpi.id === payload.id;
    const kpiIndex = state.kpis.findIndex(isSameKpi); // Get the index of updated kpi
    state.kpis[kpiIndex] = payload;
  },
  enableKpi(state, payload) {
    const kpiId = payload.id;
    for (const kpi of state.kpis) {
      if (kpi.id == kpiId) kpi.enabled = true;
    }
  },
  disableKpi(state, payload) {
    const kpiId = payload.id;
    for (const kpi of state.kpis) {
      if (kpi.id == kpiId) kpi.enabled = false;
    }
  },
  setKpis(state, payload) {
    state.kpis = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
