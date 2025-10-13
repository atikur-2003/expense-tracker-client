import React from "react";

const Navbar = () => {
  return (
    <div className="navbar md:px-6 lg:px-12 bg-base-100 shadow-sm">
      <div className="navbar-start">
        <a className="btn btn-ghost text-xl">Expense Tracker</a>
      </div>
      <div className="navbar-end">
        <a className="btn">Login</a>
      </div>
    </div>
  );
};

export default Navbar;
