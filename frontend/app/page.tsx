import Image from "next/image";
import Link from "next/link";
import { Button } from "antd";

export default function Home() {
  return (
    <main className="flex  items-center justify-between p-24">
      <div>PAGINA PRINCIPAL</div>

      <Link href="/login">
        <Button type="primary">IR A LA PAGINA DE LOGIN</Button>
      </Link>
      <Link href="/portal">
        <Button type="primary">HOME</Button>
      </Link>
    </main>
  );
}
