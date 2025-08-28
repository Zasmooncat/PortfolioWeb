// src/js/components/Sidebar.jsx
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  // Solo mostrar si hay usuario logueado
  if (!user) return null;

  const sidebarRoutes = [
    { path: "/todo", label: "To Do List", icon: "✓" },
    { path: "/contacts", label: "Contact List", icon: "📋" },
    { path: "/expenses", label: "Expenses Tracker", icon: "💰" },
    { path: "/calendar", label: "Calendar", icon: "📅" }
  ];

  return (
    // Solo sidebar para desktop - mobile se maneja desde Navbar
    <motion.aside
      initial={{ x: -250, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:flex fixed top-23 rounded-r-xl left-0 w-50 h-144 bg-linear-to-t from-transparent to-gray-950/50 pt-2 text-white shadow-lg flex-col z-100 "
    >
      <div className="px-8 py-2 border-b border-gray-700 mb-2">
        <p className="titulo-name text-cyan-400 text-sm uppercase">
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
                      ? "text-cyan-400"
                      : "text-gray-300 hover:bg-black hover:text-cyan-300"
                  }`}
              >
                <span className="font-medium">{"· " + route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  );
};

export default Sidebar;