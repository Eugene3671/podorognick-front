"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";
import css from "./MobileMenu.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import clsx from "clsx";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={css.background}
      onClick={(e) => {
        if (!(e.target instanceof Element)) return;

        if (!e.target.closest(`.${css.wrapper}`)) {
          onClose();
        }
      }}
    >
      <div className={css.wrapper}>
        <div className={css.header}>
          <Link href="/" className={css.logo}>
            <svg width="156" height="36">
              <use href="/sprite.svg#icon-Logo" />
            </svg>
          </Link>
          <button className={css.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <nav>
          <ul className={css.navList}>
            <li className={css.navItem}>
              <Link href="/" onClick={onClose}>
                Головна
              </Link>
            </li>

            <li className={css.navItem}>
              <Link href="/stories" onClick={onClose}>
                Історії
              </Link>
            </li>

            <li className={css.navItem}>
              <Link href="/travellers" onClick={onClose}>
                Мандрівники
              </Link>
            </li>
          </ul>
        </nav>
        <div className={clsx(css.action, isAuthenticated && css.authActionBtn)}>
          <Link href="/stories/create">Опублікувати історію</Link>
        </div>

        <div className={css.auth}>
          <AuthNavigation variant="mobile" />
        </div>
      </div>
    </div>
  );
}
