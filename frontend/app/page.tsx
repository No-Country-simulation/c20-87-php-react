import Navbar from "@/components/Navbar";
import { ExtraOptionsSection } from "@/components/ExtraOptionsSection";
import { Banner } from "@/components/Banner";

export default function Home() {
  return (
    <main className="w-full flex flex-col  justify-center items-center">
      <Navbar/>
      <div className="w-[90%] justify-center items-center">
        <Banner/>
      </div>
      <div className="w-[90%] justify-center items-center">
        <ExtraOptionsSection />
      </div>
    </main>
  );
}