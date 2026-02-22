"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/src/hooks/useAuth";
import { Story } from "@/src/types/story";
import {
  addToSavedStories,
  removeFromSavedStories,
} from "@/src/lib/services/stories.service";
interface TravellersStoriesItemProps {
  story: Story;
}
export default function TravellersStoriesItem({
  story,
}: TravellersStoriesItemProps) {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
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

    onError: () => {
      setIsSaved(false);
      setFavoriteCount((favCount) => favCount - 1);
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: () => removeFromSavedStories(story._id),
    onMutate: () => {
      setIsSaved(false);
      setFavoriteCount((favCount) => favCount - 1);
    },
    onError: () => {
      setIsSaved(true);
      setFavoriteCount((favCount) => favCount + 1);
    },
  });

  const handleSave = () => {
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    saveMutation.mutate();
  };

  const handleUnsave = () => {
    unsaveMutation.mutate();
  };

  return (
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
          <p className={css.regionTag}>{story.category.name}</p>
          <h4 className={css.storyTitle}>{story.title}</h4>
          <p className={css.storyText}>{story.article}</p>
        </div>
        <div className={css.storyAuthor}>
          <Image
            src={story.ownerId.avatarUrl}
            alt="avatar"
            width={54}
            height={54}
            className={css.authorAvatar}
          />
          <div className={css.authorInfo}>
            <p className={css.authorName}>{story.ownerId.name}</p>
            <div className={css.storyInfo}>
              <p className={css.storyDate}>{story.date}</p>
              <span className={css.separator}>•</span>
              <p className={css.numberOfSaves}>
                {favoriteCount}
                <svg width="16" height="16" className={css.saveIcon}>
                  <use href="/sprite.svg#icon-bookmark"></use>
                </svg>
              </p>
            </div>
          </div>
        </div>
        <div className={css.buttonsWrapper}>
          <Link href={`/stories/${story._id}`} className={css.storyDetailsLink}>
            Переглянути статтю
          </Link>
          <button
            className={isSaved ? css.saveButtonActive : css.saveButton}
            onClick={isSaved ? handleUnsave : handleSave}
          >
            {saveMutation.isPending || unsaveMutation.isPending ? (
              <span className={css.loader}></span>
            ) : (
              <svg width="24" height="24" className={css.saveIcon}>
                <use href="/sprite.svg#icon-bookmark"></use>
              </svg>
            )}
          </button>
        </div>
      </div>
    </li>
  );
}
