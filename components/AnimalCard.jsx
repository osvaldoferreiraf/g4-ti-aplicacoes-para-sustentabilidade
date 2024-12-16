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
        src={animal.imagem !== '' ? animal.imagem : "data:image/png;base64,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"}
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
