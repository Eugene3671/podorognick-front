"use client";

import React from "react";
import { User } from "@/src/types/user";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getUsers, UserPaginationResponse } from "@/src/lib/api/usersApi";
import TravelerCard from "@/src/components/OurTravelers/TravelerCard";
import { Circles, ThreeDots} from "react-loader-spinner";
import styles from "./page.module.css";

const TravellersList = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery <UserPaginationResponse>({
    queryKey: ["travelers-infinite"],
    queryFn: ({ pageParam = 1 }) => getUsers(pageParam as number, 12), 
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      console.log("LastPage:", lastPage);
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
  });

  if (isLoading) {
    return (
      <div className={styles.loaderWrapper}>
        <Circles height="80" width="80" color="#4169e1" />
      </div>
    );
  }

  return (
    <>
      <div className={styles.grid}>
        {data?.pages.map((page, pageIndex) =>
          page.users.map((user: User, userIndex: number) => {
            const isExtraForMobile = pageIndex === 0 && userIndex >= 8;

            return (
              <div 
                key={user._id} 
                className={isExtraForMobile ? styles.desktopOnlyCard : ""}
              >
                <TravelerCard
                  id={user._id}
                  name={user.name || "Мандрівник"}
                  description={user.description || "Досвідчений мандрівник"}
                  img={user.avatarUrl || "/default-avatar.png"}
                />
              </div>
            );
          })
        )}
      </div>

      {hasNextPage && (
  <div className={styles.buttonContainer}>
    <button
      onClick={() => fetchNextPage()}
      disabled={isFetchingNextPage}
      className={`${styles.loadMoreButton} ${isFetchingNextPage ? styles.loading : ""}`}
    >
      {isFetchingNextPage ? (
        <ThreeDots 
          height="20" 
          width="40" 
          radius="9" 
          color="#1a1a1a"
          ariaLabel="three-dots-loading"
          visible={true}
        />
      ) : (
        "Показати ще"
      )}
    </button>
  </div>
)}
    </>
  );
};

export default TravellersList;