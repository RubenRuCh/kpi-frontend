import { requestOptions } from '../../../helpers';
import { handleResponse } from '../../../helpers/handle-response';

const backendUrl = 'http://localhost:8080/api/users';

export const userService = {
    createUser,
    getAllUsers,
    getById,
    updateUser,
    deleteUser
}

async function createUser(params) {
    const response = await fetch(`${backendUrl}`, requestOptions.post(params));

    return handleResponse(response);
}

async function getAllUsers() {
    const response = await fetch(`${backendUrl}`, requestOptions.get())

    return handleResponse(response);
}

async function getById(id) {
    const response = await fetch(`${backendUrl}/${id}`, requestOptions.get());

    return handleResponse(response);
}

async function updateUser(id, params) {
    const response = await fetch(`${backendUrl}/update/${id}`, requestOptions.post(params));

    return handleResponse(response);

}

async function deleteUser(id) {
    const response = await fetch(`${backendUrl}/delete/${id}`, requestOptions.delete());
    return response.status;
} 