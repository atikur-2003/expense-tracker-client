import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { FaWallet } from "react-icons/fa6";
import { RiHandCoinFill } from "react-icons/ri";
import { FaHome } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import Loading from "../../components/Loading";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // Log user to debug
  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You Logged Out successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire(error);
      });
  };


  if (loading) {
    return <Loading/>;
  }
  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 z-30 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeSidebar}
      ></div>
      <div
        className={`fixed top-0 left-0 z-40  shadow-md h-full transform transition-transform duration-300 lg:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-5 border-b border-gray-200">
          <Link to="/">
            <h1 className="text-2xl font-bold text-purple-600">
              Expense Tracker
            </h1>
          </Link>
        </div>

        {/* User Profile Section */}
      <div className="flex flex-col items-center my-5">
        <div className="w-24 h-24 mb-2">
          <img
            src={user.photoURL}
            alt={`${user.displayName}'s avatar`}
            className="w-full h-full rounded-full object-cover 
            border-2 border-purple-500"
          />
        </div>
        <div className="text-center">
          <h3 className="text-lg text-gray-800 font-semibold">{user.displayName}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
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
          <button
            onClick={handleLogout}
            className="flex text-gray-800 items-center gap-2 px-4 py-2 rounded-lg cursor-pointer hover:bg-purple-100"
          >
            <LuLogOut /> Logout
          </button>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
