import { useRouter } from "next/router";
import "@/styles/globals.css";
import "@/styles/header.css";
import "@/styles/PeludosAdocaoContainer.css";
import "@/styles/servicos.css";
import "@/styles/ministerio.css";
import "@/styles/footer.css";
import "@/styles/animais.css";
import "@/styles/animalPage.css";
import "@/styles/painelAdm.css";
import "@/styles/animaisList.css";
import "@/styles/cadastroAdmin.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import WhatsAppIcon from "@/public/assets/img/logoWhatsapp.svg";
import Image from "next/image";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  const isPainelAdmPage = router.pathname === "/painelAdm";

  const handleWhatsappClick = () => {
    const phoneNumber = "+5599999999999";
    const message = "Olá, estou interessado em mais informações!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.location.href = whatsappUrl;
  };

  return (
    <>
      <Header />
      <Component {...pageProps} />
      {!isLoginPage && !isPainelAdmPage && (
        <div className="whatsapp-icon" onClick={handleWhatsappClick}>
          <Image src={WhatsAppIcon} alt="WhatsApp" />
        </div>
      )}
      {!isLoginPage ? (
        <Footer />
      ) : (
        <div className="copyright">
          <div className="line-copyright" />
          <span className="text-copyright">
            Copyright 2024 | Ministério Arca de Noé
          </span>
        </div>
      )}
    </>
  );
}
