import { getServerStoryById } from "@/src/lib/api/serverSide/storiesServerApi";
import React from "react";
import { StoryDetails } from "./StoryDetails";
import PopularStories from "@/src/components/PopularStories/PopularStories";

const StoryPage = async ({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) => {
  const { storyId } = await params;
  const story = await getServerStoryById(storyId);
  return (
    <>
      <h1>{story.title}</h1>
      <StoryDetails story={story} />
      <PopularStories />
    </>
  );
};

export default StoryPage;
