"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import "@/src/app/globals.css";

import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import MobileMenu from "../MobileMenu/MobileMenu";
import { useAuthStore } from "@/src/lib/store/authStore";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={clsx(css.header, isHome && css.homeHeader)}>
        <div className={`container  ${css.headerContainer}`}>
          <Link href="/" className={css.logo}>
            <svg width="156" height="36">
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </Link>

          <nav className={css.nav}>
            <ul
              className={clsx(
                css.navList,
                !isAuthenticated && css.noAuthNavList,
              )}
            >
              <li>
                <Link href="/" className={css.navItem}>
                  Головна
                </Link>
              </li>
              <li>
                <Link href="/stories" className={css.navItem}>
                  Історії
                </Link>
              </li>
              <li>
                <Link href="/travellers" className={css.navItem}>
                  Мандрівники
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className={clsx(
                    css.navItem,
                    css.noAuthNavItem,
                    isAuthenticated && css.authNavItem,
                  )}
                >
                  Мій Профіль
                </Link>
              </li>
            </ul>
          </nav>

          <div
            className={clsx(css.action, isAuthenticated && css.authActionBtn)}
          >
            <Link href="/stories/create" className="buttonBlue">
              Опублікувати історію
            </Link>
          </div>

          <div className={css.auth}>
            <AuthNavigation />
          </div>

          <button
            className={css.burger}
            onClick={() => setIsOpen(true)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
