// src/api/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const raw = localStorage.getItem('auth');
if (raw) {
  const { token } = JSON.parse(raw);
  if (token) config.headers.Authorization = `Bearer ${token}`;
}
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;


