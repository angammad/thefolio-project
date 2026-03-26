// frontend/src/api/axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.X.X:5000/api', // Replace with your Termux device IP
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;