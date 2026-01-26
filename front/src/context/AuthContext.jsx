import { useEffect, useState } from "react";
import { AuthContext } from "./Auth.js";
import api from "../services/api";

const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    const decode = JSON.parse(atob(payload));
    return decode;
  } catch (error) {
    console.error("Erro ao decodificar token", error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          const decoded = decodeToken(token);

          if (decoded) {
            // Tenta diferentes estruturas possíveis do JWT
            const userData = decoded.user || decoded.data?.user || decoded;
            if (userData && userData.id) {
              setUser(userData);
            } else {
              throw new Error("Estrutura de token inválida");
            }
          } else {
            throw new Error("Token não decodificado");
          }
        }
      } catch (error) {
        console.error("Token inválido", error);
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      return { success: true, message: "Login bem-sucedido!" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error no login",
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setUser(user);

      return { success: true, message: "Registro bem-sucedido!" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Error no registro",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user && !!localStorage.getItem("token"),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
