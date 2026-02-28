import React from "react";
import { getStoryById } from "@/src/lib/api/storiesApi";

interface EditStoryPageProps {
  params: Promise<{ storyId: string }>;
}

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { storyId } = await params;
  const story = await getStoryById(storyId);
  return (
    <div>
      <h1>Редагувати історію</h1>
      <p>ID історії: {storyId}</p>
      <p>Title: {story.title}</p>
    </div>
  );
}
