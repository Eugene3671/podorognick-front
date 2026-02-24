"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";
import { logout } from "@/src/lib/services/auth.service";

interface AuthNavigationProps {
  variant?: "mobile" | "desktop";
}

export default function AuthNavigation({
  variant = "desktop",
}: AuthNavigationProps) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.refresh();
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <p>Avatar</p>
      </li>

      <li className={css.navigationItem}>
        <p className={css.userName}>{user?.name}</p>
      </li>

      <button className={css.logoutButton} onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : (
    <>
      <li
        className={clsx(
          css.navigationItem,
          css.login,
          css[variant],
          isHome && css.homeLoginBtn,
        )}
      >
        <Link href="/auth/login" prefetch={false}>
          Вхід
        </Link>
      </li>

      <li
        className={clsx(
          css.navigationItem,
          css.register,
          css[variant],
          isHome && css.homeRegisterBtn,
        )}
      >
        <Link href="/auth/register" prefetch={false}>
          Реєстрація
        </Link>
      </li>
    </>
  );
}
