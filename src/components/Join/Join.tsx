import css from "./Join.module.css";

const Join = () => {
  return (
    <main>
      <div className={css.container}>
        <h1 className={css.title}>Приєднуйтесь до нашої спільноти</h1>
        <p className={css.description}>
          Долучайтеся до мандрівників, які діляться своїми історіями та
          надихають на нові пригоди.
        </p>
        <button>Зареєструватися</button>
      </div>
    </main>
  );
};

export default Join;
