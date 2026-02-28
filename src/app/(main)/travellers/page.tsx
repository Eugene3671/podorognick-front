import { Suspense } from "react"; 
import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUsers } from "@/src/lib/api/usersApi";
import TravellersList from "./TravellersList";
import LoaderEl from "@/src/components/LoaderEl/LoaderEl"; 
import styles from "./page.module.css";

export default async function TravellersPage() {
  const queryClient = new QueryClient();

   queryClient.prefetchInfiniteQuery({
  queryKey: ["travelers-infinite"],
  queryFn: ({ pageParam = 1 }) => 
    getUsers({ 
      page: Number(pageParam), 
      perPage: 20,
      sortBy: "articlesAmount",
      sortOrder: "desc"
    }),
  initialPageParam: 1,
});

  return (
    <main className={`${styles.container} container`}>
      <h1 className={styles.title}>Мандрівники</h1>
      
      <Suspense fallback={<div className={styles.loaderWrapper}><LoaderEl /></div>}>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <TravellersList />
        </HydrationBoundary>
      </Suspense>
    </main>
  );
}