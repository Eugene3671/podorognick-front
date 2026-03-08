"use client";

import TravellersStoriesItem from "../TravellersStoriesItem/TravellersStoriesItem";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import css from "./TravellersStories.module.css";
import { useEffect, useMemo, useState } from "react";
import {
  getAllStories,
  getMyStories,
  getSavedStories,
  StoriesResponse,
} from "@/src/lib/api/storiesApi";
import Link from "next/link";
import LoaderEl from "../LoaderEl/LoaderEl";
import { useBreakpoint } from "@/src/hooks/useBreakpoint";
import { getUserById } from "@/src/lib/api/usersApi";
import EmptyState from "../ui/EmptyState/EmptyState";
import { useAuthStore } from "@/src/lib/store/authStore";
import { Story } from "@/src/types/story";
import { useRouter } from "next/navigation";
import { useSavedStoriesStore } from "@/src/lib/store/savedStore";

type StoryMode =
  | "default"
  | "travellerStories"
  | "myOwnStories"
  | "mySavedStories";
interface TravellersStoriesProps {
  sort: "popular" | "new";
  pageType: "popular" | "stories" | "profile";
  buttonType: "loadMore" | "link";
  category?: string;
  ownerId?: string;
  mode?: StoryMode;
}

export default function TravellersStories({
  sort = "popular",
  pageType,
  buttonType,
  category,
  ownerId,
  mode = "default",
}: TravellersStoriesProps) {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const hasBreakpoint = breakpoint !== null;
  const loadStep = breakpoint === "tablet" ? 4 : 3;
  const router = useRouter();
  const { setSavedStoryIds } = useSavedStoriesStore();
  const { isAuthenticated } = useAuthStore();

  useQuery({
    queryKey: ["savedStories"],
    queryFn: async () => {
      const data = await getSavedStories({ page: 1, perPage: 9 });
      setSavedStoryIds(data.stories.map((s: Story) => s._id));
      return data;
    },
    enabled: isAuthenticated,
  });

  const initialVisibleStories = useMemo(() => {
    if (pageType === "stories") {
      return breakpoint === "tablet" ? 8 : 9;
    } else if (pageType === "profile") {
      return breakpoint === "tablet" ? 4 : 6;
    } else {
      return breakpoint === "tablet" ? 4 : 3;
    }
  }, [breakpoint, pageType]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: [
      "stories",
      pageType,
      sort,
      breakpoint,
      category,
      mode,
      ownerId,
      initialVisibleStories,
    ],
    queryFn: async ({ pageParam = 1 }) => {
      switch (mode) {
        case "myOwnStories":
          return getMyStories({
            page: pageParam,
            perPage: initialVisibleStories,
          });
        case "mySavedStories":
          return getSavedStories({
            page: pageParam,
            perPage: initialVisibleStories,
          });
        case "travellerStories": {
          if (!ownerId) throw new Error("Owner ID is required");
          const data = await getUserById(ownerId, {
            page: pageParam,
            perPage: initialVisibleStories,
          });
          return {
            stories: data.stories,
            page: data.page,
            totalPages: data.totalPages,
            totalStories: data.totalItems,
          } as StoriesResponse;
        }
        default:
          return getAllStories({
            page: pageParam,
            perPage: initialVisibleStories,
            sort,
            category,
          });
      }
    },
    initialPageParam: 1,
    enabled: hasBreakpoint,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.totalPages
        ? lastPage.page + 1
        : undefined;
    },
    throwOnError: true,
  });

  const allStories = useMemo(
    () =>
      Array.from(
        new Map(
          (data?.pages.flatMap((page) => page.stories) ?? []).map((story) => [
            story._id,
            story,
          ]),
        ).values(),
      ),
    [data],
  );

  const [visibleStories, setVisibleStories] = useState(initialVisibleStories);

  useEffect(() => {
    setVisibleStories(initialVisibleStories);
  }, [initialVisibleStories]);

  const handleLoadMore = () => {
    const nextVisible = visibleStories + loadStep;

    if (nextVisible < allStories.length) {
      setVisibleStories(nextVisible);
      return;
    }

    setVisibleStories(allStories.length);

    if (hasNextPage) {
      fetchNextPage().then(() => {
        setVisibleStories(nextVisible);
      });
    }
  };

  const shouldShowLoadButton =
    buttonType === "loadMore" &&
    !isFetchingNextPage &&
    (hasNextPage || visibleStories < allStories.length);

  if (!hasBreakpoint) {
    return (
      <div className={css.loaderWrapper}>
        <LoaderEl />
      </div>
    );
  } else if (isLoading) {
    return (
      <div className={css.loaderWrapper}>
        <LoaderEl />
      </div>
    );
  } else if (isError) {
    return <EmptyState title={error.message} />;
  } else if (!isLoading && !isFetchingNextPage && allStories.length === 0) {
    switch (mode) {
      case "myOwnStories":
        return (
          <EmptyState
            title="Ви ще нічого не публікували, поділіться своєю першою історією!"
            buttonText="Опублікувати історію"
            onButtonClick={() => {
              router.push("/stories/create");
            }}
          />
        );
      case "mySavedStories":
        return (
          <EmptyState
            title="У вас ще немає збережених історій, мершій збережіть вашу першу історію!"
            buttonText="До історій"
            onButtonClick={() => {
              router.push("/stories");
            }}
          />
        );
      case "travellerStories":
        return (
          <EmptyState
            title="Цей користувач ще не публікував історій"
            buttonText="Назад до історій"
            onButtonClick={() => {
              router.push("/stories");
            }}
          />
        );
    }
  } else {
    return (
      <>
        <ul className={css.travellerStoriesList}>
          {allStories.slice(0, visibleStories).map((story) => (
            <TravellersStoriesItem key={story._id} story={story} mode={mode} />
          ))}
        </ul>
        <div className={css.buttonWrapper}>
          {isFetchingNextPage ? (
            <LoaderEl />
          ) : (
            shouldShowLoadButton &&
            !isFetchingNextPage && (
              <button
                className={`buttonBlue`}
                onClick={handleLoadMore}
                disabled={isFetchingNextPage}
              >
                Показати ще
              </button>
            )
          )}

          {buttonType === "link" && !isMobile && (
            <Link href="/stories" className={`buttonBlue`}>
              Переглянути всі
            </Link>
          )}
        </div>
      </>
    );
  }
}
