import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ username }) => {
  return (
    <aside className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">Welcome, {username || 'User'}!</h2>
      <nav>
        <ul className="space-y-4">
          <li><Link to="/contacts" className="hover:text-green-400">Contact List</Link></li>
          <li><Link to="/todo" className="hover:text-green-400">To Do List</Link></li>
          <li><Link to="/expenses" className="hover:text-green-400">Expenses Tracker</Link></li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
