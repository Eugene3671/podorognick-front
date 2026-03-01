import Hero from "@/src/components/Hero/Hero";
import About from "@/src/components/About/About";
import PopularStories from "../../components/PopularStories/PopularStories";
import OurTravelers from "../../components/OurTravelers/OurTravelers";
import Join from "@/src/components/Join/Join";
import "@/src/app/globals.css";
import TravellersStories from "@/src/components/TravellersStories/TravellersStories";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <PopularStories />
      <OurTravelers />
      <Join />
    </>
  );
}
