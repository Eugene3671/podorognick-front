import React from "react";
import "@/src/app/globals.css";
import css from "./StoriesPage.module.css";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getAllStories } from "@/src/lib/api/storiesApi";
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
  return <StoriesPageClient />;
};

export default StoriesPage;
