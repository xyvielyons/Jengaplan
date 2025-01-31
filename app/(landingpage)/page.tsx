import About from "@/components/landingpage/About";
import Footer from "@/components/landingpage/Footer";
import HomeSection from "@/components/landingpage/Home";
import PricingSection from "@/components/landingpage/PricingSection";
import Team from "@/components/landingpage/Team";
import Testimonials from "@/components/landingpage/Testimonials";
export default function Home() {
  return (
   <div className="p-2 relative overflow-hidden">
      <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute right-0 transform translate-x-[55%] z-[-100] top-[-200px]"></div>
      <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute left-0 transform translate-x-[-50%] z-[-100] top-[150px]"></div>
      <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute right-0 transform translate-x-[55%] z-[-100] bottom-[1000px]"></div>
      <div className="bg-lightradial dark:bg-darkradial w-[1000px] h-[1000px] absolute left-0 transform translate-x-[-55%] z-[-100] bottom-[300px]"></div>

      <HomeSection></HomeSection>
      <About></About>
      <PricingSection></PricingSection>
      <Team></Team>
      <Testimonials/>
      <Footer/>
   </div>
  );
}
