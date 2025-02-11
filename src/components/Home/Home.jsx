import React from "react";
import { motion } from "framer-motion";
import "./home.css"
import Navbar from "../Navbar/Navbar";
import WhyChooseUs from "./WhyChooseUs";
import HomeHeroSection from "./HomeHeroSection";
import Features from "./Features";
import Footer from "../Footer/Footer";

const Home = () => {
  return (
    <>
      <Navbar />
      <HomeHeroSection />
      <Features />
      <WhyChooseUs />
      <Footer />
    </>
  );
};

export default Home;
