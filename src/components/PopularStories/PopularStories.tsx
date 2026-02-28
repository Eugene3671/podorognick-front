import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TravellersStories from "../TravellersStories/TravellersStories";
import css from "./PopularStories.module.css";
import "@/src/app/globals.css";
import { getAllStories } from "@/src/lib/api/storiesApi";
import { Toaster } from "react-hot-toast";

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
          <TravellersStories
            pageType="popular"
            sort={"popular"}
            buttonType="link"
          />
        </HydrationBoundary>
      </div>
    </section>
  );
}
