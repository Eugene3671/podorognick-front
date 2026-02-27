// lib/api/сategoriesApi.ts

import { nextServer } from "./api";
import { Category } from "../../types/category";

export async function getCategories(): Promise<Category[]> {
  const response = await nextServer.get<Category[]>("/categories");
  return response.data;
}
