export default {
  registers(state) {
    return state.registers;
  },
  hasRegisters(state) {
    return state.registers && state.registers.length > 0;
  },
  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) return true;

    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
