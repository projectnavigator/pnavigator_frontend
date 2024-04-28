import axios from "axios";
import { Cookie } from "cookie.js";

const API_URL = import.meta.env.VITE_BACKEND_API_URL;

const customFetch = axios.create({
  baseURL: `${API_URL}/api`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});
customFetch.interceptors.request.use((option) => {
  return option;
});
customFetch.interceptors.response.use((option) => {
  return option;
});

export default customFetch;
