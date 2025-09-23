import axios from '../api/axiosConfig';

export const getAllUsers = () => axios.get('/admin/users');
export const getUserById = (id) => axios.get(`/admin/users/${id}`);
export const createUser = (payload) => axios.post('/admin/users', payload);
export const updateUser = (id, payload) => axios.put(`/admin/users/${id}`, payload);
export const deleteUser = (id) => axios.delete(`/admin/users/${id}`);
