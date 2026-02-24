"use client";

import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { ReactNode, useEffect, useState } from "react";
import { getAllStories } from "@/src/lib/services/stories.service";
import Link from "next/link";

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
  const [initialPerPage, setInitialPerPage] = useState(perPage);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(
      "(min-width: 768px) and (max-width: 1439px)",
    );

    const handleChange = () => {
      if (mediaQueryList.matches) {
        setInitialPerPage(perPage + 1);
      } else {
        setInitialPerPage(perPage);
      }
    };

    handleChange();
    mediaQueryList.addEventListener("change", handleChange);

    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["popular-stories", initialPerPage],
      queryFn: ({ pageParam = 1 }) =>
        getAllStories({ page: pageParam, perPage: initialPerPage, sort: sort }),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const stories = data?.pages.flatMap((page) => page.stories) ?? [];

  return (
    <>
      <ul className={css.travellerStoriesList}>
        {stories.map((story) => (
          <TravellersStoriesItem key={story._id} story={story} />
        ))}
      </ul>
      <div className={css.buttonWrapper}>
        {buttonType === "loadMore" && hasNextPage ? (
          <button
            className={css.paginationButton}
            onClick={() => fetchNextPage()}
          >
            Показати ще
          </button>
        ) : (
          isFetchingNextPage && <div>Loader</div>
        )}
        {buttonType === "link" && (
          <Link href="/stories" className={css.paginationButton}>
            Переглянути всі
          </Link>
        )}
      </div>
    </>
  );
}
