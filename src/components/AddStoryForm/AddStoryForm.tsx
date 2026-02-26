"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory } from "@/src/lib/api/storiesApi";
import css from "./AddStoryForm.module.css";

export default function AddStoryForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [article, setArticle] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const isFormValid = useMemo(() => {
    return (
      title.trim().length > 2 &&
      article.trim().length > 10 &&
      category.trim() !== "" &&
      image !== null
    );
  }, [title, article, category, image]);

  const { mutate, isPending, isError } = useMutation({
    mutationFn: createStory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      router.push("/stories");
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid) return;

    mutate({
      title,
      article,
      category, // <-- ID категорії
      img: image,
      date: new Date().toISOString(),
    });
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className={css.container}>
      <h1 className={css.title}>Створити історію</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label>Фото</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
            disabled={isPending}
          />
        </div>

        <div className={css.formGroup}>
          <label>Заголовок</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label>Категорія</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            disabled={isPending}
            required
          >
            <option value="">Оберіть категорію</option>

            {/* TODO: замінити на реальні ID з API */}
            <option value="ID_EUROPE">Європа</option>
            <option value="ID_ASIA">Азія</option>
            <option value="ID_DESERTS">Пустелі</option>
            <option value="ID_AFRICA">Африка</option>
          </select>
        </div>

        <div className={css.formGroup}>
          <label>Текст історії</label>
          <textarea
            rows={6}
            value={article}
            onChange={(e) => setArticle(e.target.value)}
            disabled={isPending}
            required
          />
        </div>

        {isError && (
          <p className={css.error}>
            Помилка створення історії. Спробуйте ще раз.
          </p>
        )}

        <div className={css.actions}>
          <button type="submit" disabled={!isFormValid || isPending}>
            Зберегти
          </button>

          <button
            type="button"
            onClick={handleCancel}
            disabled={isPending}
            className={css.cancelBtn}
          >
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
}
