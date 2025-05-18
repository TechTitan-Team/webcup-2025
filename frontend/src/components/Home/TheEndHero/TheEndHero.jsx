import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import heroImage from "../../../assets/images/pexels-by.png";

const TheEndHero = () => {
  const { scrollYProgress } = useScroll();

  const opacityValue = useTransform(scrollYProgress, [0, 0.3], [1, 0.7]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const imageScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.1],
    [1, 0]
  );

  return (
    <section
      id="accueil"
      className="min-h-screen relative flex flex-col pt-30 items-center  overflow-hidden the-end-hero"
    >
      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center  text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center"
          >
            <h2 className="text-[4rem] md:text-[5rem] lg:text-[8rem] font-bold leading-none tracking-tight mb-4">
              <span className="text-black">Votre </span>
              <span className="text-outline-dark"> dernier</span>
            </h2>
            <h2 className="text-[4rem] md:text-[5rem] lg:text-[9rem] font-bold leading-none tracking-tight relative">
              <span className="text-outline-dark">& </span>
              <span className="text-black"> mes</span>
              <span className="text-outline-dark">sage</span>
            </h2>
          </motion.div>
        </div>

        <div className="max-w-5xl mx-auto my-20 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ opacity: imageOpacity, scale: imageScale }}
            className="absolute left-1/2 -translate-x-1/2 -top-10 -translate-y-[30%] z-20 w-full"
          >
            <img
              src={heroImage}
              alt="Professional portrait"
              className="w-full max-w-lg h-auto mx-auto"
            />
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .text-outline-dark {
          -webkit-text-stroke: 1px indigo;
          color: transparent;
        }
      `}</style>
    </section>
  );
};

export default TheEndHero;
