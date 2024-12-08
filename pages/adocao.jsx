import Image from "next/image";
import React from "react";
import logoRoxa from "../public/assets/img/logoRoxa.svg";
import caoDefault from "../public/assets/img/caoDefault.svg";
import gatoDefault from "../public/assets/img/gatoDefault.svg";
import facebook from "../public/assets/img/facebook.svg";
import instagram from "../public/assets/img/instagram.svg";
import Link from "next/link";

const animais = [
  { title: "CÃES", img: caoDefault, categoria: "cao" },
  { title: "GATOS", img: gatoDefault, categoria: "gato" },
];

export default function AdocaoPage() {
  return (
    <div className="adote-page">
      <div className="como-adotar-section">
        <div className="como-adotar">
          <span className="title-adotar">COMO ADOTAR</span>
          <span className="amigo-nao-se-compra">
            {'"Amigo não se compra, adota-se!"'}
          </span>
          <div className="como-adotar-texts">
            <span>
              Conheça alguns dos nossos amigos para adoção! <br />
              Quem não gostaria de contar com o amor de um deles? <br />
              Eles estão esperando por você!
            </span>
            <span>
              <b>
                Todos nossos animais são entregues castrados, vacinados e
                vermífugados
              </b>
            </span>
          </div>
        </div>
        <div className="como-adotar-image">
          <Image
            src={logoRoxa}
            alt="como-adotar-image"
            width={300}
            height={300}
          />
        </div>
      </div>
      <div className="animals-card-button-adotar">
        <div className="animais-cards-conteiner">
          {animais.map((animal, index) => (
            <div key={index} className="animal-div">
              <Link href={`/animais/${animal.categoria}`}>
                <button className="animal-card-button">
                  <Image
                    className="animal-card-image"
                    src={animal.img}
                    alt={animal.title}
                    width={200}
                    height={200}
                  />
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="line-divisor" />
      <div className="adote-agendar-visita-container">
        <h3>Agende sua visita pelo instagram ou facebook</h3>
        <div className="adote-facebook-instagram-container">
          <a
            href="https://www.facebook.com/ministerioarcadenoebh/"
            target="_blank"
            rel="noopener noreferrer"
            className="facebook-button"
          >
            <Image src={facebook} alt="facebook" width={40} height={40} />
            <span>FACEBOOK</span>
          </a>
          <a
            href="https://www.instagram.com/institutoarcadenoeoficial/"
            target="_blank"
            rel="noopener noreferrer"
            className="instagram-button"
          >
            <Image src={instagram} alt="instagram" width={40} height={40} />
            <span className="hover-a">INSTAGRAM</span>
          </a>
        </div>
        <div className="adote-exeigencias">
          <span>
            <b>Exigências para se adotar</b>
          </span>
          <ul className="exig-list">
            <li>
              Ser maior de 21 Anos ou estar acompanhado pelos responsáveis;
            </li>
            <li>Identidade e CPF (xerox e original);</li>
            <li>Ultimo comprovante de residencia (xerox);</li>
            <li>Contribuição de R$50,00 (vacina);</li>
            <li>Fazer entrevista de adoção;</li>
            <li className="cats-info-exig">
              Para adotar gatos, é necessário ter apartamento telado e não ter
              cães bravos. Gatos adultos so poderam seguir viagem para sua casa
              em caixa de transporte especial para eles. Não autorizamos caixa
              de papelão, baú de motos, soltos dentro do carro ou na mão
            </li>
          </ul>
        </div>
        <div className="line-divisor" />
        <div className="location-container">
          <div className="location-info">
            <span>
              <b>Horário de atendimento para adoção:</b>
            </span>
            <ul>
              <li>2ª a 6ª, das 09h ás 16h</li>
              <li>Aos sábados, das 09h ás 14h.</li>
            </ul>
            <div className="endereco">
              <span>
                <b>Endereço:</b>
              </span>
              <span>
                Rua Antônio José de Carvalho, Nº 280 – Alto Caiçaras, Belo
                Horizonte – MG, CEP: 30750-620
              </span>
            </div>
          </div>
          <div className="location-map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3751.802025095418!2d-43.974292488541145!3d-19.89057988141186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa690c5508499bd%3A0xfcd5a3ff05e42ab0!2sR.%20Ant%C3%B4nio%20Jos%C3%A9%20de%20Carvalho%2C%20280%20-%20Alto%20Cai%C3%A7aras%2C%20Belo%20Horizonte%20-%20MG%2C%2030750-620!5e0!3m2!1spt-BR!2sbr!4v1733378793419!5m2!1spt-BR!2sbr"
              width="500"
              height="350"
              style={{ border: 0 }}
              allowfullscreen=""
              loading="lazy"
              className="responsive-map"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
}
