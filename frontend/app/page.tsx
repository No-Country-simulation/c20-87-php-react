
import Navbar from "@/components/Navbar";
import { Banner } from "@/components/banner";

export default function Home() {
  return (
    <main className="w-full flex flex-col  justify-center items-center">
      <Navbar/>
      <div className="w-[90%] justify-center items-center">
        <Banner/>
      </div>
    </main>

  );
}