// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backend-5wa5.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;