import Image from "next/image";
import pataAmarelaAzul from "../public/assets/img/pataAmarelaAzul.svg";
export default function Ministerio() {
  return (
    <div className="ministerio-container" id="ministerio">
      <div className="ministerio-logo-title">
        <Image
          className="ministerio-img"
          src={pataAmarelaAzul}
          alt="logoAzul"
        />
        <span className="ministerio-title">O MINISTÉRIO</span>
        <span className="ministerio-subtitle">Contamos com você!</span>
      </div>
      <div className="ministerio-info-container">
        <span className="ministerio-info-title">CONHEÇA O PROJETO</span>
        <div className="ministerio-info-div">
          <span className="ministerio-info-text">
            O <b>Ministério Arca de Noé</b> foi fundado em 2012 com o propósito
            de resgatar, tratar, cuidar e direcionar os animais resgatados para
            adoção.
          </span>
        </div>
        <div className="ministerio-info-div">
          <span className="ministerio-info-text">
            Contamos com consultório próprio, que proporciona procedimentos como{" "}
            <b>
              castração, consultorias veterinárias, banho e tosa a baixo custo.
            </b>{" "}
            E toda a renda é destinada aos 
            <b>
              tratamentos e manutenção dos animais abrigados pela instituição.
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}
