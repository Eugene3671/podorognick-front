"use client";

import { useAuthStore } from "@/src/lib/store/authStore";
import { ReactNode, useEffect, useState } from "react";
import { checkSession } from "@/src/lib/api/authApi";
import { getMe } from "@/src/lib/api/usersApi";
import LoaderEl from "../LoaderEl/LoaderEl";
import css from "./AuthProvider.module.css";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const isAuthenticated = await checkSession();
      if (isAuthenticated) {
        const user = await getMe();
        if (user) setUser(user);
      } else {
        clearAuth();
      }
      setLoading(false);
    };
    fetchUser();
  }, [setUser, clearAuth]);

  if (loading) {
    return (
      <div className={css.loaderWrapper}>
        <LoaderEl />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProvider;
