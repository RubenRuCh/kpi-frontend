export default {
  async registerField(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const fieldData = {
      title: data.title,
      description: data.description,
      required: data.required,
      type: data.type,
      values: data.values,
      maxlength: data.maxlength,
    };

    const response = await fetch(`${backendUrl}/fields`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to create field: ${data.title}`
      );
      throw error;
    }

    context.commit('addField', {
      ...fieldData,
      id: responseData.id,
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
      requiredText: responseData.required ? 'Sí' : 'No',
      value: data.type == 'number' ? 0 : '',
      // ... more data if needed
    });
  },

  async updateField(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const fieldData = {
      id: data.id,
      title: data.title,
      description: data.description,
      required: data.required,
      type: data.type,
      values: data.values,
      maxlength: data.maxlength,
    };

    const response = await fetch(`${backendUrl}/fields/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(fieldData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to update field nº ${data.id}`
      );
      throw error;
    }

    context.commit('updateField', {
      ...fieldData,
      updatedAt: new Date(),
      requiredText: fieldData.required ? 'Sí' : 'No',
      // ... more data if needed
    });
  },

  async loadFields(context, data) {
    if (!data.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/fields`);
    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(responseData.message || 'Failed to fetch fields');
      throw error;
    }

    const fields = [];

    for (const key in responseData) {
      const field = {
        id: responseData[key].id,
        title: responseData[key].title,
        description: responseData[key].description,
        required: responseData[key].required,
        requiredText: responseData[key].required ? 'Sí' : 'No',
        type: responseData[key].type,
        value: responseData[key].type == 'number' ? 0 : '',
        values: responseData[key].values,
        maxlength: responseData[key].maxlength,
        createdAt: responseData[key].createdAt,
        updatedAt: responseData[key].updatedAt,
      };

      fields.push(field);
    }

    context.commit('setFields', fields);
    context.commit('setFetchTimestamp');
  },
};
