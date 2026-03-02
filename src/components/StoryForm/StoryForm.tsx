"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import styles from "./StoryForm.module.css";
import { useCategories } from "@/src/hooks/useCategories";

import { StorySchemaValidation } from "@/src/validation/storySchemaValid";
import Image from "next/image";
import clsx from "clsx";

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
        validateOptions={{ context: { currentImage } }}
        enableReinitialize
      >
        {({ setFieldValue, values, resetForm, dirty, isValid }) => {
          const isPhotoReady = !!currentImage || !!values.img;
          const canSubmit =
            isValid && isPhotoReady && (currentImage ? dirty : true);

          return (
            <div className={styles.formLayout}>
              <div className={styles.justForm}>
                <Form className={styles.form}>
                  <div className={styles.fields}>
                    <label className={styles.label}>
                      <span>Обкладинка статті</span>
                      <div className={styles.imageWrapperPreview}>
                        <Image
                          src={previewImage || "/path-to-your-placeholder.png"}
                          alt="preview"
                          fill
                          className={styles.preview}
                        />
                      </div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (!file) return;

                          setFieldValue("img", file);
                          setPreview(URL.createObjectURL(file));
                        }}
                        className={styles.fileInput}
                      />

                      <ErrorMessage
                        name="img"
                        component="p"
                        className={styles.error}
                      />
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
                        onChange={(e) =>
                          setFieldValue("category", e.target.value)
                        }
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
                  </div>

                  <div className={styles.buttons}>
                    <button
                      type="submit"
                      className={clsx("buttonBlue", styles.saveBtn)}
                      disabled={!canSubmit}
                    >
                      {buttonText}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        resetForm();
                        setPreview(null);
                      }}
                      className={`buttonGrey ${styles.cancelBtn}`}
                    >
                      Відмінити
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          );
        }}
      </Formik>
    </div>
  );
};

export default StoryForm;
