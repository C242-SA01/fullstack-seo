import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/layouts/Navbar";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
    </div>
  );
}
