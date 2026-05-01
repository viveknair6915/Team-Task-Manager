import axios from 'axios';

// When deployed on Vercel, the frontend and backend share the same domain, so we can just use '/api'.
// In local development (Vite), we need to point to the local backend running on port 5000.
const baseURL = import.meta.env.DEV ? 'http://localhost:5000/api' : '/api';

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
