// ===============================
// src/js/components/Sidebar.jsx
// ===============================
import React, { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) return null;

  const sidebarRoutes = [
    { path: "/contacts", label: "Contact List", icon: "📋" },
    { path: "/todo", label: "To Do List", icon: "✓" },
    { path: "/expenses", label: "Expenses Tracker", icon: "💰" },
  ];

  return (
    <>
      {/* Sidebar para desktop */}
      <aside className="hidden md:flex fixed top-15 left-0 w-50 h-full bg-black/50 pt-10 text-white shadow-lg flex-col">
        <div className="px-8 py-4 border-b border-gray-700 mb-6">
          <p className="titulo text-2xl text-green-400 uppercase">
            {user.user_metadata.name || "User"}
          </p>
        </div>
        <nav className="p-6 flex-1">
          <ul className="space-y-2">
            <p className="uppercase text-sm text-gray-400 mb-8 mx-2">
              Your Apps
            </p>
            {sidebarRoutes.map((route) => (
              <li key={route.path}>
                <Link
                  to={route.path}
                  className={`
                    flex titulo text-xl uppercase px-2 space-x-3 py-3 rounded-lg transition-colors duration-200
                    ${
                      location.pathname === route.path
                        ? "bg-green-600 text-white"
                        : "text-gray-300 hover:bg-black hover:text-green-400"
                    }`}
                >
                  <span className="font-medium">{"· " + route.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Sidebar para mobile */}
      <div className="z-10 md:hidden top-10 left-0 right-0  flex flex-col items-center justify-center p-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-white text-5xl focus:outline-none z-10"
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Menú desplegable mobile */}
      {isOpen && (
        <div className="md:hidden fixed top-25 left-0 right-0 bg-black/90 z-50 p-5 mt-5 space-y-4">
          <p className="text-green-400 titulo text-2xl border-b border-gray-700 p-5 flex flex-col items-center justify-center  uppercase">
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
      )}
    </>
  );
};

export default Sidebar;
