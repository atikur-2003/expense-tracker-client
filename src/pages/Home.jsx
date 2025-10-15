import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FAQSection from "../components/FAQSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
    </div>
  );
};

export default Home;
