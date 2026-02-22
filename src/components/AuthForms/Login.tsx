'use client'
import { useState } from 'react';
import Link from 'next/link';
import css from './AuthForms.module.css'


export default function Login() {

    const [showPassword, setShowPassword] = useState(false)



    return (
        <div className={css.authContainer}>
      
      {/* Таби */}
      <div className={css.authTabs}>
       <div className={css.tabWrapper}>
     <Link href=" " className={css.tab}>
      Реєстрація
     </Link>
     </div>
     <div className={css.tabWrapper}>
     <Link href=" " className={`${css.tab} ${css.active}`}>
      Вхід
     </Link>
     </div>
      </div>
      <div className={css.authHeader}>
        <h1 className={css.authTitle}>Вхід</h1>
        <p className={css.authSubtitle}>
          Вітаємо знову у спільноту мандрівників!
        </p>
      </div>

      <form className={css.authForm}  >
        
       
        <div className={css.formGroup}>
          <label htmlFor="email"  className={css.label_text}>Пошта*</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="hello@podorozhnyky.ua"
            required
            className={css.input}
          />
        </div>

         <div className={css.formGroup}>
          <label htmlFor="password" className={css.label_text}>Пароль*</label>

          <div className={css.passwordWrapper}>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              placeholder="********"
              required
              className={css.input}
            />

            <button
              type="button"
              className={css.passwordToggle}
              onClick={() => setShowPassword(!showPassword)}
              aria-label="Показати пароль"
            >
              <svg className={css.icon}>
                <use
                  href={
                    showPassword
                      ? '/sprite.svg#icon-eye'
                      : '/sprite.svg#icon-eye-blocked'
                  }
                />
              </svg>
            </button>
          </div>
        </div>
        <button type="submit" className={css.authButton}>
          Увійти
        </button>
      </form>

    </div>
    )
}



