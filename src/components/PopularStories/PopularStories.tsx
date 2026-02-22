import TravellersStories from "../TravellersStories/TravellersStories";

export default function PopularStories({
  currentUser,
}: {
  currentUser: User | null;
}) {
  return (
    <section>
      <h2>Популярні історії</h2>
      <TravellersStories currentUser={currentUser} />
    </section>
  );
}
