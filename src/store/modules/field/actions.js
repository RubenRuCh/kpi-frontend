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

    const response = await fetch(`${backendUrl}`, {
      method: 'POST',
      body: JSON.stringify(fieldData),
    });

    const responseData = await response.json();

    if (!responseData.ok) {
      // error...
    }

    context.commit('addField', {
      ...fieldData,
      id: responseData.id,
      requiredText: responseData.required ? 'Sí' : 'No',
      // ... more data if needed
    });
  },

  async loadFields(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/fields`);
    const responseData = await response.json();

    console.log(responseData);

    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      throw error;
    }

    const fields = [];

    for (const key in responseData) {
      const field = {
        id: key,
        title: responseData[key].title,
        description: responseData[key].description,
        required: responseData[key].required,
        requiredText: responseData[key].required ? 'Sí' : 'No',
        type: responseData[key].type,
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
