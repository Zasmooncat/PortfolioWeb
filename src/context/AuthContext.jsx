// ===============================
// src/context/AuthContext.jsx
// ===============================
import React, { createContext, useState, useEffect } from "react";
import { supabase } from "../supabase/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error al obtener sesión:", error);
        } else {
          setUser(data?.session?.user || null);
        }
      } catch (error) {
        console.error("Error inicializando auth:", error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Escuchar cambios en el estado de autenticación
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password 
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error en signUp:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error) {
      console.error("Error en logout:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signUp,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};