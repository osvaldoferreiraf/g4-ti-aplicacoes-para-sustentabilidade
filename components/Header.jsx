import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Logo from "../public/assets/img/logo.svg";
import pataAmarelaAzul from "../public/assets/img/pataAmarelaAzul.svg";
import Link from "next/link";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  const isAdminPage = router.pathname === "/painelAdm";
  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    document.body.style.overflow = newMenuState ? "hidden" : "auto";
  };
  

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLinkClick = (sectionId, e) => {
    e.preventDefault();
    toggleMenu();
  
    document.body.style.overflow = "auto";
  
    if (router.pathname !== "/") {
      router.push(`/#${sectionId}`).then(() => {
        scrollToSection(sectionId);
      });
    } else {
      scrollToSection(sectionId);
    }
  };

  const handlePageLinkClick = () => {
    toggleMenu();
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <header>
      {!isAdminPage && (
        <div className="div-blue-box">
          <Link href="/login" className="painel-button">
            Acessar como administrador
          </Link>
        </div>
      )}
      <div className="main-container-header">
        <div className="logo-container">
          <Image
            src={isMobile ? pataAmarelaAzul : Logo}
            alt="Logo"
            height={114}
            width={308}
            onClick={() => router.push('/')}
          />
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={toggleMenu}
        >
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
          <span className="menu-bar"></span>
        </button>
        <nav className={`menu-list-header ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <Link href="/" onClick={handlePageLinkClick}>
                Home
              </Link>
            </li>
            <li>
              <a
                href="#ministerio"
                onClick={(e) => handleLinkClick("ministerio", e)}
              >
                O Ministério
              </a>
            </li>
            <li>
              <Link href="/adocao" onClick={handlePageLinkClick}>
                Adote
              </Link>
            </li>
            <li>
              <a
                href="#servicos"
                onClick={(e) => handleLinkClick("servicos", e)}
              >
                Serviços
              </a>
            </li>
            <li>
              <Link href="/videos" onClick={handlePageLinkClick}>
                Vídeos
              </Link>
            </li>
            <li className="colabore-item">
              <Link href="/colabore" onClick={handlePageLinkClick}>
                Colabore
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
