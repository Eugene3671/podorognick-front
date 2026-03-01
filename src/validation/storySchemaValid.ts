import * as Yup from "yup";

export const StorySchemaValidation = Yup.object().shape({
  img: Yup.mixed()
    .required("Завантажте фото")
    .test("fileSize", "Максимальний розмір 2MB", (value) => {
      if (!value) return false;
      const file = value as File;
      return file.size <= 2 * 1024 * 1024;
    }),

  title: Yup.string()
    .max(80, "Максимум 80 символів")
    .required("Обов'язкове поле"),

  article: Yup.string()
    .max(2500, "Максимум 2500 символів")
    .required("Обов'язкове поле"),

  category: Yup.string().required("Оберіть категорію"),

  date: Yup.string().required("Оберіть дату"),
});
