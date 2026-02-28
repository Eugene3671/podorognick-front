import css from "./Hero.module.css";
import "@/src/app/globals.css";
import Button from "../Button/Button";

export default function Hero() {
  return (
    <section className={css.hero}>
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
        <div className={`${css.heroContainer}`}>
          <h1 className={css.title}>
            Відкрийте світ <br /> подорожей з нами!
          </h1>
          <p className={css.description}>
            Приєднуйтесь до нашої спільноти мандрівників, де ви зможете ділитися
            своїми історіями та отримувати натхнення для нових пригод. Відкрийте
            для себе нові місця та знайдіть однодумців!
          </p>
          <Button href="/auth/register">Доєднатись</Button>
        </div>
      </div>
    </section>
  );
}
