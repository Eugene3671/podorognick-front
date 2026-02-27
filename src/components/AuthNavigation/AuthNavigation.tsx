"use client";

import css from "./AuthNavigation.module.css";
import Link from "next/link";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";
import { logout } from "@/src/lib/api/authApi";
import Image from "next/image";

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
        <div className={css.avatarWrapper}>
          <Image
            src={
              user?.avatarUrl ||
              "https://ac.goit.global/fullstack/react/default-avatar.jpg"
            }
            alt="User avatar"
            width={32}
            height={32}
            className={css.avatar}
          />
        </div>
      </li>

      <li className={css.navigationItem}>
        <p
          className={clsx(
            css.userName,
            isHome && css.homeUserName,
            css[variant],
          )}
        >
          {user?.name}
        </p>
      </li>

      <button
        className={clsx(
          css.logoutButton,
          isHome && css.homeLogout,
          css[variant],
        )}
        onClick={handleLogout}
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-logout" />
        </svg>
      </button>
    </>
  ) : (
    <div className={clsx(css[variant], css.authWrapper)}>
      <li
        className={clsx(
          css.navigationItem,
          css.login,
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
          isHome && css.homeRegisterBtn,
        )}
      >
        <Link href="/auth/register" prefetch={false}>
          Реєстрація
        </Link>
      </li>
    </div>
  );
}
