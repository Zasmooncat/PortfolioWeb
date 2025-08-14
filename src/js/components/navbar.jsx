// src/js/components/Navbar.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import logomooncat from "../../img/logomooncat.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [modalType, setModalType] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, username, logout } = useContext(AuthContext);

  const closeModal = () => {
    setModalType(null);
    setEmail("");
    setPassword("");
    setName("");
    setErrorMsg("");
    setSuccessMsg("");
    setLoading(false);
  };

  const handleRegister = async () => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      setLoading(true);

      console.log("🚀 Iniciando registro...");
      console.log("Email:", email.trim());
      console.log("Nombre:", name.trim());

      // Validar que el nombre no esté vacío
      if (!name.trim()) {
        setErrorMsg("El nombre es requerido");
        return;
      }

      console.log("📧 Enviando petición de registro a Supabase...");

      // Registrar en Auth con metadata
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: {
            name: name.trim(),
          },
        },
      });

      console.log("✅ Respuesta de registro:", { data, error });

      if (error) {
        console.error("❌ Error en signUp:", error);
        throw error;
      }

      const userId = data?.user?.id;
      console.log("👤 User ID obtenido:", userId);

      // Si el registro fue exitoso, intentar crear el perfil
      if (userId) {
        console.log("💾 Creando perfil en tabla profiles...");
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .insert([
            {
              id: userId,
              username: name.trim(),
              email: email.trim()
            }
          ])
          .select();

        console.log("📄 Respuesta perfil:", { profileData, profileError });

        if (profileError) {
          console.error("⚠️ Error al crear perfil (no crítico):", profileError);
          // No lanzamos error aquí porque el AuthContext puede crear el perfil después
        } else {
          console.log("✅ Perfil creado exitosamente:", profileData);
        }
      }

      console.log("🎉 Registro completado exitosamente");
      setSuccessMsg("Registro realizado. Revisa tu correo para confirmar.");
      
      // Limpiar el formulario después de 3 segundos
      setTimeout(() => {
        closeModal();
      }, 3000);

    } catch (err) {
      console.error("🔥 Error completo en registro:", err);
      console.error("🔥 Error message:", err.message);
      console.error("🔥 Error stack:", err.stack);
      
      let errorMessage = "Error inesperado.";
      
      if (err.message?.includes("User already registered")) {
        errorMessage = "Este email ya está registrado. Intenta iniciar sesión.";
      } else if (err.message?.includes("Password should be at least 6 characters")) {
        errorMessage = "La contraseña debe tener al menos 6 caracteres.";
      } else if (err.message?.includes("Unable to validate email address")) {
        errorMessage = "Email inválido. Verifica el formato.";
      } else {
        errorMessage = err.message || "Error inesperado.";
      }
      
      setErrorMsg(errorMessage);
    } finally {
      console.log("🏁 Finalizando registro, loading = false");
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      setLoading(true);

      console.log("🔑 Iniciando login...");
      console.log("Email:", email.trim());

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
console.log(data)
     

      if (error) {
        console.error("❌ Error en login:", error);
        throw error;
      }

      console.log("🎉 Login exitoso");
      setSuccessMsg("Login correcto");
      
      // Cerrar modal después de login exitoso
      setTimeout(() => {
        closeModal();
      }, 1000);

    } catch (err) {
      console.error("🔥 Error completo en login:", err);
      console.error("🔥 Error message:", err.message);
      
      // Mejorar los mensajes de error
      let errorMessage = "Error inesperado al iniciar sesión.";
      
      if (err.message.includes("Invalid login credentials")) {
        errorMessage = "Credenciales incorrectas. Verifica tu email y contraseña.";
      } else if (err.message.includes("Email not confirmed")) {
        errorMessage = "Debes confirmar tu email antes de iniciar sesión.";
      } else if (err.message.includes("Too many requests")) {
        errorMessage = "Demasiados intentos. Espera unos minutos.";
      } else {
        errorMessage = err.message || "Error inesperado al iniciar sesión.";
      }
      
      setErrorMsg(errorMessage);
    } finally {
      console.log("🏁 Finalizando login, loading = false");
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validaciones básicas
    if (!email.trim() || !password.trim()) {
      setErrorMsg("Email y contraseña son requeridos");
      return;
    }

    if (modalType === "register" && !name.trim()) {
      setErrorMsg("El nombre es requerido");
      return;
    }

    if (modalType === "login") {
      await handleLogin();
    } else if (modalType === "register") {
      await handleRegister();
    }
  };

  return (
    <>
      <nav className="bg-transparent py-3 relative z-20">
        <div className="flex justify-between items-center px-6">
          <Link to="/">
            <img src={logomooncat} className="w-10 me-10" alt="Logo" />
          </Link>

          <ul className="flex flex-row items-center w-full justify-between">
            <div className="flex flex-row"></div>

            <div className="flex flex-row">
              {!user ? (
                <>
                  <li
                    className="text-white hover:text-green-400 cursor-pointer mx-3"
                    onClick={() => setModalType("register")}
                  >
                    REGISTER
                  </li>
                  <li
                    className="text-white hover:text-green-400 cursor-pointer mx-3"
                    onClick={() => setModalType("login")}
                  >
                    LOGIN
                  </li>
                </>
              ) : (
                <>
                  <li className="text-white mx-3">
                    Welcome, {username || "User"}!
                  </li>
                  <li
                    className="text-white hover:text-green-400 cursor-pointer mx-3"
                    onClick={logout}
                  >
                    LOGOUT
                  </li>
                </>
              )}
            </div>
          </ul>
        </div>
      </nav>

      {modalType && !user && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <form onSubmit={handleSubmit} autoComplete="on">
              {modalType === "login" ? (
                <>
                  <h2 className="text-2xl font-bold mb-4">Iniciar Sesión</h2>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <input
                    type="password"
                    placeholder="Contraseña"
                    className="w-full p-2 mb-3 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  {errorMsg && (
                    <div className="text-red-600 text-sm mb-2 p-2 bg-red-50 rounded">
                      {errorMsg}
                    </div>
                  )}
                  {successMsg && (
                    <div className="text-green-600 text-sm mb-2 p-2 bg-green-50 rounded">
                      {successMsg}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-black hover:bg-green-500 text-white px-4 py-2 rounded"
                      disabled={loading}
                    >
                      {loading ? "Cargando..." : "Iniciar Sesión"}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold mb-4">Registrarse</h2>
                  <input
                    type="text"
                    placeholder="Nombre"
                    className="w-full p-2 mb-3 border rounded"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-3 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                  <input
                    type="password"
                    placeholder="Contraseña (mínimo 6 caracteres)"
                    className="w-full p-2 mb-3 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="6"
                    autoComplete="new-password"
                  />
                  {errorMsg && (
                    <div className="text-red-600 text-sm mb-2 p-2 bg-red-50 rounded">
                      {errorMsg}
                    </div>
                  )}
                  {successMsg && (
                    <div className="text-green-600 text-sm mb-2 p-2 bg-green-50 rounded">
                      {successMsg}
                    </div>
                  )}
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                      onClick={closeModal}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-black hover:bg-green-500 text-white px-4 py-2 rounded"
                      disabled={loading}
                    >
                      {loading ? "Registrando..." : "Registrarse"}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;