"use client";

import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { ReactNode, useEffect, useState } from "react";
import { getAllStories } from "@/src/lib/api/storiesApi";
import Link from "next/link";
import LoaderEl from "../LoaderEl/LoaderEl";

interface TravellersStoriesProps {
  perPage: number;
  loadStep?: number;
  sort: string;
  buttonType: string;
}

export default function TravellersStories({
  perPage,
  sort,
  buttonType,
}: TravellersStoriesProps) {
  const [pageSize, setPageSize] = useState(perPage);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "(min-width: 768px) and (max-width: 1439px)",
    );
    const handleChange = () => {
      setPageSize(mediaQueryList.matches ? perPage + 1 : perPage);
    };
    handleChange();
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [perPage]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["popular-stories", pageSize, sort],
      queryFn: ({ pageParam = 1 }) =>
        getAllStories({ page: pageParam, perPage: pageSize, sort: sort }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage) {
          return undefined;
        }
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const handleLoadMore = () => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  };

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];
  return (
    <>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <LoaderEl />
        </div>
      ) : (
        <>
          <ul className={css.travellerStoriesList}>
            {stories.map((story) => (
              <TravellersStoriesItem key={story._id} story={story} />
            ))}
          </ul>
          <div className={css.buttonWrapper}>
            {isFetchingNextPage ? (
              <LoaderEl />
            ) : (
              buttonType === "loadMore" &&
              hasNextPage && (
                <button
                  className={css.paginationButton}
                  onClick={handleLoadMore}
                  disabled={isFetchingNextPage}
                >
                  Показати ще
                </button>
              )
            )}
            {buttonType === "link" && (
              <Link href="/stories" className={css.paginationButton}>
                Переглянути всі
              </Link>
            )}
          </div>
        </>
      )}
    </>
  );
}
