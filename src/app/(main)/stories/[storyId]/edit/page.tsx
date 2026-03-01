"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getStoryById } from "@/src/lib/api/storiesApi";
import StoryForm from "@/components/StoryForm/StoryForm";

export default function EditStoryPage() {
  const { storyId } = useParams<{ storyId: string }>();

  const [story, setStory] = useState(null);

  useEffect(() => {
    async function fetchStory() {
      const data = await getStoryById(storyId);
      setStory(data);
    }

    if (storyId) {
      fetchStory();
    }
  }, [storyId]);

  if (!story) return <div>Loading...</div>;

  return (
    <div>
      <h1>Редагувати історію</h1>

      <StoryForm initialValues={story} isEditMode storyId={storyId} />
    </div>
  );
}
