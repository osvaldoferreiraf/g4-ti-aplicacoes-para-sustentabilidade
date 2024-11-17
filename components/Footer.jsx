import Image from "next/image";
import LogoAmarela from "../public/assets/img/logoAmarela.svg";
import FacebookIcon from "../public/assets/img/facebook.svg";
import InstagramIcon from "../public/assets/img/instagram.svg";

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-sections">
        <div className="logo-footer">
          <Image
            className="logo-img-footer"
            src={LogoAmarela}
            alt="logoAmarela"
          />
        </div>
        <div className="div-footer-social">
          <span className="text-redes-sociais">Siga-nos nas redes sociais</span>
          <a
            href="https://www.facebook.com/ministerioarcadenoebh/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="icon-footer"
              src={FacebookIcon}
              alt="Facebook"
              width={35}
              height={35}
            />
          </a>
          <a
            href="https://www.instagram.com/institutoarcadenoeoficial/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="icon-footer"
              src={InstagramIcon}
              alt="Instagram"
              width={35}
              height={35}
            />
          </a>
        </div>
        <div className="sobre-section">
          <span className="title-sobre">Instituto Arca de Noé</span>
          <span>Rua Antônio José de Carvalho, Nº 280 – Alto Caiçaras</span>
          <span> Belo Horizonte – MG</span>
          <span>30750-620</span>
          <span>TELEFONE: (31) 4102-0020</span>
        </div>
      </div>
      <div className="copyright">
        <div className="line-copyright" />
        <span className="text-copyright">
          Copyright 2024 | Ministério Arca de Noé
        </span>
      </div>
    </div>
  );
}
