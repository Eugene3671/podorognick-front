import { getAllStories } from "@/src/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import TravellersStories from "../TravellersStories/TravellersStories";

export default async function PopularStories() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ["popular-stories"],
    queryFn: () => getAllStories(),
    initialPageParam: 0,
  });

  return (
    <section>
      <h2>Популярні історії</h2>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TravellersStories />
      </HydrationBoundary>
    </section>
  );
}
