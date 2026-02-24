import css from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={css.container}>
      <picture className={css.picture}>
        {/* desktop */}
        <source
          media="(min-width: 1440px)"
          srcSet="
      /img/hero-baner/bg-pc-compressed.jpg 1x,
      /img/hero-baner/bg-pc@2x-compressed.jpg 2x
    "
        />

        {/* tablet */}
        <source
          media="(min-width: 768px)"
          srcSet="
      /img/hero-baner/bg-tab-compressed.jpg 1x,
      /img/hero-baner/bg-tab@2x-compressed.jpg 2x
    "
        />

        {/* mobile (fallback) */}
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
      <h1 className={css.title}>Відкрийте світ подорожей з нами!</h1>
      <p className={css.description}>
        Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
        своїми історіями та отримувати натхнення для нових пригод. Відкрийте для
        себе нові місця та знайдіть однодумців!
      </p>
      <Link href="/auth/register" className={css.button}>
        Доєднатись
      </Link>
    </div>
  );
}
