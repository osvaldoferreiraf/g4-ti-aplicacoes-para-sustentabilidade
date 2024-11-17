import { mongooseConnect } from "../../lib/mongoose";
import Image from "next/image";
import caoCardDefault from "../../public/assets/img/caoCardDefault.svg";
import PataAmarela from "../../public/assets/img/PataAmarela.svg";
import WhatsappIcon from "../../public/assets/img/whatsapp.svg";
import { Animal } from "../../models/Animal";

export default function AnimalPage({ animal, error }) {
  if (error) return <div>{error}</div>;
  function handleWhatsappClick(animal) {
    const phoneNumber = "+5599999999999";
    const message = `Olá, estou interessado em adotar o animal ${animal?.nome}. Poderia me dar mais informações?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.location.href = whatsappUrl;
  }

  return (
    <div className="animal-page">
      <div className="animal-first-card-conteiner">
        <div className="animal-page-image-div">
          <Image
            className="animal-page-image"
            src={animal?.imagem || caoCardDefault}
            alt={animal?.nome}
            width={200}
            height={200}
          />
        </div>
        <div className="animal-details-conteiner">
          <div className="animal-name-icon">
            <Image
              className="animal-details-icon"
              src={PataAmarela}
              alt="Ícone de Animal"
            />
            <span className="animal-page-name">{animal?.nome}</span>
          </div>
          <div className="animal-age-porte-raca">
            <div className="animal-details-component">
              <span className="animal-details-component-info">IDADE</span>
              <span className="animal-details-component-dinamic">
                {animal?.idade} anos
              </span>
            </div>
            <div className="animal-details-component">
              <span className="animal-details-component-info">PORTE</span>
              <span className="animal-details-component-dinamic">
                {animal?.porte}
              </span>
            </div>
            <div className="animal-details-component">
              <span className="animal-details-component-info">RAÇA</span>
              <span className="animal-details-component-dinamic">
                {animal?.raca}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="animal-historic">
        <span className="animal-historic-title">HISTÓRICO DO ANIMAL</span>
        <span className="animal-text">{animal?.historico}</span>
      </div>
      <div className="animal-adote-button-div">
        <button
          className="animal-adote-button"
          onClick={() => handleWhatsappClick(animal)}
        >
          <span className="animal-adote-button-text">ADOTAR</span>
          <span className="animal-adote-button-icon">
            <Image
              className="animal-adote-whatsapp"
              src={WhatsappIcon}
              alt="Ícone WhatsApp"
            />
          </span>
        </button>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await mongooseConnect();
  const { id } = context.params;
  try {
    const animal = await Animal.findById(id).lean();
    if (!animal) {
      return { props: { error: "Animal não encontrado" } };
    }
    return { props: { animal: JSON.parse(JSON.stringify(animal)) } };
  } catch (error) {
    return {
      props: { error: "Erro ao carregar o animal", message: error.message },
    };
  }
}
