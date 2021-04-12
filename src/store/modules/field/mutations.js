export default {
  addField(state, payload) {
    state.fields.push(payload);
  },
  setFields(state, payload) {
    state.fields = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
