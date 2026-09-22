import { createContext, useContext, useState } from "react";
import { api } from "../api";
import "../styles/AuthContext.css";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("luxora_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const persist = (token, userData) => {
    localStorage.setItem("luxora_token", token);
    localStorage.setItem("luxora_user", JSON.stringify(userData));
    setUser(userData);
  };

  const login = async (email, name = "") => {
    const data = await api.login({ email, name });
    persist(data.token, data.user);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await api.register({ name, email, password });
    persist(data.token, data.user);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("luxora_token");
    localStorage.removeItem("luxora_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
