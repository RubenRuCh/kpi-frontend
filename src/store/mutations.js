export default {
  updateConf(state, payload) {
    const isSameConf = (conf) => conf.id === payload.id;
    const confIndex = state.conf.findIndex(isSameConf); // Get the index of updated config parameter
    state.conf[confIndex].value = payload.value;
  },
  setConf(state, payload) {
    state.conf = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
