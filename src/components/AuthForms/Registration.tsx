'use client'
import Link from 'next/link'
import css from './AuthForms.module.css'
import { useState } from 'react'
 

export default function Register() {

      const [showPassword, setShowPassword] = useState(false)

  
  

    return (

<div className={css.authContainer}>
      
       <div className={css.authTabs}>
       <div className={css.tabWrapper}>
    <Link href="./login.tsx " className={`${css.tab} ${css.active}`}>
      Реєстрація
    </Link>
  </div>
  <div className={css.tabWrapper}>
    <Link href="" className={css.tab}>
      Вхід
    </Link>
  </div>
      </div>

      <div className={css.authHeader}>
        <h1 className={css.authTitle}>Реєстрація</h1>
        <p className={css.authSubtitle}>
          Раді вас бачити у спільноті мандрівників!
        </p>
      </div>

      <form className={css.authForm}  >
        
        <div className={css.formGroup}>
          <label htmlFor="fullname"  className={css.label_text}>Імʼя та Прізвище*</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            placeholder="Ваше імʼя та прізвище"
            required
            className={css.input}
          />
        </div>

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
      placeholder="*********"
      required
      className={css.input}
    />

    <button
      type="button"
      className={css.passwordToggle}
      onClick={() => setShowPassword(!showPassword)}
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
          Зареєструватись
        </button>
      </form>

    </div>


    )
}
