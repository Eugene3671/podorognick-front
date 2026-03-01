"use client";
import { Story } from "@/src/types/story";
import Image from "next/image";
import css from "./StoryDetails.module.css";
import { formatDate } from "@/src/utils/formatDate";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  addToSavedStories,
  removeFromSavedStories,
} from "@/src/lib/api/storiesApi";
interface StoryDetailsProps {
  story: Story;
}
export const StoryDetails = ({ story }: StoryDetailsProps) => {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
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
    if (!isAuthenticated) {
      router.push("/auth/login");
      return;
    }
    saveMutation.mutate();
  };

  const handleUnsave = () => {
    unsaveMutation.mutate();
  };
  if (typeof story.category === "string" || typeof story.ownerId === "string")
    return <div>Помилка під час завантаженя</div>;
  return (
    <>
      <div className={css.storyInfo}>
        <p className={css.storyInfoTitle}>
          <strong>Автор статті </strong>
          {story.ownerId.name ?? "Невідомий автор"}
        </p>
        <p className={css.storyInfoTitle}>
          <strong>Опубліковано </strong>
          {formatDate(story.date)}
        </p>
        <p className={css.storyInfoCategory}>
          {story.category.name ?? "Без категорії"}
        </p>
      </div>
      <div className={css.storyImageWrapper}>
        <Image src={story.img} alt="story" fill className={css.storyImage} />
      </div>
      <div className={css.storyArticleWrapper}>
        <p className={css.storyArticle}>{story.article}</p>
        <div className={css.addToSaveWrapper}>
          <p className={css.addToSaveTitle}>Збережіть собі історію</p>
          <p className={css.addToSaveDescr}>
            Вона буде доступна у вашому профілі у розділі збережене
          </p>
          <button className={`buttonBlue ${css.addToSaveBtn}`} type="button">
            {" "}
            Зберегти aбо видали
          </button>
        </div>
      </div>
    </>
  );
};
