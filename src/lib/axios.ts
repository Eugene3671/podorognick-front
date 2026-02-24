// src/services/nextServer.ts
import axios from "axios";


const nextServer = axios.create({
  baseURL: (process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001") + "/api",
  withCredentials: true, 
  headers: {
    "Content-Type": "application/json",
  },
});


nextServer.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default nextServer;