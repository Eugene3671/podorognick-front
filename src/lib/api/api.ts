"use client";
import axios from "axios";
import { logout } from "./authApi";
import toast from "react-hot-toast";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`;

export const nextServer = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
nextServer.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await nextServer.post("/auth/session");

        if (res.data.success) {
          return nextServer(originalRequest);
        } else {
          logout();

          toast.error("Сесія закінчилась, увійдіть знову");
          window.location.href = "/auth/login";
          return Promise.reject(error);
        }
      } catch {
        logout();

        toast.error("Сесія закінчилась, увійдіть знову");
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
