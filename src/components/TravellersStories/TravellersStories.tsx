"use client";

import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { useEffect, useMemo, useState } from "react";
import { getAllStories } from "@/src/lib/api/storiesApi";
import Link from "next/link";
import LoaderEl from "../LoaderEl/LoaderEl";
import { useBreakpoint } from "@/src/hooks/useBreakpoint";
import { Category } from "@/src/types/category";

interface TravellersStoriesProps {
  sort: "popular" | "new";
  pageType: "popular" | "stories";
  buttonType: "loadMore" | "link";
  category?: Category;
}

export default function TravellersStories({
  sort,
  pageType,
  buttonType,
  category,
}: TravellersStoriesProps) {
  const breakpoint = useBreakpoint();
  const hasBreakpoint = breakpoint !== null;

  const loadStep = breakpoint === "tablet" ? 4 : 3;

  const initialVisibleStories = useMemo(() => {
    if (pageType === "stories") {
      return breakpoint === "tablet" ? 8 : 9;
    } else {
      return breakpoint === "tablet" ? 4 : 3;
    }
  }, [breakpoint, pageType]);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["stories", pageType, sort, breakpoint, category],
      queryFn: ({ pageParam = 1 }) =>
        getAllStories({
          page: pageParam,
          perPage: initialVisibleStories,
          sort,
          category,
        }),
      initialPageParam: 1,
      enabled: hasBreakpoint,
      getNextPageParam: (lastPage) => {
        return lastPage.page < lastPage.totalPages
          ? lastPage.page + 1
          : undefined;
      },
    });

  const allStories =
    Array.from(
      new Map(
        data?.pages
          .flatMap((page) => page.stories)
          .map((story) => [story._id, story]),
      ).values(),
    ) ?? [];

  const [visibleStories, setVisibleStories] = useState(initialVisibleStories);

  useEffect(() => {
    setVisibleStories(initialVisibleStories);
  }, [initialVisibleStories]);

  const handleLoadMore = () => {
    const nextVisible = visibleStories + loadStep;

    if (nextVisible <= allStories.length) {
      setVisibleStories(nextVisible);
      return;
    }

    if (hasNextPage) {
      fetchNextPage();
      setVisibleStories(nextVisible);
    }
  };

  const shoulShowLoadButton =
    buttonType === "loadMore" &&
    (hasNextPage || visibleStories < allStories.length);

  if (!hasBreakpoint || isLoading) {
    return (
      <div className={css.loaderWrapper}>
        <LoaderEl />
      </div>
    );
  }
  return (
    <>
      {isLoading ? (
        <div className={css.loaderWrapper}>
          <LoaderEl />
        </div>
      ) : (
        <>
          <ul className={css.travellerStoriesList}>
            {allStories.slice(0, visibleStories).map((story) => (
              <TravellersStoriesItem key={story._id} story={story} />
            ))}
          </ul>
          <div className={css.buttonWrapper}>
            {isFetchingNextPage ? (
              <LoaderEl />
            ) : (
              shoulShowLoadButton &&
              !isFetchingNextPage && (
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
