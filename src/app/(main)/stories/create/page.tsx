"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStory, CreateStoryDto } from "@/src/lib/api/storiesApi";
import { CreateStoryFormValues } from "@/src/types/story";
import AddStoryForm from "@/src/components/AddStoryForm/AddStoryForm";

export default function CreateStoryPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const initialValues: CreateStoryFormValues = {
    title: "",
    article: "",
    category: "",
    img: null,
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
    <AddStoryForm
      initialValues={initialValues}
      onSubmit={mutation.mutate}
      buttonText="Create Story"
      isSubmitting={mutation.isPending}
    />
  );
}
