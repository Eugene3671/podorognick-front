"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import { useEffect, useState } from "react";
import "@/src/app/globals.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Story } from "@/src/types/story";
import {
  addToSavedStories,
  removeFromSavedStories,
} from "@/src/lib/api/storiesApi";
import { useAuthStore } from "@/src/lib/store/authStore";
import toast from "react-hot-toast";
import ModalWrapper from "../ui/ModalWrapper/ModalWrapper";
import { formatDate } from "@/src/utils/formatDate";
import { useSavedStoriesStore } from "@/src/lib/store/savedStore";
interface TravellersStoriesItemProps {
  story: Story;
  mode?: string;
}

export default function TravellersStoriesItem({
  story,
  mode,
}: TravellersStoriesItemProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { isAuthenticated } = useAuthStore();
  const [favoriteCount, setFavoriteCount] = useState<number>(
    story.favoriteCount,
  );

  const { savedStoryIds, addSavedStoryId, removeSavedStoryId } =
    useSavedStoriesStore();

  const [isSaved, setIsSaved] = useState(() =>
    savedStoryIds.includes(story._id),
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsSaved(savedStoryIds.includes(story._id));
  }, [savedStoryIds, story._id]);

  const queryClient = useQueryClient();

  const saveMutation = useMutation({
    mutationFn: () => addToSavedStories(story._id),
    onMutate: () => {
      setIsSaved(true);
      addSavedStoryId(story._id);
      setFavoriteCount((prev) => prev + 1);
    },
    onError: (error) => {
      setIsSaved(false);
      removeSavedStoryId(story._id);
      setFavoriteCount((prev) => prev - 1);
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
      removeSavedStoryId(story._id);
      setFavoriteCount((prev) => prev - 1);
    },
    onError: (error) => {
      setIsSaved(true);
      addSavedStoryId(story._id);
      setFavoriteCount((prev) => prev + 1);
      toast.error(`Сталася помилка: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Історію було видалено зі збережених.");
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      queryClient.invalidateQueries({ queryKey: ["savedStories"] });
    },
  });

  const handleSave = () => {
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

  const isPending = saveMutation.isPending || unsaveMutation.isPending;

  return (
    <>
      <ModalWrapper
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Помилка під час збереження"
        description="Щоб зберегти статтю вам треба увійти, якщо ще немає облікового
            запису зареєструйтесь."
        hrefBtnLeft="/auth/login"
        hrefBtnRight="/auth/register"
        textBtnLeft="Увійти"
        textBtnRight="Зареєструватись"
      />

      <li className={css.travellerStoryItem}>
        <div className={css.storyThumbnailWrapper}>
          <Image
            src={story.img ?? "/public/path-to-your-placeholder.png"}
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
              src={
                story.ownerId?.avatarUrl ??
                "/public/path-to-your-placeholder.png"
              }
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
                <p className={css.storyDate}>{formatDate(story.date)}</p>
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

            {mode === "myOwnStories" ? (
              <Link
                href={`/stories/${story._id}/edit`}
                className={`buttonGrey ${css.saveButton}`}
              >
                <svg width="24" height="24" className={css.saveIconButton}>
                  <use href="/sprite.svg#icon-edit"></use>
                </svg>
              </Link>
            ) : (
              <button
                className={`buttonGrey ${isSaved ? css.saveButtonActive : css.saveButton}`}
                onClick={isSaved ? handleUnsave : handleSave}
                disabled={isPending}
              >
                {isPending || isLoading ? (
                  <span className={css.loader}></span>
                ) : (
                  <svg width="24" height="24" className={css.saveIconButton}>
                    <use href="/sprite.svg#icon-bookmark"></use>
                  </svg>
                )}
              </button>
            )}
          </div>
        </div>
      </li>
    </>
  );
}
