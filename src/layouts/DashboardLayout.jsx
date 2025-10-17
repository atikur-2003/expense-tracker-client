import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../pages/dashboardPages/Sidebar';

const DashboardLayout = () => {
    return (
        <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 ml-64 p-6 transition-all duration-300">
        <Outlet />
      </div>
    </div>
    );
};

export default DashboardLayout;