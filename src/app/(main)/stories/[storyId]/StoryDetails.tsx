"use client";
import { Story } from "@/src/types/story";
import Image from "next/image";
import css from "./StoryDetails.module.css";
import { formatDate } from "@/src/utils/formatDate";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/lib/store/authStore";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  addToSavedStories,
  getSavedStories,
  removeFromSavedStories,
} from "@/src/lib/api/storiesApi";
import ModalWrapper from "@/src/components/ui/ModalWrapper/ModalWrapper";
import Button from "@/src/components/Button/Button";
interface StoryDetailsProps {
  story: Story;
}
export const StoryDetails = ({ story }: StoryDetailsProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    const checkSaved = async () => {
      try {
        const savedStories = await getSavedStories();
        const isAlreadySaved = savedStories.stories.some(
          (saved) => saved._id === story._id,
        );
        setIsSaved(isAlreadySaved);
      } catch (error) {
        console.error(error);
      }
    };

    if (isAuthenticated) {
      checkSaved();
    }
  }, [isAuthenticated, story._id]);

  const saveMutation = useMutation({
    mutationFn: () => addToSavedStories(story._id),

    onMutate: () => {
      setIsSaved(true);
    },

    onError: () => {
      setIsSaved(false);
    },
    onSuccess: () => {},
  });

  const unsaveMutation = useMutation({
    mutationFn: () => removeFromSavedStories(story._id),
    onMutate: () => {
      setIsSaved(false);
    },
    onError: () => {
      setIsSaved(true);
    },
    onSuccess: () => {},
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
          <Button
            type="button"
            onClick={() => {
              if (isAuthenticated) {
                if (isSaved) {
                  handleUnsave();
                } else {
                  handleSave();
                }
              } else {
                setIsModalOpen(true);
              }
            }}
            className={`buttonBlue ${css.addToSaveBtn}`}
          >
            {isSaved ? "Видалити зі збережених" : "Зберегти"}
          </Button>
        </div>
      </div>
    </>
  );
};
