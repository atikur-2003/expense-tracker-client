import React from "react";
import { NavLink } from "react-router";
import { FaHome, FaPlusCircle, FaChartPie, FaUser } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg border-r border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-purple-600">Expense Tracker</h1>
      </div>

      <nav className="flex flex-col gap-2 p-4">
        <NavLink
          to="/dashboard/overview"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`
          }
        >
          <FaHome /> Overview
        </NavLink>

        <NavLink
          to="/dashboard/add-expense"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`
          }
        >
          <FaPlusCircle /> Add Expense
        </NavLink>

        <NavLink
          to="/dashboard/reports"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`
          }
        >
          <FaChartPie /> Reports
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`
          }
        >
          <FaUser /> Profile
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
