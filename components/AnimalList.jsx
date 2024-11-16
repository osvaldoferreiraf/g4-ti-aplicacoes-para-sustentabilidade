import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

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


    const fetchAnimals = async () => {
        try {
            const response = await axios.get("/api/animais");
            setAnimals(response.data);
        } catch (error) {
            console.error("Erro ao buscar animais:", error);
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

    const handleSubmit = async () => {
        try {
            if (editingAnimal) {
                await axios.put(`/api/animais?id=${editingAnimal._id}`, formData);
            } else {
                await axios.post('/api/animais', formData);
            }
            fetchAnimals();
            handleCloseModal();
        } catch (error) {
            console.error("Erro ao salvar animal:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/animais?id=${id}`);
            fetchAnimals();
        } catch (error) {
            console.error("Erro ao deletar animal:", error);
        }
    };

    return (
        <div className="animal-list">
            <div className="header">
                <h2>Lista de Animais</h2>
                <button onClick={() => handleOpenModal()}>Cadastrar Novo</button>
            </div>
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
                        {animals.map((animal) => (
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
                                <td>{animal.status ? "Disponível" : "Adotado"}</td>
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
