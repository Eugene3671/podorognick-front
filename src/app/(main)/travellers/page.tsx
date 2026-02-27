import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getUsers } from "@/src/lib/api/usersApi";
import TravellersList from "./TravellersList";
import styles from "./page.module.css";

export default async function TravellersPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["travelers-infinite"],
    queryFn: ({ pageParam = 1 }) => getUsers(pageParam as number, 20),
    initialPageParam: 1,
  });

  return (
    <main className={`${styles.container} container`}>
      <h1 className={styles.title}>Мандрівники</h1>
      
      <HydrationBoundary state={dehydrate(queryClient)}>
        <TravellersList />
      </HydrationBoundary>
    </main>
  );
}