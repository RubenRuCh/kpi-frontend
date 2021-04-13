export default {
  async registerKpi(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const kpiData = {
      title: data.title,
      description: data.description,
      enabled: data.enabled,
      fields: data.fields,
    };

    const response = await fetch(`${backendUrl}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(kpiData),
    });

    const responseData = await response.json();

    if (!responseData.ok) {
      // error...
    }

    context.commit('addKpi', {
      ...kpiData,
      id: responseData.id,
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
      // ... more data if needed
    });
  },

  async loadKpis(context, data) {
    if (!data.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/kpis`);
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const kpis = [];

    for (const key in responseData) {
      const kpi = {
        id: responseData[key].id,
        title: responseData[key].title,
        description: responseData[key].description,
        enabled: responseData[key].enabled,
        fields: responseData[key].fields,
        createdAt: responseData[key].createdAt,
        updatedAt: responseData[key].updatedAt,
      };

      kpis.push(kpi);
    }

    context.commit('setKpis', kpis);
    context.commit('setFetchTimestamp');
  },
};
