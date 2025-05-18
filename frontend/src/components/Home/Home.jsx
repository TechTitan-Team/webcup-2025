import React from "react";
import Header from "../Layout/Header/Header";
import Hero from "./Hero/Hero";
import Layout from "../Layout/Layout";
import AboutSection from "./AboutSection/AboutSection";
import Advantage from "./Advantage/Advantage";

const Home = () => {
  return (
    <Layout>
      <div className="home-page">
        <Header />
        <Hero />
        <Advantage />
        <AboutSection />
      </div>
    </Layout>
  );
};

export default Home;
