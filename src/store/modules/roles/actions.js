import { requestOptions } from '../../../helpers';
const backendUrl = 'http://localhost:8080/api/roles';
import { handleResponse } from '../../../helpers/handle-response';

export const roleService = {
    getAllRoles,
    getAllSubroles
}

async function getAllRoles() {
    const response = await fetch(`${backendUrl}`, requestOptions.get())

    return handleResponse(response);
}

async function getAllSubroles() {
    const response = await fetch(`${backendUrl}/services`, requestOptions.get());

    return handleResponse(response);
}