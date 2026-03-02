"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import css from "./Hero.module.css";
import "@/src/app/globals.css";
import Button from "../Button/Button";
import LoaderEl from "../LoaderEl/LoaderEl";
import { useAuthStore } from "@/src/lib/store/authStore";

export default function Hero() {
  const { isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      router.push("/auth/register");
    }, 300);
  };

  return (
    <section className={css.hero} id="hero">
      <div className="container">
        <picture className={css.picture}>
          <source
            media="(min-width: 1440px)"
            srcSet="
                /img/hero-baner/bg-pc-compressed.jpg 1x,
                /img/hero-baner/bg-pc@2x-compressed.jpg 2x
              "
          />
          <source
            media="(min-width: 768px)"
            srcSet="
                /img/hero-baner/bg-tab-compressed.jpg 1x,
                /img/hero-baner/bg-tab@2x-compressed.jpg 2x
              "
          />
          <img
            src="/img/hero-baner/bg-mob-compressed.jpg"
            srcSet="
                /img/hero-baner/bg-mob-compressed.jpg 1x,
                /img/hero-baner/bg-mob@2x-compressed.jpg 2x
              "
            alt="Відкрита книга, плед і чашка кави"
            className={css.image}
          />
        </picture>

        <div className={css.heroContainer}>
          <h1 className={css.title}>
            Відкрийте світ <br /> подорожей з нами!
          </h1>
          <p className={css.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми <br />
            історіями та отримувати натхнення для нових пригод. Відкрийте для
            себе нові <br />
            місця та знайдіть однодумців!
          </p>

          {isLoading ? (
            <div className={css.loaderWrapper}>
              <LoaderEl />
            </div>
          ) : isAuthenticated ? (
            <Button href="/profile" className={`buttonBlue ${css.button}`}>
              Мій Профіль
            </Button>
          ) : (
            <Button
              className={`buttonBlue ${css.button}`}
              onClick={handleClick}
            >
              Доєднатись
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
