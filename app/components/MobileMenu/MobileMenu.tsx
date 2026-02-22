"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import css from "./MobileMenu.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function MobileMenu({ isOpen, onClose }) {
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
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      className={css.background}
      onClick={(e) => {
        if (!e.target.closest(`.${css.wrapper}`)) {
          onClose();
        }
      }}
    >
      <div className={css.wrapper}>
        <button className={css.closeBtn} onClick={onClose} aria-label="Close">
          ✕
        </button>

        <Link href="/" onClick={onClose} className={css.logo}>
          Logo
        </Link>

        <nav>
          <ul className={css.navList}>
            <li>
              <Link href="/" onClick={onClose}>
                Головна
              </Link>
            </li>

            <li>
              <Link href="/stories" onClick={onClose}>
                Історії
              </Link>
            </li>

            <li>
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
