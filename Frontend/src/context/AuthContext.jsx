import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));

        const userData = {
          id: payload.id,
          email: payload.email,
          role: payload.role,
        };

        setUser(userData);
        setToken(storedToken);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }

    setLoading(false);
  }, []);


  const login = (data) => {
    localStorage.setItem("token", data.token);

    const userData = {
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    };

    setUser(userData);
    setToken(data.token);
  };

 
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};