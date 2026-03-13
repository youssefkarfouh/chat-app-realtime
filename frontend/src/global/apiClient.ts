import axios from "axios";
import { useAuth } from "./store/useAuth";


const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuth.getState().accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // Let React Query / mutationCache handle toast
    // Only handle auth-level errors here
    if (error?.response?.status === 401) {
      // Removed: window.location.href = '/login';
      // The app state and ProtectedRoute will handle redirection
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;