import React from "react";
import "@/src/app/globals.css";
import css from "./StoriesPage.module.css";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllStories } from "@/src/lib/services/stories.service";
import StoriesPageClient from "./StoriesPage.client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Всі Історії",
  description: "Переглянути всі історії на сайті Подорожники",
  openGraph: {
    title: "Всі Історії",
    description: "Переглянути всі історії на сайті Подорожники",
    url: `https://podorognick-front.vercel.app/stories/`,
  },
};

const StoriesPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["popular-stories"],
    queryFn: () =>
      getAllStories({ page: 0, perPage: 9, sort: "new", category: "" }),
    initialPageParam: 0,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <StoriesPageClient />
    </HydrationBoundary>
  );
};

export default StoriesPage;
