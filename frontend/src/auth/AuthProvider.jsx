import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(
    !!localStorage.getItem("accessToken")
  );

  // dipanggil setelah login sukses
  const login = (token) => {
    localStorage.setItem("accessToken", token);
    setIsAuth(true);
  };

  // dipanggil saat logout
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

// helper biar gampang dipakai
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);