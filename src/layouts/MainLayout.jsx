import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import HeroImage from "../components/HeroImage";

const MainLayout = () => {
  return (
    <div className="">
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between px-4 md:px-10 lg:px-20">
        <Outlet />
      
        <HeroImage/>
      </div>
    </div>
  );
};

export default MainLayout;
