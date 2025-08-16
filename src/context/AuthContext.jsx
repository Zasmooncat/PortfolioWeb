// ===============================
// src/context/AuthContext.jsx
// ===============================
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Al iniciar, intentamos cargar usuario desde localStorage
    const storedUser = localStorage.getItem("supabaseUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  // -------------------------------
  // 🔹 Guardar en localStorage cuando cambia user
  // -------------------------------
  useEffect(() => {
    if (user) {
      localStorage.setItem("supabaseUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("supabaseUser");
    }
  }, [user]);

  // -------------------------------
  // 🔹 Cargar sesión de Supabase y escuchar cambios
  // -------------------------------
  useEffect(() => {
    const initAuth = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) console.error("Error al obtener sesión:", error);
      setUser(data?.session?.user || null);
      setLoading(false);
    };

    initAuth();

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth event:", event);
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      }
    );

    return () => {
      subscription?.subscription?.unsubscribe();
    };
  }, []);

  // -------------------------------
  // 🔹 Funciones de auth
  // -------------------------------
  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  };

  const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
    localStorage.removeItem("supabaseUser");
  };

  // -------------------------------
  // 🔹 Valores del contexto
  // -------------------------------
  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signUp,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
