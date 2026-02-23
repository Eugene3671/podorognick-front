import Hero from "@/src/components/Hero/Hero";
import PopularStories from "../../components/PopularStories/PopularStories";
import TravellersStoriesItem from "../../components/TravellersStoriesItem/TravellersStoriesItem";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <Hero />
        <h2>About</h2>
        <h2>PopularStoriesSection</h2>
        <h2>OurTravellers</h2>
        <h3>Join</h3>
      </div>
    </main>
  );
}
