import axios from "axios";
import { Story } from "../../types/story";
import { Category } from "../../types/category";

// const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";

export const nextServer = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});
