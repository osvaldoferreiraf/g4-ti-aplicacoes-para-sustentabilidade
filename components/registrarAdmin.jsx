import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [admins, setAdmins] = useState([]);
  
  const fetchAdmins = async () => {
    try {
      const response = await axios.get("/api/users");
      setAdmins(response.data);
    } catch (error) {
      console.error("Erro ao buscar administradores:", error);
      toast.error(
        error.response ? error.response.data.message : "Erro desconhecido"
      );
    }
  };
  
  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const response = await axios.post("/api/users", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const newAdmin = response.data;

      setAdmins((prevAdmins) => [...prevAdmins, newAdmin]);

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setIsModalOpen(false)
      fetchAdmins()
      toast.success("Administrador cadastrado com sucesso!");
    } catch (error) {
      toast.error(
        error.response ? error.response.data.message : "Erro ao cadastrar"
      );
    }
  };

  const handleDelete = (id) => {
    axios
      .delete(`/api/users?id=${id}`)
      .then(() => {
        setAdmins(admins.filter((admin) => admin._id !== id));
        toast.success("Administrador deletado com sucesso!");
      })
      .catch(() => {
        toast.error("Erro ao deletar administrador");
      });
  };

  return (
    <div>
      <div className="admin-register-div">
        <h2 className="title">Administradores</h2>
        <button className="btn" onClick={() => setIsModalOpen(true)}>
          Cadastrar Novo Admin
        </button>
      </div>
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

      <div className="admins-table-div">
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
    </div>
  );
};

export default RegisterAdmin;
