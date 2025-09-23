import axios from './axiosConfig';

export const getAllProducts = () =>
  axios.get(`/product/allProducts`);

export const getProductsByCategory = (category) =>
  axios.get(`/product/category/${category}`);

export const purchaseProduct = (id) =>
  axios.post(`/product/${id}/purchase`);

export const getCategories = () =>
  axios.get(`/product/categories`);
