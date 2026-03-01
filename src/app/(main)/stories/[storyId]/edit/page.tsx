"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getStoryById, updateStory } from "@/src/lib/api/storiesApi";
import { Story } from "@/src/types/story";
import StoryForm, {
  StoryFormValues,
} from "@/src/components/StoryForm/StoryForm";

export default function EditStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();
  const router = useRouter();

  const [story, setStory] = useState<Story | null>(null);
  const [initialValues, setInitialValues] = useState<StoryFormValues | null>(
    null,
  );

  useEffect(() => {
    if (!storyId) return;

    async function fetchStory() {
      try {
        const story = await getStoryById(storyId);
        setStory(story);

        setInitialValues({
          img: null, // файл не можемо заповнити автоматично
          title: story.title || "",
          category:
            typeof story.category === "string"
              ? story.category
              : story.category?._id || "",
          article: story.article || "",
          date: story.date ? story.date.slice(0, 10) : "",
        });
      } catch (err) {
        console.error("Помилка при завантаженні історії:", err);
      }
    }

    fetchStory();
  }, [storyId]);
  const handleSubmit = async (values: StoryFormValues) => {
    if (!storyId) return;

    try {
      await updateStory(storyId, values);
      router.push("/stories");
    } catch (err) {
      console.error("Помилка при оновленні історії:", err);
    }
  };

  if (!initialValues || !story) return <div>Loading...</div>;

  return (
    <StoryForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
      buttonText="Оновити історію"
      currentImage={story.img}
    />
  );
}
