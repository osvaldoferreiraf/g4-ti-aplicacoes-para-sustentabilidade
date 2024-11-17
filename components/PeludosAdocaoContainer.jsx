import Image from "next/image";
import PataAmarela from "../public/assets/img/PataAmarela.svg";
import MarcaPreta from "../public/assets/img/MarcaPreta.svg";
import caoDefault from "../public/assets/img/caoDefault.svg";
import gatoDefault from "../public/assets/img/gatoDefault.svg";
import Link from "next/link"; 

const animais = [
  { title: "CÃES", img: caoDefault, categoria: "cao" },
  { title: "GATOS", img: gatoDefault, categoria: "gato" },
];

export default function PeludosAdocao() {
  return (
    <div className="peludos-adocao">
      <div className="peludos-title-img-description">
        <Image
          src={PataAmarela}
          width={125}
          height={100}
          alt="pataAmarela-peludos"
          className="peludos-img"
        />
        <span className="peludos-title">PELUDOS PARA ADOÇÃO</span>
        <span className="peludos-description">
          Lindos peludos cheios de amor esperando por você. Encontre aqui seu
          novo amigo.
        </span>
      </div>
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
  );
}
