import React from "react";

const Navbar = () => {
  return (
    <div className="navbar  px-5 md:px-10 lg:px-20 shadow-sm">
      <div className="navbar-start">
        <a className="text-xl text-purple-500 font-bold">Expense Tracker</a>
      </div>
      <div className="navbar-end">
        <a className="px-3 py-1 rounded-xl text-purple-500 border border-purple-500 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer">
          Login
        </a>
      </div>
    </div>
  );
};

export default Navbar;
