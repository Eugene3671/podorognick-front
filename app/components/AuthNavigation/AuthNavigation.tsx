import css from "./AuthNavigation.module.css";
import Link from "next/link";

export default function Header() {
  return (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/auth/login"
          prefetch={false}
          className={css.navigationLink}
        >
          Вхід
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link
          href="/auth/register"
          prefetch={false}
          className={css.navigationLink}
        >
          Реєстрація
        </Link>
      </li>
    </>
  );
}
