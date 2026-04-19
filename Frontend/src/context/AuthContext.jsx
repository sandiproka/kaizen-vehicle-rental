import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null); // 🔥 ADD THIS
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      try {
        const payload = JSON.parse(atob(storedToken.split(".")[1]));

        setUser({
          id: payload.id,
          email: payload.email,
          role: payload.role,
        });

        setToken(storedToken); // 🔥 IMPORTANT
      } catch (err) {
        console.error("Invalid token");
      }
    }

    setLoading(false);
  }, []);

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setToken(data.token); // 🔥 IMPORTANT

    setUser({
      id: data.user.id,
      email: data.user.email,
      role: data.user.role,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user"); // 🔥 ADD THIS
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};