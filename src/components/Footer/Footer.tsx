"use client";

import css from "./Footer.module.css";
import clsx from "clsx";
import Link from "next/link";
import { useAuthStore } from "@/src/lib/store/authStore";
import "@/src/app/globals.css";

export default function Footer() {
  const { isAuthenticated } = useAuthStore();

  return (
    <footer className={css.footer}>
      <div className={`container ${css.footerContainer}`}>
        <Link
          href="/"
          className={clsx(css.logo, isAuthenticated && css.logoAuth)}
        >
          <svg width="156" height="36">
            <use href="/sprite.svg#icon-Logo" />
          </svg>
        </Link>

        <ul className={css.socialMediaList}>
          <li className={css.socialMediaItem}>
            <Link
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-Facebook" />
              </svg>
            </Link>
          </li>
          <li className={css.socialMediaItem}>
            <Link
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-Instagram" />
              </svg>
            </Link>
          </li>
          <li className={css.socialMediaItem}>
            <Link
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-X" />
              </svg>
            </Link>
          </li>
          <li className={css.socialMediaItem}>
            <Link
              href="https://youtube.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="24" height="24">
                <use href="/sprite.svg#icon-Youtube" />
              </svg>
            </Link>
          </li>
        </ul>

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
            {isAuthenticated && (
              <li>
                <Link href="/profile" className={css.navItem}>
                  Профіль
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <p className={css.text}>© 2025 Подорожники. Усі права захищені.</p>
      </div>
    </footer>
  );
}
