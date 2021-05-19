import { requestOptions } from '../../../helpers';
import { handleResponse } from '../../../helpers/handle-response';
import store from '@/store/index.js';

const backendUrl = store.getters.backendUrl + '/roles';
console.log(backendUrl);

export const roleService = {
  getAllRoles,
  getAllSubroles,
};

async function getAllRoles() {
  const response = await fetch(`${backendUrl}`, requestOptions.get());

  return handleResponse(response);
}

async function getAllSubroles() {
  const response = await fetch(`${backendUrl}/services`, requestOptions.get());

  return handleResponse(response);
}
