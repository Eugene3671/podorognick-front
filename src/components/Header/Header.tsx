"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={clsx(css.header, isHome && css.homeHeader)}>
        <div className={css.container}>
          <Link href="/" className={css.logo}>
            <svg width="156" height="36">
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </Link>

          <nav className={css.nav}>
            <ul className={css.navList}>
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
            </ul>
          </nav>

          <div className={css.action}>
            <Link href="/stories/create">Опублікувати історію</Link>
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
