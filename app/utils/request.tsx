import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://localhost:8443/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter automatiquement le token à chaque requête
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;