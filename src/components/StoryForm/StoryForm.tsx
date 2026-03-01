"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import styles from "./StoryForm.module.css";
import { useCategories } from "@/src/hooks/useCategories";

import { StorySchemaValidation } from "@/src/validation/storySchemaValid";

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
  currentImage?: string;
};

const StoryForm = ({
  initialValues,
  onSubmit,
  buttonText,
  currentImage,
}: StoryFormProps) => {
  const { data: categories = [], isLoading } = useCategories();

  const [preview, setPreview] = useState<string | null>(null);

  const previewImage = preview ?? currentImage ?? null;

  return (
    <div className={styles.formWrap}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={StorySchemaValidation}
        enableReinitialize
      >
        {({ setFieldValue, values, resetForm }) => (
          <Form className={styles.form}>
            <label className={styles.label}>
              <span>Обкладинка статті</span>

              {previewImage && (
                <img
                  src={previewImage}
                  alt="preview"
                  className={styles.preview}
                />
              )}

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
                disabled={isLoading}
              >
                <option value="">
                  {isLoading ? "Завантаження..." : "Оберіть категорію"}
                </option>

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

              <button
                type="button"
                onClick={() => resetForm()}
                className={styles.cancelBtn}
              >
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
