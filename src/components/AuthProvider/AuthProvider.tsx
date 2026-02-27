// "use client";

// import { useQuery } from "@tanstack/react-query";
// import { getMe } from "@/src/lib/api/usersApi";
// import { ReactNode } from "react";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export default function AuthProvider({ children }: AuthProviderProps) {
//   const { data: user, isLoading } = useQuery({
//     queryKey: ["currentUser"],
//     queryFn: getMe,
//     retry: false, // не перепробовувати при 401
//   });

//   if (isLoading) return null; // можна замість null поставити Loader

//   return <>{children}</>;
// }

"use client";

import { checkSession } from "@/src/lib/api/authApi";
import { getMe } from "@/src/lib/api/usersApi";
import { useAuthStore } from "@/src/lib/store/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    const fetchUser = async () => {
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearIsAuthenticated();
      }
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  return children;
};

export default AuthProvider;
