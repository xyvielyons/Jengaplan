import About from "@/components/landingpage/About";
import HomeSection from "@/components/landingpage/Home";
import PricingSection from "@/components/landingpage/PricingSection";
export default function Home() {
  return (
   <div className="p-2">
      <HomeSection></HomeSection>
      <About></About>
      <PricingSection></PricingSection>
   </div>
  );
}
