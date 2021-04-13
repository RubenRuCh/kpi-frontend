export default {
  addField(state, payload) {
    state.fields.push(payload);
  },
  updateField(state, payload) {
    const isSameField = (field) => field.id === payload.id;
    const fieldIndex = state.fields.findIndex(isSameField); // Get the index of updated field
    state.fields[fieldIndex] = payload;
  },
  setFields(state, payload) {
    state.fields = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
