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
import "@/styles/adocao.css";
import "@/styles/videos.css";
import "@/styles/colabore.css";
import "@/styles/colaboreModal.css";
import "@/styles/formularios.css";
import Header from "../components/Header";
import Footer from "@/components/Footer";
import WhatsAppIcon from "@/public/assets/img/logoWhatsapp.svg";
import Image from "next/image";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const isLoginPage = router.pathname === "/login";
  const isPainelAdmPage = router.pathname === "/painelAdm";

  const handleWhatsappClick = () => {
    const phoneNumber = "+5531995836534";
    const message = "Olá, estou interessado em mais informações sobre o ministério arca de noé!";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;
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
      <ToastContainer position="top-right" autoClose={5000} />
    </>
  );
}
