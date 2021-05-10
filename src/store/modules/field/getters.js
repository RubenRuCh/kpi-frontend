export default {
  fields(state) {
    return state.fields;
  },
  getFieldById(state) {
    return (id) => state.fields.find((field) => field.id === id);
  },
  requiredFields(state) {
    return state.fields.filter((field) => field.required);
  },
  unrequiredFields(state) {
    return state.fields.filter((field) => !field.required);
  },
  hasFields(state) {
    return state.fields && state.fields.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) return true;

    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
