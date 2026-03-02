"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory, CreateStoryDto } from "@/src/lib/api/storiesApi";
import { CreateStoryFormValues } from "@/src/types/story";
import StoryForm from "@/src/components/StoryForm/StoryForm";
import { useAuthStore } from "@/src/lib/store/authStore";
import EmptyState from "@/src/components/ui/EmptyState/EmptyState";

export default function CreateStoryPage() {
  const { isAuthenticated } = useAuthStore();

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

  return isAuthenticated ? (
    <StoryForm
      initialValues={initialValues}
      onSubmit={mutation.mutate}
      buttonText="Create Story"
    />
  ) : (
    <div className="container">
      <EmptyState
        title="Поділіться своїм досвідом подорожей з іншими мандрівниками.
  Увійдіть або створіть акаунт, щоб почати."
        buttonText="Увійти"
        onButtonClick={() => {
          router.push("/auth/login");
        }}
      />
    </div>
  );
}
