import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import PopularStories from "../../components/PopularStories/PopularStories";
import OurTravelers from "../../components/OurTravelers/OurTravelers";
import "@/src/app/globals.css";

export default function HomePage() {
  return (
    <main>
      <div className="container">
        <Hero />
        <About />
        <PopularStories />
        <OurTravelers />
        <h3>Join</h3>
      </div>
    </main>
  );
}