export default {
  async updateConf(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const confParameterData = {
      id: data.id,
      value: data.value,
    };

    const response = await fetch(`${backendUrl}/conf/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(confParameterData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to update conf parameter nº ${data.id}`
      );
      throw error;
    }

    context.commit('updateConf', {
      ...confParameterData,
      updatedAt: new Date(),
      // ... more data if needed
    });
  },

  async loadConf(context, data) {
    if (!data.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/conf`);
    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(responseData.message || 'Failed to fetch conf');
      throw error;
    }

    const conf = [];

    for (const key in responseData) {
      const confParameter = {
        id: responseData[key].id,
        title: responseData[key].title,
        description: responseData[key].description,
        value: responseData[key].value,
        dependencie: responseData[key].dependencie,
      };

      conf.push(confParameter);
    }

    context.commit('setConf', conf);
    context.commit('setFetchTimestamp');
  },
};
