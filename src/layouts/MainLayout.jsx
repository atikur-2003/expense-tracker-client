import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";

const MainLayout = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col-reverse lg:flex-row justify-between py-10 lg:py-30 px-4 md:px-10 lg:px-20 bg-violet-50">
        <Outlet />
        <HeroImage />
      </div>
    </div>
  );
};

export default MainLayout;
