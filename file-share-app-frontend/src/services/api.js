import axios from 'axios';

// Create an axios instance with the base URL of your deployed backend
const api = axios.create({
  baseURL: 'https://farmartbackend.fly.dev/api',
  withCredentials: true, // This is important for cookies to be sent and received
});

// Add a response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear stored user data and redirect to login if unauthorized
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api; 