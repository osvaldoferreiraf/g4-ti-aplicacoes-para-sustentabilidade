import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";
import MarcaAzul from "../public/assets/img/MarcaAzul.svg";

export default function AnimalCard({ animal }) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/animal/${animal._id}`);
  };
  

  return (
    <div className="animal-card" onClick={handleCardClick}>
      <Image
        className="animal-image"
        src={animal.imagem}
        alt={`Imagem de ${animal.nome}`}
        width={100}
        height={100}
      />
      <div className="animal-name-button-div">
        <span className="animal-name">{animal.nome}</span>
        <Image className="animal-marca-azul" src={MarcaAzul} alt="Marca Azul" />
        <div className="animal-ver-mais">
          <span className="animal-ver-text">VER ANIMAL</span>
        </div>
      </div>
    </div>
  );
}
