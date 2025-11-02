import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, History, Shapes } from 'lucide-react';

const Sidebar = () => {
  
  const navLinkClasses = ({ isActive }) =>
    `flex items-center p-3 my-1 rounded-lg transition-colors duration-200 ${
      isActive
        ? 'bg-slate-700 text-white shadow-md'
        : 'text-gray-300 hover:bg-slate-800 hover:text-white'
    }`;

  return (
    <aside className="w-64 bg-[#111827] text-white flex-shrink-0 p-4 hidden md:flex flex-col">
      <h1 className="text-2xl font-bold mb-8">Expense Tracker</h1>

      <nav className="flex-1">
        <ul>
          <li>
            <NavLink to="/" className={navLinkClasses}>
              <LayoutDashboard className="mr-3" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" className={navLinkClasses}>
              <PlusCircle className="mr-3" />
              Add Transaction
            </NavLink>
          </li>
          <li>
            <NavLink to="/history" className={navLinkClasses}>
              <History className="mr-3" />
              History
            </NavLink>
          </li>
          <li>
            <NavLink to="/categories" className={navLinkClasses}>
              <Shapes className="mr-3" />
              Categories
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;