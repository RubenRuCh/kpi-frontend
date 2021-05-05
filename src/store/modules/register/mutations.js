export default {
  addRegister(state, payload) {
    state.registers.push(payload);
  },
  updateRegister(state, payload) {
    const isSameRegister = (register) => register.id === payload.id;
    const registerIndex = state.registers.findIndex(isSameRegister); // Get the index of updated register
    state.registers[registerIndex] = payload;
  },
  deleteRegister(state, payload) {
    const isSameRegister = (register) => register.id === payload.id;
    const registerIndex = state.registers.findIndex(isSameRegister); // Get the index of updated register
    state.registers.splice(registerIndex, 1);
  },
  setRegisters(state, payload) {
    state.registers = payload;
  },
  setFetchTimestamp(state) {
    state.lastFetch = new Date().getTime();
  },
};
