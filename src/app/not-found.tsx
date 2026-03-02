import css from "@/src/components/NotFound/NotFound.module.css";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist on Подорожники.",
  openGraph: {
    title: `Page Not Found`,
    description: "The page you are looking for does not exist on Подорожники.",
    siteName: "Подорожники",
    images: [
      {
        url: "/images/not-found.png",
        width: 1200,
        height: 630,
        alt: "Подорожники",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div className={`container ${css.notFoundContainer}`}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Вибачте, сторінки, яку ви шукаєте, не існує.
      </p>

      <Link href="/" className="buttonBlue">
        Повернутись на Головну сторінку
      </Link>
    </div>
  );
}
