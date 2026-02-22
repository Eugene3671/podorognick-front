"use client";

import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { ReactNode } from "react";
import { getAllStories } from "@/src/lib/api/clientApi";

interface TravellersStoriesProps {
  children?: ReactNode;
}
export default function TravellersStories({
  children,
}: TravellersStoriesProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-stories"],
      queryFn: ({ pageParam = 1 }) =>
        getAllStories({ page: pageParam, perPage: 3 }),
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
      {children ?? <div className={css.buttonWrapper}>{children}</div>}

      {/* Це для сторінки stories */}
      {/* {hasNextPage && (
        <button
          className={css.paginationButton}
          onClick={() => fetchNextPage()}
        >
          Переглянути всі
        </button>
      )} */}
    </>
  );
}
