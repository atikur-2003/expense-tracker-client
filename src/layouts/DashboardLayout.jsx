import { useState } from "react";
import { Outlet } from "react-router";
import Sidebar from "../pages/dashboardPages/Sidebar";
import DashboardNavbar from "../pages/dashboardPages/DashboardNavbar";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar (desktop or mobile) */}
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:ml-60">
        {/* Navbar (visible on small screens) */}
        <DashboardNavbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />

        {/* Main Dashboard Content */}
        <main
          onClick={closeSidebar}
          className="flex-1 p-5 md:p-8"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
