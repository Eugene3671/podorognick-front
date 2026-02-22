"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import css from "./MobileMenu.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) onClose();
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

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
          <Link href="/" onClick={onClose} className={css.logo}>
            Logo
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

            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </div>
  );
}
