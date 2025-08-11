import axios from 'axios';

// Create a new instance of Axios
const api = axios.create({
  baseURL: 'http://localhost:800', // Replace this with your actual API base URL
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
    // Only handle specific errors, don't redirect for general errors
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
