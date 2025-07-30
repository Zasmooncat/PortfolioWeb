import React, { useState } from "react";
import { Link } from "react-router-dom";
import logomooncat from "../../img/logomooncat.png";

const Navbar = () => {
    const [modalType, setModalType] = useState(null); // null, "login", "register"

    const closeModal = () => setModalType(null);

    return (
        <>
            <nav className="bg-transparent py-3 relative z-20">
                <div className="flex justify-between items-center px-6">
                    <Link to="/">
                        <img src={logomooncat} className="w-10 me-10" alt="Logo" />
                    </Link>

                    <ul className="flex flex-row items-center w-full justify-between">
                        <div className="flex flex-row"></div>

                        {/* Botones */}
                        <div className="flex flex-row">
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
                        </div>
                    </ul>
                </div>
            </nav>

            {/* === MODAL === */}
            {modalType && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                        {modalType === "login" ? (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Login</h2>
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 mb-3 border rounded"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 mb-3 border rounded"
                                />

                                <div className="flex justify-between items-center">
                                    <button
                                        className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button className="bg-black hover:bg-green-500 text-white px-4 py-2 rounded">
                                        Login
                                    </button>
                                </div>

                                <p className="text-sm mt-4 text-center">
                                    ¿No tienes cuenta?{" "}
                                    <span
                                        className="text-blue-600 cursor-pointer hover:underline"
                                        onClick={() => setModalType("register")}
                                    >
                                        Regístrate
                                    </span>
                                </p>
                            </>
                        ) : (
                            <>
                                <h2 className="text-2xl font-bold mb-4">Register</h2>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    className="w-full p-2 mb-3 border rounded"
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 mb-3 border rounded"
                                />
                                <input
                                    type="password"
                                    placeholder="Password"
                                    className="w-full p-2 mb-3 border rounded"
                                />

                                <div className="flex justify-between items-center">
                                    <button
                                        className="bg-gray-400 hover:bg-gray-600 text-white px-4 py-2 rounded"
                                        onClick={closeModal}
                                    >
                                        Cancel
                                    </button>
                                    <button className="bg-black hover:bg-green-500 text-white px-4 py-2 rounded">
                                        Register
                                    </button>
                                </div>

                                <p className="text-sm mt-4 text-center">
                                    ¿Ya tienes cuenta?{" "}
                                    <span
                                        className="text-blue-600 cursor-pointer hover:underline"
                                        onClick={() => setModalType("login")}
                                    >
                                        Inicia sesión
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
