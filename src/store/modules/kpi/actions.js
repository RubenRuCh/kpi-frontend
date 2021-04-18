export default {
  async registerKpi(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const kpiData = {
      title: data.title,
      description: data.description,
      enabled: true,
      fields: data.fields,
    };

    const response = await fetch(`${backendUrl}/kpis`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kpiData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to create kpi: ${data.title}`
      );
      throw error;
    }

    context.commit("addKpi", {
      ...kpiData,
      id: responseData.id,
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
      // ... more data if needed
    });
  },

  async updateKpi(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const kpiData = {
      id: data.id,
      title: data.title,
      description: data.description,
      enabled: true,
      fields: data.fields,
    };

    const response = await fetch(`${backendUrl}/kpis/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kpiData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to update kpi nº ${data.id}`
      );
      throw error;
    }

    context.commit("updateKpi", {
      ...kpiData,
      updatedAt: new Date(),
      // ... more data if needed
    });
  },

  async enableKpi(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const kpiData = {
      ...data,
    };

    const response = await fetch(`${backendUrl}/kpis/${data.id}/enable`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kpiData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to enable kpi nº ${data.id}`
      );
      throw error;
    }

    context.commit("enableKpi", {
      ...kpiData,
      // ... more data if needed
    });
  },

  async disableKpi(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const kpiData = {
      ...data,
    };

    const response = await fetch(`${backendUrl}/kpis/${data.id}/disable`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(kpiData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to disable kpi nº ${data.id}`
      );
      throw error;
    }

    context.commit("disableKpi", {
      ...kpiData,
      // ... more data if needed
    });
  },

  async loadKpis(context, data) {
    if (!data.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/kpis`);
    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(responseData.message || "Failed to fetch kpis!");
      throw error;
    }

    const kpis = [];

    for (const key in responseData) {
      const fields = [];

      // First format data from field and kpi_field tables
      for (const fieldData of responseData[key].fields) {
        const field = {
          id: fieldData.id,
          title: fieldData.title,
          description: fieldData.description,
          required: fieldData.required,
          requiredText: fieldData.required ? "Sí" : "No",
          type: fieldData.type,
          values: fieldData.values,
          value: fieldData.kpi_field.value,
          maxlength: fieldData.maxlength,
          createdAt: fieldData.createdAt,
          updatedAt: fieldData.updatedAt,
        };

        // Make sure we save number value
        if (fieldData.type == "number") {
          field.value = parseInt(field.value);
        }

        fields.push(field);
      }

      const kpi = {
        id: responseData[key].id,
        title: responseData[key].title,
        description: responseData[key].description,
        enabled: responseData[key].enabled,
        fields: fields,
        createdAt: responseData[key].createdAt,
        updatedAt: responseData[key].updatedAt,
      };

      kpis.push(kpi);
    }

    context.commit("setKpis", kpis);
    context.commit("setFetchTimestamp");
  },
};
