// app/api/api.ts

import axios, { AxiosError } from "axios";

export type ApiError = AxiosError<{ error: string }>;

export const api = axios.create({
  baseURL: "https://podorognick-back.onrender.com/api",
  withCredentials: true,
});
