import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";
import { Banner } from "@/components/banner";

export default function Home() {
  return (
    <main className="flex  items-center justify-between p-24">
      <Banner num={1}/>
    </main>
  );
}