import axios from 'axios';

let baseURL = 'http://localhost:5000/api';

if (import.meta.env.VITE_API_HOST) {
  baseURL = `https://${import.meta.env.VITE_API_HOST}/api`;
} else if (import.meta.env.VITE_API_URL) {
  baseURL = import.meta.env.VITE_API_URL;
}

const api = axios.create({
  baseURL,
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
