"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./PageToggle.module.css";

const PageToggle = () => {
  const pathname = usePathname();

  const isSaved = pathname === "/profile/saved" || pathname === "/profile";
  const isOwn = pathname === "/profile/own";

  return (
    <nav className={styles.toggle}>
      <Link
        href="/profile/saved"
        scroll={false}
        className={`${styles.link} ${isSaved ? styles.active : ""}`}
      >
        Збережені історії
      </Link>
      <Link
        href="/profile/own"
        scroll={false}
        className={`${styles.link} ${isOwn ? styles.active : ""}`}
      >
        Мої історії
      </Link>
    </nav>
  );
};

export default PageToggle;
