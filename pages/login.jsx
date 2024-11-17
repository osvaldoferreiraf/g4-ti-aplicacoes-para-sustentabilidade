import Image from "next/image";
import React, { useState, useEffect } from "react";
import LogoAmarela from "../public/assets/img/logoAmarela.svg";
import { useRouter } from "next/router";
import axios from "axios";

export default function Login() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    const isLoggedAdmin = localStorage.getItem("isLoggedAdmin");
    if (isLoggedAdmin === "true") {
      router.push("/painelAdm");
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleValidateLogin = async () => {
    if (!email || !password) {
      setErrorMessage("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const response = await axios.post("/api/login", { email, password });
      const { token, email: userEmail, isLoggedAdmin } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("userEmail", userEmail);
      localStorage.setItem("isLoggedAdmin", isLoggedAdmin.toString());

      router.push("/painelAdm");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Erro de conexão. Tente novamente mais tarde.";
      setErrorMessage(errorMessage);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="login-page">
      <div className="login-conteiner">
        <Image
          className="login-image"
          src={LogoAmarela}
          alt="logoAmarela"
          onClick={() => router.push("/")}
        />
        <span className="login-text">REALIZE SEU LOGIN DE ADMINISTRADOR</span>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="login-inputs">
          <input
            className="select-input"
            placeholder="Insira seu email"
            type="text"
            value={email}
            onChange={handleInputChange(setEmail)}
          />
          <div className="password-container">
            <input
              className="select-input"
              placeholder="Insira sua senha"
              type={passwordVisible ? "text" : "password"}
              value={password}
              onChange={handleInputChange(setPassword)}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="eye-button"
            >
              {passwordVisible ? "🙈" : "👁"}
            </button>
          </div>
          <button onClick={handleValidateLogin} className="login-button">
            LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
