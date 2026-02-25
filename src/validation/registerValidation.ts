 import * as Yup from 'yup';


export const loginSchema = Yup.object({
  
  email: Yup.string()
    .email('Некоректна пошта')
    .max(64, 'Максимум 64 символи')
    .required("Пошта є обов'язковою"),
  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Пароль є обов'язковим"),
});

 export const registerSchema = Yup.object({
  name: Yup.string()
    .max(32, 'Максимум 32 символи')
    .required("Імʼя та прізвище обовʼязкові"),

  email: Yup.string()
    .email('Некоректна пошта')
    .max(64, 'Максимум 64 символи')
    .required("Пошта обовʼязкова"),

  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .max(128, 'Максимум 128 символів')
    .required("Пароль обовʼязковий"),
});