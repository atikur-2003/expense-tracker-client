import React from "react";
import HeroSection from "../components/HeroSection";
import FeaturesSection from "../components/FeatureSection";
import HowItWorksSection from "../components/HowItWorksSection";
import FAQSection from "../components/FAQSection";
import Navbar from '../components/Navbar'
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
