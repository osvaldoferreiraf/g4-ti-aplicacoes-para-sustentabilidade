import Head from "next/head";
import Image from "next/image";
import Banner from "../public/assets/img/banner.svg";
import PeludosAdocao from "@/components/PeludosAdocaoContainer";
import Servicos from "@/components/Servicos";
import Ministerio from "@/components/Ministerio";

export default function Home() {
  return (
    <>
      <Head>
        <title>Instituto Arca de Noé</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/img/pataAmarela.svg" />
      </Head>
      <main>
        <div className="banner-container">
          <Image
            className="banner"
            src={Banner}
            alt="banner"
            width={1500}
            height={300}
            priority
          />
        </div>
        <PeludosAdocao />
        <Servicos />
        <Ministerio />
      </main>
    </>
  );
}
