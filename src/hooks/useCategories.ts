import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../lib/api/сategoriesApi";
import { Category } from "../types/category";

export function useCategories() {
  const { data, isLoading, error } = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });
  return { data, isLoading, error };
}
