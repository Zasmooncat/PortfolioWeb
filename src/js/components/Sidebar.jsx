// ===============================
// src/js/components/Sidebar.jsx
// ===============================
import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const sidebarRoutes = [
    { path: "/todo", label: "To Do List", icon: "✓" },
    { path: "/contacts", label: "Contact List", icon: "📋" },
    { path: "/expenses", label: "Expenses Tracker", icon: "💰" },
    { path: "/calendar", label: "Calendar", icon: "💰" }
  ];

  return (
    <>
      {/* Sidebar para desktop */}
     
<motion.aside
  initial={{ x: -250, opacity: 0 }} // empieza oculto a la izquierda
  animate={{ x: 0, opacity: 1 }}   // entra a su posición
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="hidden md:flex fixed top-23 rounded-r-4xl left-0 w-50 h-144 bg-black/50 pt-2 text-white shadow-lg flex-col z-100"
>
  <div className="px-8 py-2 border-b border-gray-700 mb-2">
    <p className="titulo text-2xl text-green-400 uppercase">
      {user.user_metadata.name || "User"}
    </p>
  </div>
  <nav className="p-6 flex-1">
    <ul className="space-y-2">
      {sidebarRoutes.map((route) => (
        <li key={route.path}>
          <Link
            to={route.path}
            className={`
              flex titulo text-xl uppercase px-2 space-x-3 py-3 border-gray-700 transition-colors duration-200
              ${
                location.pathname === route.path
                  ? "text-green-400"
                  : "text-gray-300 hover:bg-black hover:text-green-400"
              }`}
          >
            <span className="font-medium">{"· " + route.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
</motion.aside>

      {/* Sidebar para mobile */}
      <div className="md:hidden flex flex-col items-center justify-center ">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-center p-4 text-white bg-black/50  text-5xl focus:outline-none transition-colors duration-200 hover:text-green-600 rounded-full z-60"
        >
          {isOpen ? <X size={40} /> : <Menu size={40} />}
        </button>
      </div>

      
      {/* Menú desplegable mobile */}
<div
  className={`md:hidden fixed top-10 left-0 right-0 bg-black/93 z-50 p-5 pt-20 space-y-4
    overflow-hidden transition-all duration-500 ease-in-out
    ${isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
>
  <p className="text-green-400 titulo text-2xl border-b border-gray-700 p-5 flex flex-col items-center justify-center uppercase">
    {user.user_metadata.name || "User"}
  </p>
  {sidebarRoutes.map((route) => (
    <Link
      key={route.path}
      to={route.path}
      onClick={() => setIsOpen(false)} // cierra al seleccionar
      className={`
        z-5 flex flex-col items-center justify-center space-y-2 titulo text-xl uppercase px-2 py-3 rounded-lg transition-colors duration-200
        ${
          location.pathname === route.path
            ? "bg-green-600 text-white"
            : "text-gray-300 hover:bg-gray-800 hover:text-green-400"
        }`}
    >
      {route.label}
    </Link>
  ))}
</div>

    </>
  );
};

export default Sidebar;
