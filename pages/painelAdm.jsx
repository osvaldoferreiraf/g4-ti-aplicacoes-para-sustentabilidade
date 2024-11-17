import AnimalList from "@/components/AnimalList";
import React, { useEffect, useState } from "react";
import RegistrarAdmin from "../components/registrarAdmin";
import { useRouter } from "next/router";

function FormComponent() {
  return <div>Formulário</div>;
}

export default function PainelAdm() {
  const router = useRouter();
  const [selectedComponent, setSelectedComponent] = useState("animalList");
  const [isLoggedAdmin, setIsLoggedAdmin] = useState(false);

  const checkAdminStatus = () => {
    const adminStatus = localStorage.getItem("isLoggedAdmin") === "true";
    setIsLoggedAdmin(adminStatus);
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedAdmin");
    router.push("/");
  };

  const renderComponent = () => {
    switch (selectedComponent) {
      case "animalList":
        return <AnimalList />;
      case "registerAdmin":
        return <RegistrarAdmin />;
      case "form":
        return <FormComponent />;
      default:
        return <div>Bem-vindo ao painel de administração!</div>;
    }
  };

  if (!isLoggedAdmin) {
    return (
      <div className="error-message">
        Você não tem permissão para acessar esta página.
      </div>
    );
  }

  return (
    <div className="painel-container">
      <aside className="menu-lateral">
        <ul>
          <li onClick={() => setSelectedComponent("animalList")}>
            Lista de Animais
          </li>
          <li onClick={() => setSelectedComponent("registerAdmin")}>
            Cadastrar Admin
          </li>
          <li onClick={() => setSelectedComponent("form")}>Formulário</li>
          <li onClick={handleLogout}>Sair</li>
        </ul>
      </aside>
      <main className="painel-conteudo">{renderComponent()}</main>
    </div>
  );
}
