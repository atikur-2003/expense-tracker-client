import { FaXmark } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router";

const DashboardNavbar = ({ isOpen, toggleSidebar }) => {
  return (
    <header className="bg-white shadow-md px-4 py-3 flex items-center justify-between lg:hidden">
      <Link to="/">
        <h2 className="text-lg font-semibold text-purple-600">
          Expense Tracker
        </h2>
      </Link>
      <button
        onClick={toggleSidebar}
        className="text-gray-600 hover:text-purple-600 transition"
      >
        {isOpen ? <FaXmark size={25} /> : <IoMenu size={26} />}
      </button>
    </header>
  );
};

export default DashboardNavbar;
