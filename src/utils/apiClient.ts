import axios from "axios";

// Use relative URLs to leverage Vite's proxy
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Point to the correct API server
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Important for cookie-based authentication
});

// Request interceptor for handling tokens
apiClient.interceptors.request.use(
  (config) => {
    // You can add auth token here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Redirect to login or refresh token
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
