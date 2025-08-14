// ===============================
// src/js/components/Sidebar.jsx
// ===============================
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Sidebar = () => {
  const { username, user } = useContext(AuthContext);
  const location = useLocation();

  // No mostrar sidebar si no hay usuario
  if (!user) {
    return null;
  }

  // Lista de rutas de la sidebar
  const sidebarRoutes = [
    {
      path: "/contacts",
      label: "Contact List",
      icon: "📋",
    },
    {
      path: "/todo",
      label: "To Do List",
      icon: "✓",
    },
    {
      path: "/expenses",
      label: "Expenses Tracker",
      icon: "💰",
    },
  ];

  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg z-10">
      {/* Header de la sidebar */}
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-xl font-bold text-green-400">Welcome!</h2>
        <p className="text-sm text-gray-300 mt-1">{username || "User"}</p>
      </div>

      {/* Navigation */}
      <nav className="p-6">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Personal Tools
        </h3>
        <ul className="space-y-2">
          {sidebarRoutes.map((route) => (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`
                  flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                  ${
                    location.pathname === route.path
                      ? 'bg-green-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-green-400'
                  }
                `}
              >
                <span className="text-lg">{route.icon}</span>
                <span className="font-medium">{route.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer de la sidebar */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-700">
        <div className="text-xs text-gray-500">Logged in as</div>
        <div className="text-sm text-gray-300 truncate">{user?.email || "Unknown"}</div>
      </div>
    </aside>
  );
};

export default Sidebar;
