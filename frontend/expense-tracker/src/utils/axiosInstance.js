import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
});

// Request Interceptor (Fixed)
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {  // Changed from accessToken to token
      config.headers.Authorization = `Bearer ${token}`;  // Fixed variable name
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor (Improved)
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          localStorage.removeItem('token');
          window.location.href = "/login";
          break;
        case 500:
          console.error("Server error. Please try again");
          break;
        default:
          console.error("Request failed with status", error.response.status);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.error("Request timed out. Please try again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;