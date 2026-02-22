import css from "./AuthNavigation.module.css";
import Link from "next/link";

export default function AuthNavigation() {
  return (
    <>
      <li className={`${css.navigationItem} ${css.login}`}>
        <Link href="/auth/login" prefetch={false}>
          Вхід
        </Link>
      </li>

      <li className={`${css.navigationItem} ${css.register}`}>
        <Link href="/auth/register" prefetch={false}>
          Реєстрація
        </Link>
      </li>
    </>
  );
}
