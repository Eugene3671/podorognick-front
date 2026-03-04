"use client";

import { useAuthStore } from "@/src/lib/store/authStore";
import { ReactNode, useEffect, useState } from "react";
import { checkSession, logout } from "@/src/lib/api/authApi";
import { getMe } from "@/src/lib/api/usersApi";
import LoaderEl from "../LoaderEl/LoaderEl";
import css from "./AuthProvider.module.css";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearAuth = useAuthStore((state) => state.clearIsAuthenticated);
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  const privateRoutes = ["/profile"];

  useEffect(() => {
    if (privateRoutes.some((route) => pathname.startsWith(route))) {
      const fetchUser = async () => {
        try {
          setLoading(true);

          const isAuthenticated = await checkSession();

          if (!isAuthenticated) {
            clearAuth();
            try {
              await logout();
              toast.error(
                "Ваша сесія завершилась. Будь ласка, увійдіть знову.",
              );
              router.push("/auth/login");
            } catch {
              console.log("Something went wrong with logout");
            }
            return;
          }

          const user = await getMe();

          if (user) {
            setUser(user);
          } else {
            clearAuth();
          }
        } catch (error) {
          console.error("AuthProvider error:", error);
          clearAuth();
        } finally {
          setLoading(false);
        }
      };

      fetchUser();
    } else {
      setLoading(false);
    }
  }, [pathname, router, setUser, clearAuth]);

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
