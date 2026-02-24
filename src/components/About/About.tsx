import css from "./About.module.css";

export default function About() {
  return (
    <div className={css.container}>
      <div className={css.textWrapper}>
        <h2 className={css.title}>
          Проєкт, створений для тих, хто живе подорожами
        </h2>
        <p className={css.description}>
          Ми віримо, що кожна подорож — це унікальна історія, варта того, щоб
          нею поділилися. Наша платформа створена, щоб об`єднати людей,
          закоханих у відкриття нового. Тут ви можете ділитися власним досвідом,
          знаходити друзів та надихатися на наступні пригоди разом з нами.
        </p>
      </div>
      <ul className={css.list}>
        <li className={css.item}>
          <svg className={css.icon} width="37" height="37">
            <use href="/sprite.svg#icon-stars" />
          </svg>
          <h3 className={css.subTitle}>Наша місія</h3>
          <p className={css.text}>
            Об`єднувати людей через любов до пригод та надихати на нові
            відкриття.
          </p>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="48" height="48">
            <use href="/sprite.svg#icon_luggage" />
          </svg>
          <h3 className={css.subTitle}>Автентичні історії</h3>
          <p className={css.text}>
            Ми цінуємо справжні, нередаговані враження від мандрівників з усього
            світу.
          </p>
        </li>
        <li className={css.item}>
          <svg className={css.icon} width="48" height="48">
            <use href="/sprite.svg#icon-communication" />
          </svg>
          <h3 className={css.subTitle}>Ваша спільнота</h3>
          <p className={css.text}>
            Станьте частиною спільноти, де кожен може бути і автором, і читачем.
          </p>
        </li>
      </ul>
    </div>
  );
}
