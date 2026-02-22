"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";

interface AuthNavigationProps {
  variant?: "mobile" | "desktop";
}

export default function AuthNavigation({
  variant = "desktop",
}: AuthNavigationProps) {
  const { isAuthenticated, user } = useAuthStore();
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );
  const router = useRouter();

  const handleLogout = async () => {
    // await logout();
    clearIsAuthenticated();
    router.push("/sign-in");
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
      <li className={clsx(css.navigationItem, css.login, css[variant])}>
        <Link href="/auth/login" prefetch={false}>
          Вхід
        </Link>
      </li>

      <li className={clsx(css.navigationItem, css.register, css[variant])}>
        <Link href="/auth/register" prefetch={false}>
          Реєстрація
        </Link>
      </li>
    </>
  );
}
