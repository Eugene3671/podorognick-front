'use client'
import Link from 'next/link'
import css from './AuthForms.module.css'
import { useState } from 'react'
import { registerSchema } from '@/src/validation/registerValidation'
import { Formik, Form, Field } from 'formik';

export default function Register() {

      const [showPassword, setShowPassword] = useState(false)

  
  

    return (

<div className={css.authContainer}>
      
       <div className={css.authTabs}>
       <div className={css.tabWrapper}>
    <Link href=" " className={`${css.tab} ${css.active}`}>
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

     <Formik
  initialValues={{
    fullname: '',
    email: '',
    password: '',
  }}
  validationSchema={registerSchema}
  onSubmit={(values) => {
    console.log(values);
  }}
>
  {({ errors, touched }) => (
    <Form className={css.authForm}>

      <div className={css.formGroup}>
        <label htmlFor="fullname" className={css.label_text}>
          Імʼя та Прізвище*
        </label>
        <Field
          type="text"
          id="fullname"
          name="fullname"
          placeholder="Ваше імʼя та прізвище"
          className={`${css.input} ${
            errors.fullname && touched.fullname ? css.inputError : ''
          }`}
        />
        {errors.fullname && touched.fullname && (
          <div className={css.error}>{errors.fullname}</div>
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
            placeholder="*********"
            className={`${css.input} ${
              errors.password && touched.password ? css.inputError : ''
            }`}
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

        {errors.password && touched.password && (
          <div className={css.error}>{errors.password}</div>
        )}
      </div>

      <button type="submit" className={css.authButton}>
        Зареєструватись
      </button>
    </Form>
  )}
</Formik>
    </div>


    )
}
