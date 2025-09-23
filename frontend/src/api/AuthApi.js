import axios from './axiosConfig';


export const loginUser = async (username, password) => {
  return axios.post('/auth/login', { username, password });
};





