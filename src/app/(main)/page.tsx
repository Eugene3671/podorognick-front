import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import PopularStories from "../../components/PopularStories/PopularStories";

import "@/src/app/globals.css";
import Join from "@/src/components/Join/Join";
export default function HomePage() {
  return (
    <main className="main">
      <Hero />
      <About />
      <PopularStories />
      <h2>OurTravellers</h2>
      <Join />
    </main>
  );
}
