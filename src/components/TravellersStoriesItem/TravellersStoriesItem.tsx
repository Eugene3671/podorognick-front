"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import { useState } from "react";
import "@/src/app/globals.css";
import { useMutation } from "@tanstack/react-query";
import { Story } from "@/src/types/story";
import {
  addToSavedStories,
  removeFromSavedStories,
} from "@/src/lib/api/storiesApi";
import { useAuthStore } from "@/src/lib/store/authStore";
import toast from "react-hot-toast";
import ModalWrapper from "../ui/ModalWrapper/ModalWrapper";
import Button from "../Button/Button";
interface TravellersStoriesItemProps {
  story: Story;
}
export default function TravellersStoriesItem({
  story,
}: TravellersStoriesItemProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuthStore();
  const [favoriteCount, setFavoriteCount] = useState<number>(
    story.favoriteCount,
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const saveMutation = useMutation({
    mutationFn: () => addToSavedStories(story._id),

    onMutate: () => {
      setIsSaved(true);
      setFavoriteCount((favCount) => favCount + 1);
    },

    onError: (error) => {
      setIsSaved(false);
      setFavoriteCount((favCount) => favCount - 1);
      toast.error(`Сталася помилка: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Історію було збережено!");
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: () => removeFromSavedStories(story._id),
    onMutate: () => {
      setIsSaved(false);
      setFavoriteCount((favCount) => favCount - 1);
    },
    onError: (error) => {
      setIsSaved(true);
      setFavoriteCount((favCount) => favCount + 1);
      toast.error(`Сталася помилка: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Історію було видалено зі збережених.");
    },
  });

  const handleSave = () => {
    console.log("Is clicked");
    setIsLoading(true);

    if (!isAuthenticated) {
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }
    saveMutation.mutate();
    setIsLoading(false);
  };

  const handleUnsave = () => {
    unsaveMutation.mutate();
  };
  if (typeof story.ownerId === "string" || typeof story.category === "string") {
    return null;
  }
  return (
    <>
      {isModalOpen && (
        <ModalWrapper isOpen={true} onClose={() => setIsModalOpen(false)}>
          <div className={css.modalContent}>
            <h3 className={css.modalTitle}>Помилка під час збереження</h3>
            <p className={css.modalText}>
              Щоб зберегти статтю вам треба увійти, якщо ще немає облікового
              запису зареєструйтесь.
            </p>
            <div className={css.modalButtonsWrapper}>
              <Button
                className={`buttonGrey ${css.modalButton}`}
                href="/auth/login"
              >
                Увійти
              </Button>
              <Button
                className={`buttonBlue ${css.modalButton}`}
                href="/auth/register"
              >
                Зареєструватись
              </Button>
            </div>
          </div>
        </ModalWrapper>
      )}
      <li className={css.travellerStoryItem}>
        <div className={css.storyThumbnailWrapper}>
          <Image
            src={story.img}
            alt="placeholder"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1440px) 340px, 421px"
            style={{ objectFit: "cover" }}
            loading="eager"
            className={css.storyThumbnail}
          />
        </div>

        <div className={css.storyWrapper}>
          <div className={css.storyContents}>
            <p className={css.regionTag}>
              {story.category?.name ?? "Без категорії"}
            </p>
            <h4 className={css.storyTitle}>{story.title}</h4>
            <p className={css.storyText}>{story.article}</p>
          </div>
          <div className={css.storyAuthor}>
            <Image
              src={story.ownerId?.avatarUrl ?? "/default-avatar.png"}
              alt="avatar"
              width={48}
              height={48}
              className={css.authorAvatar}
            />
            <div className={css.authorInfo}>
              <p className={css.authorName}>
                {story.ownerId?.name ?? "Невідомий автор"}
              </p>
              <div className={css.storyInfo}>
                <p className={css.storyDate}>{story.date}</p>
                <span className={css.separator}>•</span>
                <p className={css.numberOfSaves}>
                  {favoriteCount}
                  <svg width="12" height="12" className={css.saveIcon}>
                    <use href="/sprite.svg#icon-bookmark"></use>
                  </svg>
                </p>
              </div>
            </div>
          </div>
          <div className={css.buttonsWrapper}>
            <Link
              href={`/stories/${story._id}`}
              className={`buttonGrey ${css.storyDetailsLink}`}
            >
              Переглянути статтю
            </Link>
            <button
              className={`buttonGrey ${isSaved ? css.saveButtonActive : css.saveButton}`}
              onClick={isSaved ? handleUnsave : handleSave}
            >
              {isLoading ||
              saveMutation.isPending ||
              unsaveMutation.isPending ? (
                <span className={css.loader}></span>
              ) : (
                <svg width="24" height="24" className={css.saveIconButton}>
                  <use href="/sprite.svg#icon-bookmark"></use>
                </svg>
              )}
            </button>
          </div>
        </div>
      </li>
    </>
  );
}
