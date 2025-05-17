import React from "react";
import Header from "../Layout/Header/Header";
import Hero from "./Hero/Hero";

const Home = () => {
  return (
    <>
      <div className="home-page">
        <Hero />
      </div>
      <div className="home-page">
        <Header />
        <Hero />
      </div>
    </>
  );
};

export default Home;
