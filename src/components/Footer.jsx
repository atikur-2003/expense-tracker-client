import React from "react";

const Footer = () => {
  return (
    <footer className="footer sm:footer-horizontal footer-center bg-slate-800 text-white p-4">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by Expense Tracker
          </p>
        </aside>
      </footer>
  );
};

export default Footer;
