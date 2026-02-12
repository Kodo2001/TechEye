import { createContext, useContext, useState, type ReactNode } from "react";
import {
  apiLogin,
  apiLogout,
  setToken,
  isAuthenticated as isServiceAuthenticated,
} from "../services/authService";
import type { AuthContextType } from "../types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() =>
    isServiceAuthenticated(),
  );

  const login = async (username: string, password: string) => {
    const response = await apiLogin({ username, password });
    const token = response.token;
    
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
    } else {
      throw new Error("Invalid login response: no token received");
    }
  };

  const logout = () => {
    apiLogout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
