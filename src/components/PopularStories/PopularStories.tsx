import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TravellersStories from "../TravellersStories/TravellersStories";
import css from "./PopularStories.module.css";
<<<<<<< HEAD
import Link from "next/link";
import { getAllStories } from "@/src/lib/api/storiesApi";
=======
import "@/src/app/globals.css";
import { getAllStories } from "@/src/lib/services/stories.service";
import { Toaster } from "react-hot-toast";
>>>>>>> main

export default async function PopularStories() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["popular-stories"],
    queryFn: () => getAllStories({ page: 0, perPage: 4, sort: "popular" }),
    initialPageParam: 0,
  });

  return (
    <section>
      <div>
        <Toaster />
      </div>
      <div className={`container ${css.containerPopular}`}>
        <h2 className={css.sectionTitle}>Популярні історії</h2>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TravellersStories perPage={3} sort={"popular"} buttonType="link" />
        </HydrationBoundary>
      </div>
    </section>
  );
}
