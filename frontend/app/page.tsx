import Navbar from "@/components/Navbar";
import { ExtraOptionsSection } from "@/components/ExtraOptionsSection";
import { Banner } from '../components/banner';
import InvestmentSection from "@/components/InvestmentSection";
import Footer from "@/components/Footer";
import StripInformation from "@/components/StripInformation";

export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center">
      <Navbar />
      <div className="w-[90%] flex-col items-center">
        <Banner />
        <ExtraOptionsSection />
      </div>
      <StripInformation/>
      <div className="w-[90%] flex-col items-center">
        <InvestmentSection />
      </div>
      <Footer />
    </main>
  );
}