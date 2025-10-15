import React from "react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <div className="navbar px-5 md:px-10 lg:px-20 shadow-sm">
      <div className="navbar-start">
        <Link to='/'>
        <p className="text-xl text-purple-500 font-bold">Expense Tracker</p>
        </Link>
      </div>
      <div className="navbar-end">
        <Link to='/login'>
          <button className="px-3 py-1 rounded-xl text-purple-500 border border-purple-500 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
