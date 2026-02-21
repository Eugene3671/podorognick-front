import { Story } from "@/src/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useEffect, useState } from "react";
import css from "./TravellersStories.module.css";

interface TravellersStoriesProps {
  stories: Story[];
  currentUser: User | null;
}

interface FullStory extends Story {
  author: User;
  category: Category;
}

export default function TravellersStories({
  stories,
  currentUser,
}: TravellersStoriesProps) {
  const [fullStories, setFullStories] = useState<FullStory[]>([]);

  useEffect(() => {
    async function loadStories() {
      const fullStoriesFromDB = await Promise.all(
        stories.map(async (story) => {
          const author = await findAuthorById(story.ownerId);
          const category = await findCategoryById(story.category);
          return { ...story, author, category };
        }),
      );
      setFullStories(fullStoriesFromDB);
    }

    loadStories();
  }, [stories]);

  const handleShowMoreClick = () => {};
  return (
    <>
      <ul className={css.travellerStoriesList}>
        {fullStories.map((story) => (
          <TravellersStoriesItem
            key={story.id}
            category={story.category}
            story={story}
            author={story.author}
            currentUser={currentUser}
          />
        ))}
      </ul>
      <button className={css.paginationButton} onClick={handleShowMoreClick}>
        Переглянути всі
      </button>
    </>
  );
}
