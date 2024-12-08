import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FormsColaboreModal({ type, closeModal }) {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    motivo: "doar",
    outro: "",
    comentarios: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTelefoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted = value
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
    setFormData((prev) => ({ ...prev, telefone: formatted }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/colabore", formData);
      toast.success("Enviado com sucesso!");
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        motivo: "doar",
        outro: "",
        comentarios: "",
      });
      closeModal();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Ocorreu um erro ao registrar a colaboração."
      );
    }
  };
  return (
    <div className="modal-overlay">
      <div className="modal-container-forms">
        <button className="modal-close" onClick={closeModal}>
          X
        </button>
        <div className="title-colabore">
          <span className="modal-title">COLABORE!</span>
          <span>
            Preencha com suas informações, e em breve entraremos em contato!
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="name-email-inputs">
            <div className="label-input">
              <label htmlFor="nome">Nome:</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Insira seu nome completo"
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Insira seu endereço de email"
                required
              />
            </div>
          </div>
          <div className="name-email-inputs">
            <div className="label-input">
              <label htmlFor="telefone">Telefone:</label>
              <input
                type="text"
                name="telefone"
                value={formData.telefone}
                onChange={handleTelefoneChange}
                placeholder="(00) 00000-0000"
                required
              />
            </div>
            <div className="label-input">
              <label htmlFor="motivo">Como deseja colaborar:</label>
              <select
                name="motivo"
                value={formData.motivo}
                onChange={handleChange}
                required
              >
                <option value="doar">Doações</option>
                <option value="voluntariar">Ser voluntário(a)</option>
                <option value="outro">Outro</option>
              </select>
              {formData.motivo === "outro" && (
                <input
                  type="text"
                  name="outro"
                  value={formData.outro}
                  onChange={handleChange}
                  placeholder="Insira o motivo da sua colaboração"
                  required
                  className="outro-input"
                />
              )}
            </div>
          </div>
          <div className="label-input">
            <label htmlFor="comentarios">Comentários e notas:</label>
            <textarea
              name="comentarios"
              value={formData.comentarios}
              onChange={handleChange}
              placeholder="Insira algum detalhe, comentário ou informação"
              rows="4"
            />
          </div>
          <div className="button-forms-div">
            <button type="submit" className="submit-button">
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
