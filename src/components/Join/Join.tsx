"use client";
import css from "./Join.module.css";
import Link from "next/link";
import Button from "@/src/components/Button/Button";
import { useAuthStore } from "@/src/lib/store/authStore";
const Join = () => {
  const authenticated = useAuthStore((state) => state.isAuthenticated);
  return (
    <section className={css.join}>
      <div className="container ">
        <div className={css.join_background}>
          <div className={css.join_content}>
            <h2 className={css.join_title}>Приєднуйтесь до нашої спільноти</h2>
            <p className={css.join_description}>
              Долучайтеся до мандрівників, які діляться своїми історіями та
              надихають на нові пригоди.
            </p>
            {authenticated ? (
              <Button href="/profile" type="button" className={css.join_button}>
                Збережені
              </Button>
            ) : (
              <Button
                href="/auth/register"
                type="button"
                className={css.join_button}
              >
                Зареєструватися
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
