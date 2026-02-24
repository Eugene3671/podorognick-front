'use client'
import Link from 'next/link'
import css from './AuthForms.module.css'
import { useState } from 'react'
import { useRouter } from "next/navigation";
import { registerSchema } from '@/src/validation/registerValidation'
import { Formik, Form, Field } from 'formik';
import { register } from '@/src/lib/services/auth.service';
import {RegisterFormValues } from '@/src/types/auth'
import toast  from 'react-hot-toast';
 

export default function Register() {


  const initialValues: RegisterFormValues = {
    name: '',
    email: '',
    password: '',
    
  }

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values:RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await register({
        name: values.name,
        email: values.email,
        password: values.password,
      });

          console.log("Користувач зареєстрований:", response);

      toast.success(`Привіт, ${response.user.name}! Реєстрація успішна.`);
      router.push('/');
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Помилка реєстрації");
      
    } finally {
      setIsSubmitting(false);
    }

  }

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

     <Formik<RegisterFormValues>
  initialValues={initialValues}
  validationSchema={registerSchema}
  onSubmit={(values) => {
    console.log("Formik onSubmit викликався", values);
    handleSubmit(values);
  }}
>
  {({ errors, touched }) => (
    <Form className={css.authForm}>

      <div className={css.formGroup}>
        <label htmlFor="name" className={css.label_text}>
          Імʼя та Прізвище*
        </label>
        <Field
          type="text"
          id="name"
          name="name"
          placeholder="Ваше імʼя та прізвище"
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
