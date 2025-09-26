// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, name, email } or null
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // load user from localStorage (or you can fetch /auth/me from backend)
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (e) {
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // userData should be { id, name, email } from backend
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = async () => {
    try {
      // call backend logout to clear cookie (if you're using HttpOnly cookies)
      await fetch("http://localhost:4001/auth/logout", {
        method: "POST",
        credentials: "include", // needed if backend uses cookies
      });
    } catch (err) {
      // ignore network errors for logout
      console.warn("Logout request failed:", err);
    }
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
