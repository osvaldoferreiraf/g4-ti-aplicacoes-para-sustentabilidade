import Image from "next/image";
import PataAmarela from "../../public/assets/img/PataAmarela.svg";
import SimpleSelectInput from "@/components/CustomInput";
import caoCardDefault from "../../public/assets/img/caoCardDefault.svg";
import { useEffect, useState } from "react";
import AnimalCard from "../../components/AnimalCard";
import { mongooseConnect } from "../../lib/mongoose";
import { Animal } from "../../models/Animal";

const options = ["Opção 1", "Opção 2", "Opção 3", "Opção 4"];

export default function AnimaisPorCategoria({ animais, categoria }) {
   
  const [porte, setPorte] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const getCategoriaPlural = (categoria) => {
    const categoriasPlurais = {
      cao: "CÃES",
      gato: "GATOS",
    };
    
    return categoriasPlurais[categoria.toLowerCase()] || categoria.toUpperCase() + "S";
  };


  return (
    <div className="animais-container">
      <div className="title-inputs-div">
        <div className="title-img-input">
          <span className="animais-title">{getCategoriaPlural(categoria)}</span>
          <Image src={PataAmarela} alt="pataAmarela" width={50} height={50} />
          <input
            className="input-text-animais"
            type="text"
            placeholder="Procure por um animal..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="selects-animais-div">
          <SimpleSelectInput
            options={options}
            placeholder="Porte"
            value={porte}
            onChange={(e) => setPorte(e.target.value)}
          />
          <SimpleSelectInput
            options={options}
            placeholder="Raça"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
          />
          <SimpleSelectInput
            options={options}
            placeholder="Idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
          />
        </div>
      </div>
      <div className="animaislist-div">
        <div className="animais-grid">
          {animais.map((animal, index) => (
            <AnimalCard key={index} animal={animal} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
    const { categoria } = params;
  
    if (!categoria) {
      return {
        props: {
          animais: [],
          categoria: "Categoria não definida",
        },
      };
    }
  
    try {
      await mongooseConnect();
      const query = { categoria };
      const animais = await Animal.find(query).lean();
  
      return {
        props: {
          animais: JSON.parse(JSON.stringify(animais)) || [],
          categoria,
        },
      };
    } catch (error) {
      console.error("Erro ao buscar os animais:", error);
  
      return {
        props: {
          animais: [],
          categoria: "Erro ao buscar a categoria",
        },
      };
    }
  }
  
