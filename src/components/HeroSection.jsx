import React from "react";
import heroImg from "../assets/hero-image.avif";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";

const HeroSection = () => {
  const { user } = useAuth();
  return (
    <div className="flex flex-col-reverse md:flex-row  justify-between gap-7 px-5 md:px-10 lg:px-20 py-10 md:pb-16 pt-36 lg:pb-28">
      <div>
        <h1 className="text-2xl text-gray-800 md:text-3xl lg:text-4xl font-bold mb-4">
          Welcome to <br />{" "}
          <span className="text-purple-500">Expense Tracker</span>
        </h1>
        <p className="max-w-[300px] text-gray-600 lg:max-w-xl mb-5">
          The modern expense management system that helps you to manage your all
          income and expenses in one place in a organize way
        </p>
        {!user && (
          <Link to="/login">
            <button className="px-4 py-1.5 rounded-xl text-purple-500 border border-purple-500 font-semibold hover:bg-purple-500 hover:text-white transition-all duration-300 cursor-pointer">
              Get Started
            </button>
          </Link>
        )}
      </div>
      <div>
        <img src={heroImg} alt="" className=" md:w-85 lg:w-110 rounded-lg" />
      </div>
    </div>
  );
};

export default HeroSection;
