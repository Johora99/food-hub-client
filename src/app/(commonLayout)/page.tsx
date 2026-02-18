import CategoriesSection from "@/components/Category/CategoriesSection";
import Dietary from "@/components/dietary/Dietary";
import FeaturesSection from "@/components/Featuressection";
import Hero from "@/components/hero/Hero";
import AllMeals from "@/components/Meals/AllMeals";

export default function Home() {
  return (
  <div>
    <div>
      <Hero />
    </div>
    <div>
      <FeaturesSection />
    </div>
    <div>
      <CategoriesSection />
    </div>
    <div>
      <Dietary />
    </div>
    <div>
      <AllMeals />
    </div>
  </div>
  );
}
