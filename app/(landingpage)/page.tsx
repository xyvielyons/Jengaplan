import About from "@/components/landingpage/About";
import Footer from "@/components/landingpage/Footer";
import HomeSection from "@/components/landingpage/Home";
import PricingSection from "@/components/landingpage/PricingSection";
import Team from "@/components/landingpage/Team";
import Testimonials from "@/components/landingpage/Testimonials";
export default function Home() {
  return (
   <div className="p-2">
      <HomeSection></HomeSection>
      <About></About>
      <PricingSection></PricingSection>
      <Team></Team>
      <Testimonials/>
      <Footer/>
   </div>
  );
}
