import { createContext, useState } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;

      localStorage.setItem("token", token);
      setUser({ ...user, token });

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
      setUser({ ...user, token });

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
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
