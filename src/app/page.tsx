import dotenv from 'dotenv';
dotenv.config();

import Image from "next/image";
import H1 from "@/components/typography/H1";

export default function Home() {
  return (
    <div>
      <H1>Welcome to Clothing For You!</H1>
    </div>
  );
}
