import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AnimalList() {
  const [animals, setAnimals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [formData, setFormData] = useState({
    nome: "",
    imagem: "",
    raca: "",
    idade: "",
    porte: "Pequeno",
    historico: "",
    status: "Disponível",
    categoria: "cao",
  });

  const [filters, setFilters] = useState({
    nome: "",
    raca: "",
    porte: "",
  });

  const [raças, setRaças] = useState([]);

  const fetchAnimals = async () => {
    try {
      const response = await axios.get("/api/animais");
      setAnimals(response.data);

      const uniqueRacas = [
        ...new Set(
          response.data.map((animal) => animal.raca).filter((raca) => raca)
        ),
      ];
      setRaças(uniqueRacas);
    } catch (error) {
      console.error("Erro ao buscar animais:", error);
      toast.error("Erro ao buscar animais.");
    }
  };

  useEffect(() => {
    fetchAnimals(); 
  }, []);

  const handleOpenModal = (animal = null) => {
    setEditingAnimal(animal);
    setFormData(
      animal || {
        nome: "",
        imagem: "",
        raca: "",
        idade: "",
        porte: "Pequeno",
        historico: "",
        status: "Disponível",
        categoria: "cao",
      }
    );
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingAnimal(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      if (editingAnimal) {
        await axios.put(`/api/animais?id=${editingAnimal._id}`, formData);
        toast.success("Animal atualizado com sucesso!");
      } else {
        await axios.post("/api/animais", formData);
        toast.success("Animal cadastrado com sucesso!");
      }
      fetchAnimals();
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar animal:", error);
      toast.error("Erro ao salvar animal.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/animais?id=${id}`);
      fetchAnimals();
      toast.success("Animal excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar animal:", error);
      toast.error("Erro ao excluir animal.");
    }
  };

  const availableAnimals = animals
    .filter((animal) => animal.status === "Disponível")
    .filter((animal) =>
      animal.nome.toLowerCase().includes(filters.nome.toLowerCase())
    )
    .filter((animal) => (filters.raca ? animal.raca === filters.raca : true))
    .filter((animal) =>
      filters.porte ? animal.porte === filters.porte : true
    );

  const adoptedAnimals = animals.filter(
    (animal) => animal.status === "Adotado"
  );

  return (
    <div className="animal-list">
      <div className="header">
        <h2>Lista de Animais</h2>
        <button onClick={() => handleOpenModal()}>Cadastrar Novo</button>
      </div>
      <div className="filters">
        <div className="filter-item">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={filters.nome}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-item">
          <label>Raça:</label>
          <select
            name="raca"
            value={filters.raca}
            onChange={handleFilterChange}
          >
            <option value="">Todas</option>
            {raças.map((raca) => (
              <option key={raca} value={raca}>
                {raca}
              </option>
            ))}
          </select>
        </div>
        <div className="filter-item">
          <label>Porte:</label>
          <select
            name="porte"
            value={filters.porte}
            onChange={handleFilterChange}
          >
            <option value="">Todos</option>
            <option value="Pequeno">Pequeno</option>
            <option value="Médio">Médio</option>
            <option value="Grande">Grande</option>
          </select>
        </div>
      </div>

      <span>
        <b>Animais Disponíveis</b>
      </span>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Imagem</th>
              <th>Raça</th>
              <th>Idade</th>
              <th>Porte</th>
              <th>Histórico</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {availableAnimals.map((animal) => (
              <tr key={animal._id}>
                <td>{animal.nome}</td>
                <td>
                  <Image
                    src={animal.imagem}
                    alt={animal.nome}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{animal.raca}</td>
                <td>{animal.idade}</td>
                <td>{animal.porte}</td>
                <td>{animal.historico}</td>
                <td>{animal.status}</td>
                <td>{animal.categoria}</td>
                <td>
                  <button onClick={() => handleOpenModal(animal)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(animal._id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <hr />
      <span>
        <b>Animais Adotados</b>
      </span>
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Imagem</th>
              <th>Raça</th>
              <th>Idade</th>
              <th>Porte</th>
              <th>Histórico</th>
              <th>Status</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {adoptedAnimals.map((animal) => (
              <tr key={animal._id}>
                <td>{animal.nome}</td>
                <td>
                  <Image
                    src={animal.imagem}
                    alt={animal.nome}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{animal.raca}</td>
                <td>{animal.idade}</td>
                <td>{animal.porte}</td>
                <td>{animal.historico}</td>
                <td>{animal.status}</td>
                <td>{animal.categoria}</td>
                <td>
                  <button onClick={() => handleOpenModal(animal)}>
                    Editar
                  </button>
                  <button onClick={() => handleDelete(animal._id)}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className="modal">
          <div className="modal-content-cadastro">
            <h3>{editingAnimal ? "Editar Animal" : "Cadastrar Animal"}</h3>

            <div className="input-container">
              <div className="input-row">
                <div className="input-group">
                  <label>
                    Nome:
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Imagem (URL):
                    <input
                      type="text"
                      name="imagem"
                      value={formData.imagem}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Raça:
                    <input
                      type="text"
                      name="raca"
                      value={formData.raca}
                      onChange={handleChange}
                    />
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Idade:
                    <input
                      type="number"
                      name="idade"
                      value={formData.idade}
                      onChange={handleChange}
                    />
                  </label>
                </div>
              </div>

              <div className="input-row">
                <div className="input-group">
                  <label>
                    Porte:
                    <select
                      name="porte"
                      value={formData.porte}
                      onChange={handleChange}
                    >
                      <option value="Pequeno">Pequeno</option>
                      <option value="Médio">Médio</option>
                      <option value="Grande">Grande</option>
                    </select>
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Histórico:
                    <textarea
                      name="historico"
                      value={formData.historico}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Status:
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Disponível">Disponível</option>
                      <option value="Adotado">Adotado</option>
                    </select>
                  </label>
                </div>
                <div className="input-group">
                  <label>
                    Categoria:
                    <select
                      name="categoria"
                      value={formData.categoria}
                      onChange={handleChange}
                    >
                      <option value="cao">Cão</option>
                      <option value="gato">Gato</option>
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button onClick={handleSubmit}>Salvar</button>
              <button onClick={handleCloseModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
