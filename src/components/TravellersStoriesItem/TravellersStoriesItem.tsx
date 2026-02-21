"use client";

import Image from "next/image";
import Link from "next/link";
import css from "./TravellersStoriesItem.module.css";
import { Story } from "@/src/types/story";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TravellersStoriesItemProps {
  category: Category;
  story: Story;
  author: User;
  currentUser: User | null;
}
export default function TravellersStoriesItem({
  category,
  story,
  author,
  currentUser,
}: TravellersStoriesItemProps) {
  const router = useRouter();
  const [favoriteCount, setFavoriteCount] = useState(story.favoriteCount);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSave = async () => {
    if (!currentUser) {
      router.push("/auth/login");
      return;
    }

    setIsSaved(true);
    setFavoriteCount((count) => count + 1);

    try {
      const res = await fetch(`/api/stories/${story.id}/favorite`, {
        method: "POST",
      });

      if (!res.ok) throw new Error();
    } catch {
      setIsSaved(false);
      setFavoriteCount((c) => c - 1);
    }
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
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </li>
  );
}
