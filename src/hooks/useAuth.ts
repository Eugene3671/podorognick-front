import { useQuery } from "@tanstack/react-query";
import { getMe } from "../lib/services/users.service";

export function useAuth() {
  const { data, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: getMe,
    retry: false,
  });

  return {
    user: data ?? null,
    isAuthenticated: Boolean(data),
    isLoading,
  };
}
