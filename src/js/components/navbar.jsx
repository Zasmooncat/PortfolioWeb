// src/js/components/navbar.jsx
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../supabase/client";
import logomooncat from "../../img/logomooncat.png";
import { AuthContext } from "../../context/AuthContext";

const Navbar = ({ username }) => {
    const [modalType, setModalType] = useState(null); // "login" | "register" | null
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const { user, logout } = useContext(AuthContext);

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

            // 1) Registrar en auth y guardar name en user_metadata
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name, // se guarda en user.user_metadata.name
                    },
                },
            });

            if (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }

            // 2) Si existe data.user (id), insertar fila en profiles con username
            const userId = data?.user?.id;
            if (userId) {
                const { error: profileError } = await supabase
                    .from("profiles")
                    .insert([{ id: userId, username: name }]);

                if (profileError) {
                    // Puede fallar por políticas RLS o por registro previo en profiles
                    console.error("Error guardando profile:", profileError);
                    setErrorMsg(
                        "Registro OK en Auth, pero fallo al guardar perfil. Revisa consola."
                    );
                    setLoading(false);
                    return;
                }
            }

            // Éxito: normalmente user debe confirmar email, así que informamos al usuario.
            setSuccessMsg("Registro realizado. Revisa tu correo para confirmar.");
            // opcional: cerrar modal tras un breve delay
            // setTimeout(closeModal, 1800);
        } catch (err) {
            console.error(err);
            setErrorMsg("Error inesperado durante el registro.");
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async () => {
        try {
            setErrorMsg("");
            setSuccessMsg("");
            setLoading(true);

            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }

            // login OK -> cerramos modal, el AuthProvider debe actualizar el user via listener
            setSuccessMsg("Login correcto");
            closeModal();
        } catch (err) {
            console.error(err);
            setErrorMsg("Error inesperado al iniciar sesión.");
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                                        onClick={() => {
                                            setModalType("register");
                                            setErrorMsg("");
                                            setSuccessMsg("");
                                        }}
                                    >
                                        REGISTER
                                    </li>
                                    <li
                                        className="text-white hover:text-green-400 cursor-pointer mx-3"
                                        onClick={() => {
                                            setModalType("login");
                                            setErrorMsg("");
                                            setSuccessMsg("");
                                        }}
                                    >
                                        LOGIN
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="text-white mx-3">Welcome, {username || "User"}</li>
                                    <li
                                        className="text-white hover:text-green-400 cursor-pointer mx-3"
                                        onClick={() => logout()}
                                    >
                                        LOGOUT
                                    </li>
                                </>
                            )}
                        </div>
                    </ul>
                </div>
            </nav>

            {/* === MODAL (login / register) === */}
            {modalType && !user && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        <form onSubmit={handleSubmit} autoComplete="on">
                            {modalType === "login" ? (
                                <>
                                    <h2 className="text-2xl font-bold mb-4">Login</h2>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="w-full p-2 mb-3 border rounded"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="w-full p-2 mb-3 border rounded"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="current-password"
                                        required
                                    />

                                    {errorMsg && (
                                        <div className="text-red-600 text-sm mb-2">{errorMsg}</div>
                                    )}
                                    {successMsg && (
                                        <div className="text-green-600 text-sm mb-2">{successMsg}</div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <button
                                            type="button"
                                            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                            onClick={closeModal}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-black hover:bg-green-500 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? "..." : "Login"}
                                        </button>
                                    </div>

                                    <div className="text-sm mt-4 text-center">
                                        ¿No tienes cuenta?{" "}
                                        <button
                                            type="button"
                                            className="text-blue-600 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setModalType("register");
                                                setErrorMsg("");
                                                setSuccessMsg("");
                                            }}
                                        >
                                            Regístrate
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h2 className="text-2xl font-bold mb-4">Register</h2>

                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Name"
                                        className="w-full p-2 mb-3 border rounded"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        autoComplete="name"
                                        required
                                    />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                        className="w-full p-2 mb-3 border rounded"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        autoComplete="email"
                                        required
                                    />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="w-full p-2 mb-3 border rounded"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        autoComplete="new-password"
                                        required
                                    />

                                    {errorMsg && (
                                        <div className="text-red-600 text-sm mb-2">{errorMsg}</div>
                                    )}
                                    {successMsg && (
                                        <div className="text-green-600 text-sm mb-2">{successMsg}</div>
                                    )}

                                    <div className="flex justify-between items-center">
                                        <button
                                            type="button"
                                            className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                            onClick={closeModal}
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            className="bg-black hover:bg-green-500 text-white px-4 py-2 rounded"
                                            disabled={loading}
                                        >
                                            {loading ? "..." : "Register"}
                                        </button>
                                    </div>

                                    <div className="text-sm mt-4 text-center">
                                        ¿Ya tienes cuenta?{" "}
                                        <button
                                            type="button"
                                            className="text-blue-600 cursor-pointer hover:underline"
                                            onClick={() => {
                                                setModalType("login");
                                                setErrorMsg("");
                                                setSuccessMsg("");
                                            }}
                                        >
                                            Inicia sesión
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
