'use client'
import { useState } from 'react';
import { useRouter } from "next/navigation";
import Link from 'next/link';
import css from './AuthForms.module.css'
import { Formik, Form, Field } from 'formik';
import { loginSchema } from '@/src/validation/registerValidation';
import { LoginFormValues } from '@/src/types/auth';
import { login } from '@/src/lib/services/auth.service';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/src/lib/store/authStore';


export default function Login() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: LoginFormValues = {
      email: '',
      password: '',
      
    }
  

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await login(values)
      router.push("/");
      setUser(response.user, response.accessToken);
      console.log('Користувач залогінився:', response)

    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Помилка входу')
    } finally {
      setIsSubmitting(false);
    }


  }




    return (
        <div className={css.authContainer}>
      
      <div className={css.authTabs}>
       <div className={css.tabWrapper}>
     <Link href="/auth/register" className={css.tab}>
      Реєстрація
     </Link>
     </div>
     <div className={css.tabWrapper}>
     <Link href="/auth/login" className={`${css.tab} ${css.active}`}>
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
  initialValues={initialValues}
  validationSchema={loginSchema}
  onSubmit={handleSubmit}
>
  {({ errors, touched }) => (
    <Form className={css.authForm}>

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



