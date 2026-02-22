"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import { Story } from "@/src/types/story";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Category } from "@/src/types/category";
import {
  addToSavedStories,
  FullStory,
  removeFromSavedStories,
} from "@/src/lib/api";
import { useMutation } from "@tanstack/react-query";

interface TravellersStoriesItemProps {
  story: FullStory;
  currentUser: User | null;
}
export default function TravellersStoriesItem({
  story,
  currentUser,
}: TravellersStoriesItemProps) {
  const router = useRouter();
  const [favoriteCount, setFavoriteCount] = useState<number>(
    story.favoriteCount,
  );
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const saveMutation = useMutation({
    mutationFn: () => addToSavedStories(story.id),

    onMutate: () => {
      setIsSaved(true);
      setFavoriteCount((c) => c + 1);
    },

    onError: () => {
      setIsSaved(false);
      setFavoriteCount((c) => c - 1);
    },
  });

  const unsaveMutation = useMutation({
    mutationFn: () => removeFromSavedStories(story.id),
    onMutate: () => {
      setIsSaved(false);
      setFavoriteCount((c) => c - 1);
    },
    onError: () => {
      setIsSaved(true);
      setFavoriteCount((c) => c + 1);
    },
  });

  const handleSave = () => {
    if (!currentUser) {
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
      <Image
        src={story.img}
        alt="placeholder"
        width={421}
        height={280}
        className={css.storyThumbnail}
      />
      <div className={css.storyWrapper}>
        <div className={css.storyContents}>
          <p className={css.regionTag}>{category.name}</p>
          <h4 className={css.storyTitle}>{story.title}</h4>
          <p className={css.storyText}>{story.article}</p>
        </div>
        <div className={css.storyAuthor}>
          <Image
            src={author.avatarUrl}
            alt="avatar"
            width={54}
            height={54}
            className={css.authorAvatar}
          />
          <div className={css.authorInfo}>
            <p className={css.authorName}>{author.name}</p>
            <div className={css.storyInfo}>
              <p className={css.storyDate}>{story.date}</p>
              <span className={css.separator}>•</span>
              <p className={css.numberOfSaves}>{favoriteCount}</p>
            </div>
          </div>
        </div>
        <Link href="/stories/[storyId]" className={css.storyDetailsLink}>
          Переглянути статтю
        </Link>
        <button
          className={isSaved ? css.saveButtonActive : css.saveButton}
          onClick={isSaved ? handleUnsave : handleSave}
        >
          {saveMutation.isPending || unsaveMutation.isPending ? (
            <span className={css.loader}></span>
          ) : (
            <svg>
              <use />
            </svg>
          )}
        </button>
      </div>
    </li>
  );
}
