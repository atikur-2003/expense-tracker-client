import React from "react";
import heroImg from "../assets/hero-image.avif";

const HeroImage = () => {
  return (
    <div className="">
      <img src={heroImg} alt="" className="w-120 rounded-lg" />
    </div>
  );
};

export default HeroImage;
