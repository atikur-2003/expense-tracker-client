import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

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

  return (
    <div className="navbar fixed top-0 w-full z-50 bg-base-200 px-5 md:px-10 lg:px-20 shadow-sm">
      <div className="navbar-start">
        <Link to="/">
          <p className="text-xl text-purple-500 font-bold">Expense Tracker</p>
        </Link>
      </div>
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center space-x-2">
            {/* Profile Image */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-10 h-10 rounded-full border border-purple-500 overflow-hidden focus:outline-none cursor-pointer transition-all duration-300"
            >
              <img
                src={
                  user?.photoURL || "https://i.ibb.co/2nK3zHd/default-user.png"
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </button>

            {/* Dropdown */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                key="dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="absolute right-0 top-16 w-44 bg-white shadow-lg rounded-lg  z-50">
                  <p className="px-4 py-2 text-gray-800 font-medium">
                    {user?.displayName || "User"}
                  </p>
                  <Link
                    to="/dashboard/overview"
                    className="block px-4 py-2 hover:bg-purple-50 text-gray-700"
                    onClick={() => setDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-purple-50 text-gray-700 cursor-pointer hover:rounded-lg"
                  >
                    Logout
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <Link
            to="/login"
            className="px-4 py-1 rounded-lg text-base border border-purple-500  text-purple-500 hover:bg-purple-500 hover:text-white"
          >
            Log In
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
