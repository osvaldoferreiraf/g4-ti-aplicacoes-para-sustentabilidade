import React, { useEffect, useState } from "react";
import axios from "axios";

export default function FormComponent() {
  const [colaboracoes, setColaboracoes] = useState([]);
  const [filteredColaboracoes, setFilteredColaboracoes] = useState([]);
  const [motivos, setMotivos] = useState([]);
  const [selectedColaboracao, setSelectedColaboracao] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [filters, setFilters] = useState({ nome: "", motivo: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/colabore");
        setColaboracoes(response.data);
        setFilteredColaboracoes(response.data);

        const uniqueMotivos = [
          ...new Set(response.data.map((item) => item.motivo)),
        ];
        setMotivos(uniqueMotivos);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));

    let filtered = colaboracoes;

    if (name === "nome" || filters.nome) {
      const nomeFilter = name === "nome" ? value : filters.nome;
      filtered = filtered.filter((colaboracao) =>
        colaboracao.nome.toLowerCase().includes(nomeFilter.toLowerCase())
      );
    }

    if (name === "motivo" || filters.motivo) {
      const motivoFilter = name === "motivo" ? value : filters.motivo;
      if (motivoFilter) {
        filtered = filtered.filter(
          (colaboracao) => colaboracao.motivo === motivoFilter
        );
      }
    }

    setFilteredColaboracoes(filtered);
  };

  const resetFilters = () => {
    setFilters({ nome: "", motivo: "" });
    setFilteredColaboracoes(colaboracoes);
  };

  const openModal = (colaboracao) => {
    setSelectedColaboracao(colaboracao);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedColaboracao(null);
    setModalOpen(false);
  };

  const generateWhatsAppLink = (telefone, message = "Olá!") => {
    const phoneNumber = telefone.replace(/\D/g, "");
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div>
      <div className="form-filter">
        <h2 className="title">Formulários</h2>
        <div className="filters">
          <input
            type="text"
            name="nome"
            placeholder="Buscar por nome"
            value={filters.nome}
            onChange={handleFilterChange}
          />
          <select
            name="motivo"
            value={filters.motivo}
            onChange={handleFilterChange}
          >
            <option value="">Todos os motivos</option>
            {motivos.map((motivo, index) => (
              <option key={index} value={motivo}>
                {motivo}
              </option>
            ))}
          </select>
          {(filters.nome !== "" || filters.motivo !== "") && (
            <button onClick={resetFilters}>Limpar Filtros</button>
          )}
        </div>
      </div>
      <div className="forms-table">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>Motivo</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {filteredColaboracoes.map((colaboracao) => (
              <tr key={colaboracao._id} onClick={() => openModal(colaboracao)}>
                <td>{colaboracao.nome}</td>
                <td>{colaboracao.email}</td>
                <td>{colaboracao.telefone}</td>
                <td>{colaboracao.motivo}</td>
                <td>
                  <a
                    href={generateWhatsAppLink(
                      colaboracao.telefone,
                      `Olá, ${colaboracao.nome}!`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="whatsapp-link"
                  >
                    WhatsApp
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && selectedColaboracao && (
        <div className="modal-overlay">
          <div className="modal-container">
            <button className="modal-close" onClick={closeModal}>
              X
            </button>
            <h3>Detalhes do Colaborador</h3>
            <p>
              <strong>Nome:</strong> {selectedColaboracao.nome}
            </p>
            <p>
              <strong>Email:</strong> {selectedColaboracao.email}
            </p>
            <p>
              <strong>Telefone:</strong> {selectedColaboracao.telefone}
            </p>
            <p>
              <strong>Motivo:</strong> {selectedColaboracao.motivo}
            </p>
            {selectedColaboracao.outro && (
              <p>
                <strong>Outro:</strong> {selectedColaboracao.outro}
              </p>
            )}
            <p>
              <strong>Comentários:</strong> {selectedColaboracao.comentarios}
            </p>
            <a
              href={generateWhatsAppLink(
                selectedColaboracao.telefone,
                `Olá, ${selectedColaboracao.nome}!`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-link"
            >
              Conversar no WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
