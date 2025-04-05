import api from './api';

const baseURL = '/users';

export const getUsers = (page = 1, limit = 10) => api.get(`${baseURL}?page=${page}&limit=${limit}`);

export const getUserById = (id) => api.get(`${baseURL}/${id}`);

export const createUser = (data) => api.post(baseURL, data);

export const updateUser = (id, data) => api.put(`${baseURL}/${id}`, data);

export const deleteUser = (id) => api.delete(`${baseURL}/${id}`);

export const loginUser = (credentials) => api.post('/users/login', credentials);
