"use client";

import css from "@/src/components/Error/Error.module.css";

type ErrorProps = {
  error: Error;
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className={`container ${css.containerEr}`}>
      <h2 className={css.title}>Сталася помилка, спробуйте ще раз...</h2>
      <p className={css.text}>{error.message}</p>
      <button className={`buttonGrey ${css.buttonEr}`} onClick={reset}>
        Спробуйте знову
      </button>
    </div>
  );
}
