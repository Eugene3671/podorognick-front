"use client";

import { useState } from "react";
import Link from "next/link";

import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import MobileMenu from "../MobileMenu/MobileMenu";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className={css.header}>
        <div className={css.headerContainer}>
          <Link href="/" className={css.logo}>
            Logo
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
              <AuthNavigation />
            </ul>
          </nav>

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
