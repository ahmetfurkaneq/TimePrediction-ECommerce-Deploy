import axios from '../api/axiosConfig';

export const getAllProducts = () => axios.get('/admin/products');
export const getProductById = (id) => axios.get(`/admin/products/${id}`);
export const createProduct = (payload) => axios.post('/admin/products', payload);
export const updateProduct = (id, payload) => axios.put(`/admin/products/${id}`, payload);
export const deleteProduct = (id) => axios.delete(`/admin/products/${id}`);
