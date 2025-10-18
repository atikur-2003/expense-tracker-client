import React from "react";
import { Link, NavLink } from "react-router";
import { FaHome, FaChartPie, FaUser } from "react-icons/fa";
import { FaWallet } from "react-icons/fa6";
import { RiHandCoinFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className="fixed left-0 top-0 w-64 h-full bg-white shadow-lg border-r border-gray-200">
      <div className="p-5 border-b border-gray-200">
        <Link to="/">
          <h1 className="text-2xl font-bold text-purple-600">
            Expense Tracker
          </h1>
        </Link>
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
          to="/dashboard/income"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`
          }
        >
          <FaWallet /> Income
        </NavLink>
        <NavLink
          to="/dashboard/expense"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-purple-500 text-white"
                : "text-gray-700 hover:bg-purple-100"
            }`
          }
        >
          <RiHandCoinFill /> Expense
        </NavLink>        
      </nav>
    </div>
  );
};

export default Sidebar;
