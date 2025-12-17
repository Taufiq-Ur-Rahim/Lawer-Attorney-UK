import axios from 'axios';
import { toast } from 'react-toastify';

// Create a new instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:8000', // Backend runs on port 8000
  timeout: 5000, // Set the request timeout if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add user info if needed
api.interceptors.request.use(
  (config) => {
    // For now, we don't need to add any authentication headers
    // since we're using localStorage-based authentication
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Log and show clearer toast for failed requests to aid debugging
    const url = error.config?.url || 'unknown url';
    const method = error.config?.method?.toUpperCase() || 'UNKNOWN';
    const status = error.response?.status;
    const data = error.response?.data;
    console.error('API Error:', { method, url, status, data: data || error.message });

    // Show brief toast with url and status to help identify failing endpoints
    toast.error(`${method} ${url} — ${status || 'Network/Unknown error'}`);

    return Promise.reject(error);
  }
);

export default api;
