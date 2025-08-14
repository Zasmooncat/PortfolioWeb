// ===============================
// src/context/AuthContext.jsx
// ===============================
import React, { createContext, useEffect, useState } from "react";
import { supabase } from "../supabase/client";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // datos de auth
  const [username, setUsername] = useState(null); // nombre del perfil
  const [loading, setLoading] = useState(true);

  // Función para traer el perfil desde Supabase
  const fetchProfile = async (userId) => {
    console.log("🚀 fetchProfile llamado con id:", userId);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, username, email")
        .eq("id", userId)
        .maybeSingle();

      console.log("✅ fetchProfile data:", data);
      console.log("❌ fetchProfile error:", error);

      if (error) {
        console.error("Error al obtener perfil:", error);
        setUsername(null);
        return;
      }

      if (!data) {
        console.log("⚠️ No existe perfil para ese id, creando uno nuevo...");
        // Si no existe perfil, intentar crearlo con los datos del usuario auth
        await createProfile(userId);
        return;
      }

      setUsername(data.username || null);
    } catch (err) {
      console.error("🔥 Excepción en fetchProfile:", err);
      setUsername(null);
    }
  };

  // Función para crear perfil si no existe
  const createProfile = async (userId) => {
    try {
      // Obtener datos del usuario autenticado
      const {
        data: { user: authUser },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !authUser) {
        console.error("Error al obtener usuario para crear perfil:", userError);
        return;
      }

      const desiredUsername =
        authUser.user_metadata?.username ||
        authUser.user_metadata?.name ||
        authUser.email?.split("@")[0] ||
        "Usuario";

      const { data, error } = await supabase
        .from("profiles")
        .insert([
          {
            id: userId,
            username: desiredUsername,
            email: authUser.email,
          },
        ])
        .select()
        .single();

      if (error) {
        console.error("Error al crear perfil:", error);
        return;
      }

      console.log("✅ Perfil creado:", data);
      // Aseguramos reflejar en UI inmediatamente
      setUsername(data?.username || desiredUsername);
    } catch (err) {
      console.error("🔥 Error al crear perfil:", err);
    }
  };

  // Función de logout
  const logout = async () => {
    console.log("🚪 Iniciando logout...");
    try {
      setLoading(true);

      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("❌ Error en signOut:", error);
        throw error;
      }

      console.log("✅ SignOut exitoso");

      // Limpiar estado inmediatamente
      setUser(null);
      setUsername(null);

      console.log("🧹 Estado limpiado");
    } catch (error) {
      console.error("🔥 Error al cerrar sesión:", error);

      // Incluso si hay error, limpiar el estado local
      setUser(null);
      setUsername(null);
    } finally {
      setLoading(false);
      console.log("🏁 Logout completado");
    }
  };

  useEffect(() => {
    let isMounted = true; // Flag para evitar setState en componentes desmontados

    // 1️⃣ Comprobar si ya hay sesión activa
    const getSession = async () => {
      console.log("🔄 AuthContext: Iniciando getSession...");

      try {
        // Añadir timeout de seguridad
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Timeout en getSession")), 5000)
        );

        const { data, error } = await Promise.race([
          sessionPromise,
          timeoutPromise,
        ]);

        console.log("📊 getSession data:", data);
        console.log("❌ getSession error:", error);

        if (!isMounted) return; // No continuar si el componente se desmontó

        if (error) {
          console.error("Error al obtener sesión:", error);
          setUser(null);
          setUsername(null);
          setLoading(false);
          return;
        }

        const currentUser = data?.session?.user || null;
        console.log("🔑 getSession currentUser:", currentUser?.email || "null");
        setUser(currentUser);

        if (currentUser) {
          console.log("👤 Usuario encontrado, obteniendo perfil...");
          await fetchProfile(currentUser.id);
        } else {
          console.log("🚫 No hay usuario, estableciendo null");
          setUsername(null);
        }
      } catch (err) {
        console.error("🔥 Excepción en getSession:", err);
        if (!isMounted) return;

        setUser(null);
        setUsername(null);

        // Si es timeout, mostrar mensaje específico
        if (err.message === "Timeout en getSession") {
          console.warn("⏰ Timeout en getSession, continuando sin sesión");
        }
      } finally {
        if (isMounted) {
          console.log("🏁 getSession completado, loading = false");
          setLoading(false);
        }
      }
    };

    // 2️⃣ Escuchar cambios de sesión (login, logout)
    console.log("👂 Configurando listener de auth...");
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!isMounted) return;

      console.log("🔄 Auth event:", event);
      console.log("🔄 Auth session:", session?.user?.email || "null");

      const currentUser = session?.user || null;
      console.log("🔄 onAuthStateChange currentUser:", currentUser?.email || "null");

      setUser(currentUser);

      if (currentUser && (event === "SIGNED_IN" || event === "TOKEN_REFRESHED")) {
        console.log("👤 Usuario logueado, obteniendo perfil...");
        await fetchProfile(currentUser.id);
      } else if (event === "SIGNED_OUT") {
        console.log("👋 Usuario deslogueado, limpiando estado...");
        setUsername(null);
      } else if (!currentUser) {
        console.log("🚫 No hay usuario, limpiando estado...");
        setUsername(null);
      }
    });

    console.log("✅ Listener configurado:", !!subscription);

    // Ejecutar getSession
    getSession();

    // Limpieza
    return () => {
      console.log("🧹 Limpiando subscription...");
      isMounted = false;
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, username, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};