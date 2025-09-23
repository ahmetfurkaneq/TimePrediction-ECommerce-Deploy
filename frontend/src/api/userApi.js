// src/api/userApi.js
import axios from './axiosConfig';


export const authenticateUser = (username, password) =>
  axios.post(`/user/authenticateUser`, null, {
    params: { username, password }
  });

export const registerUser = (userDTO, password) =>
  axios.post(`/user/registerUser`, userDTO, {
    params: { password }
  });

export const editUser = (username, newUsername, newPassword) =>
  axios.post(`/user/editUser`, null, {
    params: { username, newUsername, newPassword }
  });

export const exitUser = (username) =>
  axios.post(`/user/exitUser`, null, {
    params: { username }
  });

export const showBudget = (username) =>
  axios.get(`/user/showBudget`, {
    params: { username }
  });

export const updateBalance = (username, money, isAdding) =>
  axios.post(`/user/updateBalance`, null, {
    params: { username, money, isAdding }
  });

export const getAllUsers = () =>
  axios.get(`/user/getAllUsers`);

// Profil bilgisini AuthContext '/user/me' üzerinden alıyoruz; ayrı bir endpoint çağrısı gerekmiyor.
