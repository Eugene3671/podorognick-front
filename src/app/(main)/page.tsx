import PopularStories from "../../components/PopularStories/PopularStories";


import "@/src/app/globals.css";
export default function HomePage() {
  return (
    <main>
      <div className="container">
        <h2>Hero</h2>
        <h2>About</h2>
        <h2>PopularStoriesSection</h2>
        <PopularStories />
        <h2>OurTravellers</h2>
        <h3>Join</h3>
      </div>
    </main>
  );
}
