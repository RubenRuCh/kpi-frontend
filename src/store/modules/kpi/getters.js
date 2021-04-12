export default {
  kpis(state) {
    return state.kpis;
  },
  enabledKpis(state) {
    return state.kpis.filter((kpi) => kpi.enabled);
  },
  disabledKpis(state) {
    return state.kpis.filter((kpi) => !kpi.enabled);
  },
  hasKpis(state) {
    return state.kpis && state.kpis.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) return true;

    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
