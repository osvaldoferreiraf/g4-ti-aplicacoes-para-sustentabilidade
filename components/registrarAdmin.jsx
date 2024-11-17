import React, { useEffect, useState } from "react";
import axios from "axios";

const RegisterAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [admins, setAdmins] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post("/api/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccessMessage(response.data.message);
      setErrorMessage("");
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      setErrorMessage(
        error.response ? error.response.data.message : "Erro ao cadastrar"
      );
      setSuccessMessage("");
    }
  };

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("/api/users");
        setAdmins(response.data);
      } catch (error) {
        console.error("Erro ao buscar administradores:", error);
        alert(
          `Erro: ${
            error.response ? error.response.data.message : "Erro desconhecido"
          }`
        );
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`/api/users?id=${id}`)
      .then(() => {
        setAdmins(admins.filter((admin) => admin._id !== id));
        setSuccessMessage("Administrador deletado com sucesso!");
      })
      .catch(() => {
        setErrorMessage("Erro ao deletar administrador");
      });
  };

  return (
    <div>
      <h2 className="title">Administradores</h2>
      <button className="btn" onClick={() => setIsModalOpen(true)}>
        Cadastrar Novo Admin
      </button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Cadastro de Administrador</h3>
            <form onSubmit={handleSubmit} className="form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Senha</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <button type="submit" className="btn-submit">
                Cadastrar
              </button>
              <button
                type="button"
                className="btn-close"
                onClick={() => setIsModalOpen(false)}
              >
                Fechar
              </button>
            </form>
          </div>
        </div>
      )}

      <h3 className="sub-title">Administradores Cadastrados</h3>
      <table className="admins-table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin, index) => (
            <tr key={index}>
              <td>{admin.name}</td>
              <td>{admin.email}</td>
              <td>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(admin._id)}
                >
                  Deletar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegisterAdmin;
