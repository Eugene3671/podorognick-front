import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TravellersStories from "../TravellersStories/TravellersStories";
import css from "./PopularStories.module.css";
import Link from "next/link";
import { getAllStories } from "@/src/lib/services/stories.service";

export default async function PopularStories() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["popular-stories"],
    queryFn: () => getAllStories({ page: 0, perPage: 3 }),
    initialPageParam: 0,
  });

  return (
    <section>
      <h2 className={css.sectionTitle}>Популярні історії</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TravellersStories>
          <div className={css.buttonWrapper}>
            <Link href="/stories" className={css.paginationButton}>
              Переглянути всі
            </Link>
          </div>
        </TravellersStories>
      </HydrationBoundary>
    </section>
  );
}
