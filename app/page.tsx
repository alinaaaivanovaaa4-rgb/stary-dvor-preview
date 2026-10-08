import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import FoodExperience from "@/components/FoodExperience";
import MobileStickyBar from "@/components/MobileStickyBar";
import Visit from "@/components/Visit";
import { restaurantJsonLd } from "@/data/site";
import MotionStudio from "@/components/MotionStudio";

export default function Home() {
  return <>
    <a href="#main" className="skip-link">Перейти к содержанию</a>
    <Header />
    <main id="main"><Hero /><FoodExperience /><Visit /></main>
    <Footer /><MobileStickyBar />
    <MotionStudio />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }} />
  </>;
}
