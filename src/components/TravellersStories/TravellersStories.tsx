"use client";

import { Story } from "@/src/types/story";
import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { Category } from "@/src/types/category";
import { getAllStories } from "@/src/lib/api";

export default function TravellersStories() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-stories"],
      queryFn: ({ pageParam = 1 }) =>
        getAllStories({ page: pageParam, perPage: 9 }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  console.log(stories);
  return (
    <>
      <ul className={css.travellerStoriesList}>
        {stories.map((story) => (
          <TravellersStoriesItem key={story._id} story={story} />
        ))}
      </ul>
      <button className={css.paginationButton} onClick={() => fetchNextPage()}>
        Переглянути всі
      </button>
    </>
  );
}
