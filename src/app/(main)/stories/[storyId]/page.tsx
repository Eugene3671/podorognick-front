import { getServerStoryById } from "@/src/lib/api/serverSide/storiesServerApi";
import React from "react";
import { StoryDetails } from "./StoryDetails";
import PopularStories from "@/src/components/PopularStories/PopularStories";
import css from "./StoryDetails.module.css";
const StoryPage = async ({
  params,
}: {
  params: Promise<{ storyId: string }>;
}) => {
  const { storyId } = await params;
  const story = await getServerStoryById(storyId);
  return (
    <>
      <section className={`${css.stroryDatailsContainer} container`}>
        <h1 className={css.storyTitle}>{story.title}</h1>
        <StoryDetails story={story} />
      </section>
      <PopularStories />
    </>
  );
};

export default StoryPage;
