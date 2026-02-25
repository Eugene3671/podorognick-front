"use client";
import css from "./Join.module.css";
import Link from "next/link";
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
              <Link className={css.join_button} href="/auth/profile">
                Збережені
              </Link>
            ) : (
              <Link className={css.join_button} href="/auth/register">
                Зареєструватися
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Join;
