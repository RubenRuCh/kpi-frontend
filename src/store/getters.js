export default {
  backendUrl(state) {
    return state.backendUrl;
  },

  conf(state) {
    return state.conf;
  },

  getConfByTitle(state) {
    return (title) =>
      state.conf.find((configParam) => configParam.title == title);
  },

  getDependencieItemByConfTitle(_state, getters) {
    return (title) => {
      const confParameter = getters.getConfByTitle(title);
      var dependencieItem = null;

      if (!confParameter.dependencie) return dependencieItem;

      switch (confParameter.dependencie) {
        case 'fields':
          dependencieItem = getters['fields/getFieldById'](confParameter.value);
          break;
        // More dependencies types if needed
      }

      return dependencieItem;
    };
  },

  shouldUpdate(state) {
    const lastFetch = state.lastFetch;

    if (!lastFetch) return true;

    const currentTimeStamp = new Date().getTime();

    return (currentTimeStamp - lastFetch) / 1000 > 60;
  },
};
