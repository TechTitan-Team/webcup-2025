import React from 'react';
import { motion } from 'framer-motion';
import backgroundImage from "../../../assets/images/pexels-by.png"; 

const AboutSection = () => {
  const features = [
    {
      id: "01",
      title: "Smart Automation",
      description: "Reduce manual work and boost productivity.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h4V7h2v4h4v2h-4v4h-2v-4H7v-2z" />
        </svg>
      )
    },
    {
      id: "02",
      title: "Scalable Growth",
      description: "AI solutions that grow with your business.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
        </svg>
      )
    },
    {
      id: "03",
      title: "Data-Driven Decisions",
      description: "Make smarter choices with AI-powered insights.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14z" />
          <path d="M7 12h2v5H7zm4-7h2v12h-2zm4 4h2v8h-2z" />
        </svg>
      )
    },
    {
      id: "04",
      title: "Cost Efficiency",
      description: "Optimize resources and reduce expenses.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z" />
        </svg>
      )
    },
    {
      id: "05",
      title: "Seamless Integration",
      description: "Easily connect AI with your existing systems.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M3 21h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18v-2H3v2zm0-4h18V7H3v2zm0-6v2h18V3H3z" />
        </svg>
      )
    },
    {
      id: "06",
      title: "Future-Proof",
      description: "Stay ahead with cutting-edge AI technology.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
        </svg>
      )
    }
  ];

  // Animation variants
  const headingVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: "easeOut" 
      } 
    }
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        delay: 0.2,
        ease: "easeOut" 
      } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const decorationVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 0.8,
      scale: 1,
      transition: { 
        duration: 0.8,
        delay: 0.6,
        ease: "easeOut" 
      }
    }
  };

  return (
    <section id="about-section" className="text-white py-20 px-4 relative">
      {/* Optional background styling */}
      <div className="absolute inset-0 bg-black/90 z-[-1]"></div>
      
      <div className="max-w-7xl mx-auto">
        {/* Heading with animation */}
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="text-5xl font-bold mb-4"
            variants={headingVariants}
          >
            Why AI-Powered <span className="text-red-500">Solutions?</span>
          </motion.h2>
          
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
            variants={textVariants}
          >
            Unlock efficiency, scalability, and innovation with custom AI
            applications tailored to your business needs
          </motion.p>
        </motion.div>

        {/* Feature Grid with staggered animations */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {features.map((feature, index) => (
            <motion.div 
              key={feature.id}
              className="bg-gray-900/60 rounded-lg p-6 border border-gray-800 backdrop-blur-sm 
                         hover:bg-gray-800/80 transition-all duration-300"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
              }}
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="text-gray-500 font-mono"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 * index, duration: 0.4 }}
                >
                  [{feature.id}]
                </motion.div>
                <motion.div 
                  className="w-10 h-10 text-red-500"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ 
                    delay: 0.2 * index + 0.2, 
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  {feature.icon}
                </motion.div>
              </div>
              
              <motion.h3 
                className="text-xl font-bold mt-4 mb-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 * index + 0.3, duration: 0.4 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-400"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 * index + 0.4, duration: 0.5 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* 3D Elements with animation */}
        <div className="relative">
          <motion.div 
            className="absolute bottom-0 right-0 -mb-16 -mr-10 opacity-80 hidden lg:block"
            variants={decorationVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="w-64 h-64 relative">
              <motion.div 
                className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg transform rotate-12 blur-sm"
                animate={{ 
                  rotate: [12, 15, 12],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <motion.div 
                className="absolute bottom-10 right-10 w-16 h-16 bg-gradient-to-tr from-purple-500 to-red-500 rounded-full transform -rotate-12 blur-sm"
                animate={{ 
                  rotate: [-12, -8, -12],
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
              <motion.div 
                className="absolute top-10 left-10 w-24 h-24 border-2 border-gray-700 rounded-lg transform rotate-45"
                animate={{ 
                  rotate: [45, 50, 45],
                  x: [0, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              ></motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;