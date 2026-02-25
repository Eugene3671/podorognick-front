import css from "./Hero.module.css";
import Link from "next/link";
import "@/src/app/globals.css";

export default function Hero() {
  return (
    <section className={css.hero}>
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
      <div className={`container ${css.heroContainer}`}>
        <h1 className={css.title}>Відкрийте світ подорожей з нами!</h1>

        <p className={css.description}>
          Приєднуйтесь до нашої спільноти мандрівників...
        </p>

        <Link href="/auth/register" className={css.button}>
          Доєднатись
        </Link>
      </div>
    </section>
  );
}
