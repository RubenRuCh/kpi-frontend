export default {
  async registerRegister(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const registerData = {
      value: data.value,
      columns: data.columns,
    };

    console.log(data);

    const response = await fetch(`${backendUrl}/registers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to create register: ${data.title}`
      );
      throw error;
    }

    context.commit("addRegister", {
      ...registerData,
      id: responseData.id,
      kpiId: data.kpiId,
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
      // ... more data if needed
    });
  },

  async updateRegister(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const registerData = {
      id: data.id,
      value: data.value,
      columns: data.columns,
    };

    const response = await fetch(`${backendUrl}/registers/${data.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registerData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to update register nº ${data.id}`
      );
      throw error;
    }

    context.commit("updateRegister", {
      ...registerData,
      kpiId: data.kpiId,
      updatedAt: new Date(),
      // ... more data if needed
    });
  },

  async loadRegisters(context, data) {
    if (!data.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/registers`);
    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(responseData.message || "Failed to fetch registers!");
      throw error;
    }

    const registers = [];
    var kpiId = null;

    // Iterate over every register
    for (const key in responseData) {
      const columns = [];

      // First format data from columns and register_values tables
      for (const columnData of responseData[key].kpi_fields) {
        if(!kpiId) kpiId = columnData.kpiId;

        const column = {
          id: columnData.id,
          label: columnData.value,
          value_label: columnData.register_value.value_label,
        };

        columns.push(column);
      }

      const register = {
        id: responseData[key].id,
        kpiId: kpiId,
        value: responseData[key].value,
        columns: columns,
        createdAt: responseData[key].createdAt,
        updatedAt: responseData[key].updatedAt,
      };

      registers.push(register);
    }

    context.commit("setRegisters", registers);
    context.commit("setFetchTimestamp");
  },
};
