import { useState } from "react";
import Image from "next/image";
import PataAmarela from "../public/assets/img/PataAmarela.svg";
import { servicos } from "../utils/util";

export default function Servicos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const openModal = (servico) => {
    setSelectedService(servico);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="servicos-container" id="servicos">
      <div className="text-servicos">
        <span className="title-servicos">SERVIÇOS</span>
        <span className="description-servicos">
          Trabalhamos com uma equipe técnica especializada para prestar um
          serviço de qualidade para você.
        </span>
      </div>

      <div className="servicos-map">
        {servicos.map((servico, index) => (
          <div
            key={index}
            className="servico-card"
            onClick={() => openModal(servico)}
          >
            <div className="imagem-container">
              <Image
                src={servico.img}
                alt={servico.title}
                className="imagem"
              />
              <div className="overlay"></div>
              <Image
                src={PataAmarela}
                alt="Ícone de pata"
                className="icone-pata"
              />
            </div>
            <h3 className="titulo">{servico.title}</h3>
          </div>
        ))}
      </div>

      {modalOpen && selectedService && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content-servico" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <div className="modal-body">
              <div className="modal-image">
                <Image
                  src={selectedService.img}
                  alt={selectedService.title}
                  className="modal-img"
                />
              </div>
              <div className="modal-text">
                <h3 className="modal-title">{selectedService.title}</h3>
                <div
                  className="modal-description"
                  dangerouslySetInnerHTML={{ __html: selectedService.description }}
                />
                <p className="modal-contact">
                  {selectedService.contatoText}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
