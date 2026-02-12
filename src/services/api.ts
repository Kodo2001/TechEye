import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL ;
const TOKEN_KEY= import.meta.env.VITE_TOKEN_KEY;
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Language': 'English',
    'storeId': '1',
    'ratio': '1500',
  },
});

// Add auth token to requestsa
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 - redirect to login
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY);
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
