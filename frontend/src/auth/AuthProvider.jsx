import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("accessToken")
  );

  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuth(true);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setIsAuth(false);
  };

  return (
    <AuthContext.Provider value={{ isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};