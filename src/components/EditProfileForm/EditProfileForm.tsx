"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { nextServer } from "@/src/lib/api/api";
import styles from "./EditProfileForm.module.css";

interface User {
  avatar?: string;
  about?: string;
}

export default function EditProfileForm() {
  const queryClient = useQueryClient();

  const { data: user } = useQuery<User>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const { data } = await nextServer.get("/users/me");
      return data;
    },
  });

  const [about, setAbout] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (user) {
      setAbout(user.about || "");
      setAvatar(user.avatar || null);
    }
  }, [user]);

  const mutation = useMutation({
    mutationFn: async () => {
      
      await nextServer.patch("/users/me", { about });

      
      if (file) {
        const formData = new FormData();
formData.append("avatarUrl", file);

        await nextServer.patch("/users/me/avatar", formData);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selected = e.target.files[0];
    setFile(selected);
    setAvatar(URL.createObjectURL(selected));
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setFile(null);
  };

  return (
    <div className={styles.profedit}>
      <div className={styles["profedit__container"]}>
        <h1 className={styles["profedit__heading"]}>
          Давайте познайомимось ближче
        </h1>

        <div className={styles["profedit__avatar-section"]}>
          <span>Аватар</span>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "25px",
            }}
          >
            <div className={styles["profedit__avatar-wrapper"]}>
              {avatar ? (
                <img
                  src={avatar}
                  alt="avatar"
                  className={styles["profedit__avatar-image"]}
                />
              ) : (
                <div className={styles["profedit__avatar-placeholder"]} />
              )}
            </div>

            {avatar ? (
              <button
                type="button"
                onClick={handleRemoveAvatar}
                className={styles["profedit__avatar-action"]}
              >
                Видалити фото
              </button>
            ) : (
              <label className={styles["profedit__avatar-action"]}>
                Завантажити фото
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>

        <div className={styles["profedit__bio-section"]}>
          <label className={styles["profedit__bio-label"]}>Короткий опис</label>

          <textarea
            maxLength={150}
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            placeholder="Розкажіть більше про вас"
            className={styles["profedit__bio-textarea"]}
          />

          <p className={styles["profedit__bio-counter"]}>
            Залишилось символів: {150 - about.length}
          </p>
        </div>

        <button
          className={`${styles["profedit__submit"]} ${
            mutation.isPending ? styles["profedit__submit--loading"] : ""
          }`}
          onClick={() => mutation.mutate()}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? "Зберігаємо..." : "Зберегти"}
        </button>
      </div>
    </div>
  );
}
