import axios from 'axios';

// Create an instance of axios
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/',//import.meta.env.VITE_API_URL, // Replace with API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  config => {
    // modify the request config before sending it
    // add an authorization token
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => { 
    // Handle request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    return response;
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Handle response error
    if (error.response && error.response.status === 401) {
      // Handle unauthorized error
      // For example, redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;