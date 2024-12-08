import React from "react";
import Image from "next/image";
import PataAmarela from "../public/assets/img/PataAmarela.svg";
import { useState } from "react";
import FormsColaboreModal from "../components/formsColaboreModal";
export default function ColaborePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleOpenModal = (title) => {
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalTitle("");
  };
  return (
    <div className="colabore-container">
      <div className="pata-videos">
        <Image src={PataAmarela} alt="pataAmarela" width={50} height={50} />
        <span className="videos-text">COLABORE</span>
      </div>
      <div className="saiba-colaborar">
        <h3>Saiba como colaborar</h3>
        <p>
          São muitas as formas de colaborar com o projeto. Você pode realizar
          contribuições através do seu cartão de crédito, também pode realizar
          uma doação no valor que desejar com pagamento online através do
          PagSeguro, realizar um depósito ou transferência bancária a qualquer
          momento ou solicitar a geração de um boleto bancário com o valor
          desejado.
        </p>
        <p>
          O Ministério Arca de Noé não recebe ajuda financeira de órgãos
          públicos. Todas as despesas da ONG são pagas com os recursos que
          recebemos por meio de doações.
        </p>
        <button
          className="forms-button"
          onClick={() => handleOpenModal("Colabore")}
        >
          Desejo colaborar!
        </button>
        <p>Confira abaixo como você pode ajudar o nosso trabalho:</p>
      </div>
      <hr />
      <div>
        <h3>Doações através de depósito ou transferência</h3>
        <p>
          Importante! Sempre que você fizer uma doação por depósito ou
          transferência, por favor nos avise para identificarmos a sua doação.
          Envie uma mensagem para o email: contato@ministerioarcadenoe.com.br
        </p>
        <div class="bank-details">
          <p>
            <strong>CNPJ:</strong> 17.064.438/0001-36
          </p>
          <p>
            <strong>Razão Social:</strong> Ministério Arca de Noé – Proteção
            Animal
          </p>

          <div class="bank-info">
            <h3>Banco: Itaú</h3>
            <p>
              <strong>Nome:</strong> Paula de Castro Maia
            </p>
            <p>
              <strong>Agência:</strong> 4450
            </p>
            <p>
              <strong>Conta Corrente:</strong> 01156-6
            </p>
          </div>

          <div class="bank-info">
            <h3>Banco: Inter</h3>
            <p>
              <strong>Nome:</strong> Paula de Castro Maia
            </p>
            <p>
              <strong>Agência:</strong> 0001
            </p>
            <p>
              <strong>Conta Corrente:</strong> 692519-7
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="seja-voluntario">
        <h3>Seja um voluntário</h3>
        <p>
          Você também pode doar o seu tempo ou conhecimento veterinário para o
          Ministério Arca de Noé. São várias as formas de atuar em nossa ONG de
          maneira voluntária.
        </p>
        <button
          className="forms-button"
          onClick={() => handleOpenModal("Voluntariar")}
        >
          Desejo ser voluntário
        </button>
      </div>
      <hr />
      <div className="outras-formas">
        <h3>Outras Formas</h3>
        <p>
          Como toda ajuda é sempre bem vinda, caso você não tenha recursos
          financeiros disponíveis ou não pode nos ajudar com o seu tempo,
          listamos outras possibilidades para que você possa colaborar para a
          ONG:
        </p>
        <p>1. Casa de passagem ou Lar temporário (LT);</p>
        <p> 2. Doação de rações para cães e gatos;</p>{" "}
        <p>3. Medicamentos (Não podem estar vencidos);</p>{" "}
        <p> 4. Material de limpeza:</p>
        <ul>
          <li>Água Sanitária</li>
          <li>Sabão em pó</li>
          <li>Detergente</li>
          <li>Bucha</li>
          <li>Desinfetante</li>
          <li>Cera</li>
          <li>Aromatizador de ambiente</li>
          <li>Amônia quaternária</li>
          <li>Cloro</li>
          <li>Tira limo</li>
          <li>Vassoura</li>
          <li>Rodo</li>
          <li>Sabonete Líquido</li>
          <li>Papel Higiênico</li>
          <li>Papel Toalha</li>
          <li>Amaciante</li>
          <li>Água oxigenada (10 volumes)</li>
        </ul>
        <p>Qualquer dúvida, entre em contato com nossa equipe.</p>
      </div>
      {isModalOpen && <FormsColaboreModal type={modalTitle} closeModal={handleCloseModal}/>}
    </div>
  );
}
