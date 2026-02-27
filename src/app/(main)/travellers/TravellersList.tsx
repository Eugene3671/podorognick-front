"use client";

import React, { useMemo, useState } from "react";
import { User } from "@/src/types/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers, UserPaginationResponse } from "@/src/lib/api/usersApi";
import TravelerCard from "@/src/components/OurTravelers/TravelerCard";
import LoaderEl from "@/src/components/LoaderEl/LoaderEl";
import Button from "@/src/components/Button/Button";
import styles from "./page.module.css";

const TravellersList = () => {
  const [visibleCount, setVisibleCount] = useState(12);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfiniteQuery<UserPaginationResponse>({
    queryKey: ["travelers-infinite"],
    queryFn: ({ pageParam = 1 }) => getUsers({ 
  page: Number(pageParam), 
  perPage: 20,
  sortBy: "articlesAmount",
  sortOrder: "desc"
}),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) return lastPage.page + 1;
      return undefined;
    },
  });

  const allUsers = useMemo(() => {
    if (!data) return [];
    const flatUsers = data.pages.flatMap(page => page.users);
    const uniqueMap = new Map();
    flatUsers.forEach(user => uniqueMap.set(user._id, user));
    return Array.from(uniqueMap.values()) as User[];
  }, [data]);

  const visibleUsers = useMemo(() => {
    return allUsers.slice(0, visibleCount);
  }, [allUsers, visibleCount]);

  const handleLoadMore = () => {
    if (visibleCount + 4 <= allUsers.length) {
      setVisibleCount(prev => prev + 4);
    } else if (hasNextPage) {
      fetchNextPage().then(() => {
        setVisibleCount(prev => prev + 4);
      });
    }
  };

  if (isLoading || (isFetching && allUsers.length === 0)) {
    return (
      <div className={styles.loaderWrapper}>
        <LoaderEl />
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {visibleUsers.map((user: User, index: number) => (
          <div 
            key={user._id} 
            className={index >= 8 && index < 12 ? styles.desktopOnlyCard : ""}
          >
            <TravelerCard
              id={user._id}
              name={user.name || "Мандрівник"}
              description={user.description || "Досвідчений мандрівник"}
              img={user.avatarUrl || "/default-avatar.png"}
            />
          </div>
        ))}
      </div>

      {(visibleCount < allUsers.length || hasNextPage) && (
        <div className={styles.buttonContainer}>
  {isFetchingNextPage ? (
    <LoaderEl />
  ) : (
    (visibleCount < allUsers.length || hasNextPage) && (
      <Button
        type="button"
        onClick={handleLoadMore}
        className={styles.loadMoreButton}
      >
        Показати ще
      </Button>
    )
  )}
</div>
      )}
    </>
  );
};

export default TravellersList;