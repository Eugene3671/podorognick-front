import css from "./Hero.module.css";
import Link from "next/link";

export default function Hero() {
  return (
    <div className={css.container}>
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
