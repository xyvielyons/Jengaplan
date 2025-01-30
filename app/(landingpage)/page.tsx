import About from "@/components/landingpage/About";
import HomeSection from "@/components/landingpage/Home";
import PricingSection from "@/components/landingpage/PricingSection";
import Team from "@/components/landingpage/Team";
export default function Home() {
  return (
   <div className="p-2">
      <HomeSection></HomeSection>
      <About></About>
      <PricingSection></PricingSection>
      <Team></Team>
   </div>
  );
}
