import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import PopularStories from "../../components/PopularStories/PopularStories";

import "@/src/app/globals.css";
export default function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <h2>PopularStoriesSection</h2>
      <h2>PopularStoriesSection</h2>
      <PopularStories />
      <h2>OurTravellers</h2>
      <h3>Join</h3>
    </main>
  );
}
