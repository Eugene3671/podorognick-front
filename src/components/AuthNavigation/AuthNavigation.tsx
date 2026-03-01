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
  isFixed?: boolean;
}

export default function AuthNavigation({
  variant = "desktop",
  isFixed,
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
    localStorage.removeItem("auth");
    router.refresh();
  };

  return isAuthenticated ? (
    <>
      <li className={css.navigationItem}>
        <Link href="/edit" prefetch={false} className={css.avatarWrapper}>
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
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p
          className={clsx(
            css.userName,
            isHome && css.homeUserName,
            css[variant],
            isFixed && css.fixed,
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
          isFixed && css.fixed,
        )}
        onClick={handleLogout}
      >
        <svg width="24" height="24">
          <use href="/sprite.svg#icon-logout" />
        </svg>
      </button>
    </>
  ) : (
    <ul className={clsx(css[variant], css.authWrapper)}>
      <li>
        <Link
          href="/auth/login"
          prefetch={false}
          className={clsx(
            css.navigationItem,
            css.login,
            "buttonGrey",
            "buttonBlue",
            isHome && css.homeLoginBtn,
            isFixed && css.fixed,
          )}
        >
          Вхід
        </Link>
      </li>

      <li>
        <Link
          href="/auth/register"
          prefetch={false}
          className={clsx(
            css.navigationItem,
            css.register,
            "buttonBlue",
            isHome && css.homeRegisterBtn,
            isFixed && css.fixed,
          )}
        >
          Реєстрація
        </Link>
      </li>
    </ul>
  );
}
