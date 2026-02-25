"use client";

import Link from "next/link";
import "@/src/app/globals.css";
import css from "./Header.module.css";

export default function Header() {
  return (
    <div className={`container  ${css.headerAuthContainer}`}>
      <Link href="/" className={css.logo}>
        <svg width="156" height="36">
          <use href="/sprite.svg#icon-Logo" />
        </svg>
      </Link>
    </div>
  );
}
