import React from "react";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import ProfileLayout from "./layout";
import TravellerInfo from "@/src/components/TravellerInfo/TravellerInfo";
import PageToggle from "@/src/components/PageToggle/PageToggle";
import { getMe } from "@/src/lib/api/usersApi";

const ProfilePage = async () => {
  const queryClient = new QueryClient();

  try {
    await queryClient.prefetchQuery({
      queryKey: ["user", "me"],
      queryFn: getMe,
    });
  } catch (err) {
    // якщо 401, продовжуємо, клієнт покаже помилку
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileLayout>
        <TravellerInfo />
        <PageToggle />
        {/* Parallel routes: /profile/saved або /profile/own */}
      </ProfileLayout>
    </HydrationBoundary>
  );
};

export default ProfilePage;
