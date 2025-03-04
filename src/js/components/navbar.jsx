import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logomooncat from "../../img/logomooncat.png"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-black py-3">
            <div className="flex justify-between items-center px-6">
                <img src={logomooncat} className="w-10 me-10" alt="Logo" />

                <ul className="flex flex-row items-center w-full justify-between">
                    {/* Menú principal */}
                    <div className="flex flex-row">
                        <li className="text-white hover:text-green-400 cursor-pointer mx-3">
                            <NavLink to="/">HOME</NavLink>
                        </li>

                        {/* Dropdown PROJECTS */}
                        <li
                            className="relative text-white hover:text-green-400 cursor-pointer mx-3"
                            onMouseEnter={() => setIsOpen(true)}
                            onMouseLeave={() => setIsOpen(false)}
                        >
                            <Link to="/projects">PROJECTS</Link>

                            {/* Contenido del dropdown */}
                            {isOpen && (
                                <ul onMouseEnter={() => setIsOpen(true)}
                                    onMouseLeave={() => setIsOpen(false)}
                                    className="absolute left-0 bg-black border border-gray-700 rounded-md shadow-lg  w-48">
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/counter" className="block px-3 text-white">SIMPLE COUNTER</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/chrono" className="block px-3 text-white">CHRONOMETER</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/countdown" className="block px-3 text-white">COUNT DOWN</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/todo" className="block px-3 text-white">TO DO LIST</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/calculator" className="block px-3 text-white">CALCULATOR</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/cards" className="block px-3 text-white">RANDOM CARDS</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/memegenerator" className="block px-3 text-white">MEME GENERATOR</Link>
                                    </li>
                                    <li className="py-1 hover:bg-gray-800 rounded">
                                        <Link to="/weather" className="block px-3 text-white">APP WEATHER</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="text-white hover:text-green-400 cursor-pointer mx-3">
                            <NavLink to="/">INFO</NavLink>
                        </li>
                        <li className="text-white hover:text-green-400 cursor-pointer mx-3">
                            <NavLink to="/">CONTACT</NavLink>
                        </li>
                    </div>

                    {/* Opciones de Registro/Login */}
                    <div className="flex flex-row">
                        <li className="text-white hover:text-green-400 cursor-pointer mx-3">
                            <NavLink to="/">REGISTER</NavLink>
                        </li>
                        <li className="text-white hover:text-green-400 cursor-pointer mx-3">
                            <NavLink to="/">LOGIN</NavLink>
                        </li>
                    </div>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
