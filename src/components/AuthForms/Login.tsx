'use client'
import { useState } from 'react';
import Link from 'next/link';
import css from './AuthForms.module.css'
import { Formik, Form, Field } from 'formik';
 import { loginSchema } from '@/src/validation/registerValidation';
 


export default function Login() {

    const [showPassword, setShowPassword] = useState(false)



    return (
        <div className={css.authContainer}>
      
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

     <Formik
  initialValues={{
    name: '',
    email: '',
    password: '',
  }}
  validationSchema={loginSchema}
  onSubmit={(values) => {
    console.log(values);
  }}
>
  {({ errors, touched }) => (
    <Form className={css.authForm}>
      
      <div className={css.formGroup}>
        <label htmlFor="name" className={css.label_text}>
          Ім'я*
        </label>
        <Field
          type="text"
          id="name"
          name="name"
          placeholder="Ваше ім'я"
          className={`${css.input} ${
            errors.name && touched.name ? css.inputError : ''
          }`}
        />
        {errors.name && touched.name && (
          <div className={css.error}>{errors.name}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="email" className={css.label_text}>
          Пошта*
        </label>
        <Field
          type="email"
          id="email"
          name="email"
          placeholder="hello@podorozhnyky.ua"
          className={`${css.input} ${
            errors.email && touched.email ? css.inputError : ''
          }`}
        />
        {errors.email && touched.email && (
          <div className={css.error}>{errors.email}</div>
        )}
      </div>

      <div className={css.formGroup}>
        <label htmlFor="password" className={css.label_text}>
          Пароль*
        </label>

        <div className={css.passwordWrapper}>
          <Field
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            placeholder="********"
            className={`${css.input} ${
              errors.password && touched.password ? css.inputError : ''
            }`}
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

        {errors.password && touched.password && (
          <div className={css.error}>{errors.password}</div>
        )}
      </div>

      <button type="submit" className={css.authButton}>
        Увійти
      </button>
    </Form>
  )}
</Formik>

    </div>
    )
}



