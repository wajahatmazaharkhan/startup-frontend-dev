// apiClient.js
import axios from 'axios';
// import apiPublic from "./apiPublic";
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/auth-store';
// import { getDecryptedToken } from "../utils/cryptoUtil";

axios.defaults.withCredentials = true;
const token = useAuthStore.getState().secureToken;

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // silent logout
      localStorage.clear();
    }
    return Promise.reject(error);
  },
);

export default api;
