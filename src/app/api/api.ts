import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api`,
  withCredentials: true,
});

if (process.env.NODE_ENV === "development") {
  api.interceptors.response.use(
    (res) => res,
    (error) => {
      console.error("API ERROR:", {
        url: error.config?.url,
        status: error.response?.status,
        data: error.response?.data,
      });

      return Promise.reject(error);
    }
  );
}