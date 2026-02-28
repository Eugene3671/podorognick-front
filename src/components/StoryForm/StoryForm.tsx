import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import styles from "./StoryForm.module.css";

type Category = {
  _id: string;
  name: string;
};

export type StoryFormValues = {
  img: File | null;
  title: string;
  category: string;
  article: string;
  date: string;
};

type StoryFormProps = {
  initialValues: StoryFormValues;
  onSubmit: (values: StoryFormValues) => void;
  buttonText: string;
  categories: Category[];
};

const StoryForm = ({
  initialValues,
  onSubmit,
  buttonText,
  categories,
}: StoryFormProps) => {
  const [preview, setPreview] = useState<string | null>(
    initialValues.img ? URL.createObjectURL(initialValues.img) : null,
  );

  const StorySchemaValidation = Yup.object().shape({
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

  return (
    <div className={styles.formWrap}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={StorySchemaValidation}
      >
        {({ setFieldValue, values }) => (
          <Form className={styles.form}>
            <label className={styles.label}>
              <span>Обкладинка статті</span>

              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setFieldValue("img", file);
                  setPreview(URL.createObjectURL(file));
                }}
                className={styles.input}
              />

              {preview && (
                <img src={preview} alt="preview" className={styles.preview} />
              )}

              <ErrorMessage name="img" component="p" className={styles.error} />
            </label>

            <label className={styles.label}>
              <span>Заголовок</span>
              <Field
                type="text"
                name="title"
                placeholder="Введіть заголовок історії"
                className={styles.input}
              />
              <ErrorMessage
                name="title"
                component="p"
                className={styles.error}
              />
            </label>

            <label className={styles.label}>
              <span>Категорія</span>

              <select
                name="category"
                className={styles.input}
                value={values.category}
                onChange={(e) => setFieldValue("category", e.target.value)}
              >
                <option value="">Оберіть категорію</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <ErrorMessage
                name="category"
                component="p"
                className={styles.error}
              />
            </label>

            <label className={styles.label}>
              <span>Текст історії</span>
              <Field
                as="textarea"
                name="article"
                placeholder="Ваша історія тут"
                className={styles.textarea}
              />
              <ErrorMessage
                name="article"
                component="p"
                className={styles.error}
              />
            </label>
            <label className={styles.label}>
              <span>Дата</span>
              <Field type="date" name="date" className={styles.input} />
              <ErrorMessage
                name="date"
                component="p"
                className={styles.error}
              />
            </label>

            <div className={styles.buttons}>
              <button type="submit" className={styles.saveBtn}>
                {buttonText}
              </button>
              <button type="button" className={styles.cancelBtn}>
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default StoryForm;
