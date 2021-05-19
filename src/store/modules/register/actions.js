import { requestOptions } from '../../../helpers';
import { localStorageService } from '@/store/modules/UserStorage/actions';

export default {
  async registerRegister(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const registerData = {
      kpiId: data.kpiId,
      value: data.value,
      columns: data.columns,
    };

    /* Create Registers */
    const response = await fetch(`${backendUrl}/registers`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorageService.currentUserValue.token},
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
      createdAt: responseData.createdAt,
      updatedAt: responseData.updatedAt,
      // ... more data if needed
    });
  },

  /* Update Registers */
  async updateRegister(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const registerData = {
      id: data.id,
      kpiId: data.kpiId,
      value: data.value,
      columns: data.columns,
    };

    const response = await fetch(`${backendUrl}/registers/${data.id}`, {
      method: "PUT",
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorageService.currentUserValue.token},
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
      updatedAt: new Date(),
      // ... more data if needed
    });
  },

  /* Delete Registers */
  async deleteRegister(context, data) {
    const backendUrl = context.rootGetters.backendUrl;

    const registerData = {
      id: data.id,
    };

    const response = await fetch(`${backendUrl}/registers/${data.id}`, {
      method: "DELETE",
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorageService.currentUserValue.token},
      body: JSON.stringify(registerData),
    });

    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(
        response.message || `Failed to delete register nº ${data.id}`
      );
      throw error;
    }

    context.commit("deleteRegister", {
      ...registerData,
      // ... more data if needed
    });
  },

  /* Get Registers */
  async loadRegisters(context, data) {
    if (!data.forceRefresh && !context.getters.shouldUpdate) return;

    const backendUrl = context.rootGetters.backendUrl;

    const response = await fetch(`${backendUrl}/registers`, requestOptions.get());
    
    const responseData = await response.json();

    if (!response.ok || !responseData) {
      const error = new Error(responseData.message || "Failed to fetch registers!");
      throw error;
    }

    const registers = [];
    let kpiId = null;

    // Iterate over every register
    for (const key in responseData) {
      const columns = [];

      // First format data from columns and register_values tables
      for (const columnData of responseData[key].kpi_fields) {
        kpiId = columnData.kpiId;

        const field = context.rootGetters['fields/fields'].find((field) => field.id == columnData.fieldId);

        const column = {
          ...field,
          id: columnData.fieldId,
          value: columnData.value,
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
