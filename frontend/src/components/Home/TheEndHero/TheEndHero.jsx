import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Import image - adjust the path as needed
import heroImage from "../../../assets/images/pexels-by.png";

const TheEndHero = () => {
  const { scrollYProgress } = useScroll();
  
  // Create motion values for blur effect
  const blurValue = useTransform(scrollYProgress, [0, 0.3], [0, 10]);
  const opacityValue = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.15], [0, 12]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const imageX = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  
  // Text motion values
  const textX = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const paragraphY = useTransform(scrollYProgress, [0, 0.2], [0, -10]);

  return (
    <section
      id="accueil"
      className="min-h-screen relative flex items-center pt-24 overflow-hidden"
    >
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-200 w-[800px] h-[800px] -top-[400px] -left-[200px] animate-pulse-slow opacity-20 rounded-full"></div>
        <div
          className="animated-bg-shape bg-pink-100 w-[600px] h-[600px] -bottom-[300px] -right-[200px] animate-pulse-slow opacity-20 rounded-full"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="animated-bg-shape bg-indigo-100 w-[500px] h-[500px] top-[30%] right-[10%] animate-pulse-slow opacity-15 rounded-full"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-slate-50/30 to-pink-50/30"
        style={{ 
          backdropFilter: `blur(${blurValue})`,
          opacity: opacityValue
        }}
      ></motion.div>

      <div className="container max-w-7xl mx-auto px-10 md:px-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div style={{ x: textX }}>
            <div className="relative mb-6 inline-block">
              <span className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-pink-300 opacity-50"></span>
              <motion.h1 className="text-reveal mb-0" style={{ opacity: titleOpacity }}>
                <span className="text-5xl md:text-7xl font-display font-bold leading-none block">
                  THE<span className="text-indigo-500">END</span>
                </span>
              </motion.h1>
              <span className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-pink-300 opacity-50"></span>
            </div>

            <motion.h2 className="text-reveal mb-8" style={{ opacity: titleOpacity }}>
              <span className="text-3xl md:text-5xl font-display font-bold leading-tight block mt-2">
                VOTRE DERNIER <span className="text-pink-500">MESSAGE</span>
              </span>
            </motion.h2>

            <div className="stagger-children">
              <motion.p 
                className="text-base max-w-md mb-8 opacity-90 text-gray-600"
                style={{ y: paragraphY }}
              >
                En tant que plateforme d'adieu numérique, nous nous concentrons
                sur la création d'expériences d'adieu percutantes et mémorables.
              </motion.p>

              <div className="flex items-center mb-12">
                <div className="w-12 h-0.5 bg-gradient-to-r from-indigo-300 to-pink-400 mr-4"></div>
                <motion.p 
                  className="text-base max-w-md opacity-90 italic text-gray-600"
                  style={{ y: paragraphY }}
                >
                  Rendez votre départ inoubliable. Racontez votre histoire.
                  Claquéz la porte.
                </motion.p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#styles"
                  className="magnetic-btn group relative overflow-hidden bg-gradient-to-r from-indigo-400 to-pink-300 text-white px-7 py-3 font-semibold text-sm inline-flex items-center gap-3 justify-center rounded-md shadow-lg shadow-pink-200 hover:shadow-xl hover:shadow-pink-100/70 transition-all duration-300"
                >
                  <span className="relative z-10">CRÉER VOTRE ADIEU</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-pink-600 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
                </a>

                <a
                  href="#exemples"
                  className="magnetic-btn group relative overflow-hidden bg-white border border-indigo-200 text-indigo-500 px-7 py-3 font-semibold text-sm inline-flex items-center gap-3 justify-center rounded-md shadow-md shadow-indigo-100 hover:shadow-lg hover:shadow-pink-100/70 transition-all duration-300"
                >
                  <span className="relative z-10">VOIR DES EXEMPLES</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 relative z-10"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="absolute inset-0 bg-pink-50 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
                </a>
              </div>
            </div>
          </motion.div>

          <div className="relative flex justify-end items-center h-full">
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-100 to-pink-200 rounded-full blur-3xl opacity-20 scale-75 -translate-y-10"></div>
              <motion.div
                style={{
                  filter: `blur(${imageBlur}px)`,
                  x: imageX,
                  scale: imageScale,
                }}
                className="w-full h-full"
              >
                <motion.img
                  src={heroImage}
                  alt="Couple s'embrassant pour dire adieu"
                  className="w-full top-10 max-w-4xl ml-50 drop-shadow-xl rounded-lg object-cover h-[820px]"
                  style={{
                    opacity: imageOpacity,
                  }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent z-5"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1])
        }}
      ></motion.div>

      <motion.div 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center scroll-indicator"
        style={{ opacity: scrollIndicatorOpacity }}
      >
        <p className="text-xs uppercase tracking-widest mb-4 text-gray-500 opacity-70">
          Découvrir
        </p>
        <div className="w-0.5 h-16 bg-gradient-to-b from-pink-300 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/3 bg-indigo-400 animate-bounce-slow"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default TheEndHero;
