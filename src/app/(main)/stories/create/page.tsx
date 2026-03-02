"use client";

import styles from "./CreateStoryPage.module.css";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory, CreateStoryDto } from "@/src/lib/api/storiesApi";
import { CreateStoryFormValues } from "@/src/types/story";
import StoryForm from "@/src/components/StoryForm/StoryForm";

export default function CreateStoryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialValues: CreateStoryFormValues = {
    title: "",
    article: "",
    category: "",
    img: null,
    date: "",
  };

  const mutation = useMutation({
    mutationFn: (values: CreateStoryFormValues) => {
      const dto: CreateStoryDto = {
        title: values.title,
        article: values.article,
        category: values.category,
        img: values.img,
        date: new Date().toISOString(),
      };

      return createStory(dto);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stories"] });
      router.push("/stories");
    },
  });

  return (
    <div className={`${styles.container} container`}>
      <h1 className={styles.title}>Створити нову історію</h1>
      <StoryForm
        initialValues={initialValues}
        onSubmit={mutation.mutate}
        buttonText="Create Story"
      />
    </div>
  );
}
