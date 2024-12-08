import Image from "next/image";
import PataAmarela from "../../public/assets/img/PataAmarela.svg";
import SimpleSelectInput from "@/components/CustomInput";
import { useEffect, useState } from "react";
import AnimalCard from "../../components/AnimalCard";
import { mongooseConnect } from "../../lib/mongoose";
import { Animal } from "../../models/Animal";

export default function AnimaisPorCategoria({ animais, categoria }) {
  const [porte, setPorte] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredAnimals, setFilteredAnimals] = useState(animais);

  const getUniqueOptions = (key, transformFn) =>
    [...new Set(animais.map((animal) => animal[key]))]
      .filter(Boolean)
      .map(transformFn || ((val) => val));

  const opcoesPorte = ["Todos", ...getUniqueOptions("porte")];
  const opcoesRaca = ["Todos", ...getUniqueOptions("raca")];
  const opcoesIdade = [
    "Todos",
    ...getUniqueOptions("idade", (idade) => `${idade} anos`),
  ];

  useEffect(() => {
    let filtered = animais;

    if (searchTerm) {
      filtered = filtered.filter((animal) =>
        animal.nome.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (porte && porte !== "Todos")
      filtered = filtered.filter((animal) => animal.porte === porte);
    if (raca && raca !== "Todos")
      filtered = filtered.filter((animal) => animal.raca === raca);
    if (idade && idade !== "Todos")
      filtered = filtered.filter((animal) => `${animal.idade} anos` === idade);

    setFilteredAnimals(filtered);
  }, [searchTerm, porte, raca, idade, animais]);

  const getCategoriaPlural = (categoria) => {
    const categoriasPlurais = {
      cao: "CÃES",
      gato: "GATOS",
    };
    return (
      categoriasPlurais[categoria.toLowerCase()] ||
      categoria.toUpperCase() + "S"
    );
  };

  return (
    <div className="animais-container">
      <div className="title-inputs-div">
        <div className="title-img-input">
          <span className="animais-title">{getCategoriaPlural(categoria)}</span>
          <Image src={PataAmarela} alt="pataAmarela" width={50} height={50} />
        </div>
        <div className="selects-animais-div">
          <div className="select-wrapper">
            <label htmlFor="porte-select">Nome:</label>
            <input
              className="input-text-animais"
              type="text"
              placeholder="Procure por um animal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="select-wrapper">
            <label htmlFor="porte-select">Porte:</label>
            <SimpleSelectInput
              id="porte-select"
              options={opcoesPorte}
              placeholder="Porte"
              value={porte}
              onChange={setPorte}
              onClear={() => setPorte("")} 
            />
          </div>
          <div className="select-wrapper">
            <label htmlFor="raca-select">Raça:</label>
            <SimpleSelectInput
              id="raca-select"
              options={opcoesRaca}
              placeholder="Raça"
              value={raca}
              onChange={setRaca}
              onClear={() => setRaca("")} 
            />
          </div>
          <div className="select-wrapper">
            <label htmlFor="idade-select">Idade:</label>
            <SimpleSelectInput
              id="idade-select"
              options={opcoesIdade}
              placeholder="Idade"
              value={idade}
              onChange={setIdade}
              onClear={() => setIdade("")} 
            />
          </div>
        </div>
      </div>
      <div className="animaislist-div">
        <div className="animais-grid">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map((animal, index) => (
              <AnimalCard key={index} animal={animal} />
            ))
          ) : (
            <div className="no-results">Animal não encontrado :)</div>
          )}
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

    if (!animais.length) {
      console.warn(`Nenhum animal encontrado para a categoria: ${categoria}`);
    }

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
