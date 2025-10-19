import React from "react";
import { Link, NavLink } from "react-router";
import { FaWallet } from "react-icons/fa6";
import { RiHandCoinFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ isOpen, closeSidebar }) => {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      ></div>
      <div className={`fixed top-0 left-0 z-40 bg-white shadow-md h-full transform transition-transform duration-300 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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
            onClick={closeSidebar}
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
    </>
  );
};

export default Sidebar;
