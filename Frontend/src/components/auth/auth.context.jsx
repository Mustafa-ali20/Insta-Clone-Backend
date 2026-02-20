import { createContext, useState, useEffect } from "react";
import { login, register, getMe } from "./services/auth.api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (email, password) => {
    setLoading(true); // this will keep the loading state true until the data is recevied
    try {
      const response = await login(email, password);
      setUser(response.user);
    } catch (error) {
      console.log("Login error:", error);
    } finally {
      setLoading(false); // then the state will go false
    }
  };

  const handleRegister = async (username, fullName, email, password) => {
    setLoading(true);
    try {
      const response = await register(username, fullName, email, password);
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, handleLogin, handleRegister }}
    >
      {children}
    </AuthContext.Provider>
  );
}
