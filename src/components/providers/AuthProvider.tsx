"use client";

import { useAuthStore } from "@/src/lib/store/authStore";
import { User } from "@/src/types/user";
import { ReactNode, useEffect } from "react";

const AuthProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    if (user) {
      setUser(user);
    } else {
      clearAuth();
    }
  }, [user, setUser, clearAuth]);

  return <>{children}</>;
};

export default AuthProvider;

// "use client";

// import { ReactNode, useEffect, useState } from "react";
// import { useAuthStore } from "@/src/lib/store/authStore";
// import { User } from "@/src/types/user";

// interface AuthProviderProps {
//   children: ReactNode;
// }

// const AuthProvider = ({ children }: AuthProviderProps) => {
//   const setUser = useAuthStore((state) => state.setUser);
//   const [hydrated, setHydrated] = useState(false);

//   useEffect(() => {
//     const hydrate = async () => {
//       const stored = localStorage.getItem("user");
//       if (stored) {
//         const user: User = JSON.parse(stored);
//         setUser(user);
//       }
//       setHydrated(true);
//     };

//     hydrate();
//   }, [setUser]);

//   if (!hydrated) return <div>Loading...</div>;

//   return <>{children}</>;
// };

// export default AuthProvider;
