import React from "react";
import Header from "../Layout/Header/Header";
import Hero from "./Hero/Hero";
import Layout from "../Layout/Layout";

const Home = () => {

  return (
    <Layout>
      <div className="home-page">
        <Header />
        <Hero />
      </div>
      <div className="home-page">
        <Header />
        <Hero />
      </div>
    </Layout>
  );
};

export default Home;
