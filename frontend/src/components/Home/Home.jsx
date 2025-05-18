import React, { useEffect } from "react";
import Layout from "../Layout/Layout";
import Navigation from "../Layout/Navigation/Navigation";
import Footer from "../Layout/Footer/Footer";
import TheEndHero from "./TheEndHero/TheEndHero";
import StylesSection from "./StylesSection/StylesSection";
import HowItWorks from "./HowItWorks/HowItWorks";
import PricingSection from "./PricingSection/PricingSection";
import ExamplesSection from "./ExamplesSection/ExamplesSection";
import ContactSection from "./ContactSection/ContactSection";
import CTASection from "./CTASection/CTASection";
import { initAllAnimations } from "../../scripts/theend-animations";
import { motion } from "framer-motion";

import "../../styles/theend.css";

const Home = () => {
  useEffect(() => {
    // Initialize animations
    initAllAnimations();

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = "smooth";

    // Apply scroll-based effects
    const handleScroll = () => {
      // Parallax effect for background shapes
      const shapes = document.querySelectorAll(".bg-shape");
      const scrollY = window.scrollY;

      shapes.forEach((shape, index) => {
        const speed = 0.05 + index * 0.02;
        const yPos = scrollY * speed;
        shape.style.transform = `translateY(${yPos}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Layout>
      <div className="home-page min-h-screen overflow-x-hidden relative">
        <div className="fixed inset-0 bg-gradient-to-br from-indigo-50/80 via-white/90 to-indigo-50/80"></div>

        <div className="fixed inset-0 opacity-20 pointer-events-none">
          <div className="bg-shape absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-to-t from-transparent to-indigo-100 rounded-full blur-3xl"></div>
          <div className="bg-shape absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-b from-transparent to-indigo-100 rounded-full blur-3xl"></div>
          <div className="bg-shape absolute top-1/4 left-1/4 w-1/4 h-1/4 bg-gradient-to-tr from-transparent to-pink-50 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10">
          <Navigation />
          <div className="relative">
            <TheEndHero />
            <StylesSection />
            <HowItWorks />
            <PricingSection />
            <ExamplesSection />
            <ContactSection />
            <CTASection />
            <Footer />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
