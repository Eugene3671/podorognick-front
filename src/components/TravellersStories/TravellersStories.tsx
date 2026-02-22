"use client";

import { Story } from "@/src/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { Category } from "@/src/types/category";
import { getAllStories } from "@/src/lib/api";

interface TravellersStoriesProps {
  currentUser: User | null;
}
// interface FullStory extends Story {
//   author: User;
//   category: Category;
// }

export default function TravellersStories({
  currentUser,
}: TravellersStoriesProps) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["popular-stories"],
    queryFn: ({ queryKey, pageParam }) => {
      return getStories({ page: pageParam, perPage: 3 });
    },
    initialPageParam: 0,
    enabled: true,
    getNextPageParam: (lastResponse) => {
      const nextPage = lastResponse.page + 1;
      return nextPage < lastResponse.totalPages ? nextPage : undefined;
    },
  });

  //   useEffect(() => {
  //     if (!data) return;

  //     const pages = data.pages;

  //     async function getStoriesWithAuthors() {
  //       const storiesFromPages = pages.flatMap((page) => page.stories);

  //       const fullStories = await Promise.all(
  //         storiesFromPages.map(async (story) => {
  //           const author = await findAuthorById(story.ownerId);
  //           const category = await findCategoryById(story.category);
  //           return { ...story, author, category };
  //         }),
  //       );

  //       setFullStories(fullStories);
  //     }

  //     getStoriesWithAuthors();
  //   }, [data]);

  return (
    <>
      <ul className={css.travellerStoriesList}>
        {fullStories.map((story) => (
          <TravellersStoriesItem
            key={story.id}
            story={story}
            currentUser={currentUser}
          />
        ))}
      </ul>
      <button className={css.paginationButton} onClick={() => fetchNextPage()}>
        Переглянути всі
      </button>
    </>
  );
}
