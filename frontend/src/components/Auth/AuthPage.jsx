import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';
import logo from "../../assets/images/TechTitan.png";
import loginImage from "../../assets/images/peaky.jpg";
import signupImage from "../../assets/images/peaky-2.jpg";
import leftBgImage from "../../assets/images/left-bg.jpg";
import rightBgImage from "../../assets/images/right-bg.jpg";

function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [windowHeight, setWindowHeight] = useState('100vh');

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setWindowHeight(`${window.innerHeight}px`);
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Slowed down page transition
  const pageTransition = {
    type: "spring",
    stiffness: 30,
    damping: 15,
    mass: 1.2,
    duration: 0.8
  };

  // Image specific transition
  const imageTransition = {
    type: "spring",
    stiffness: 25,
    damping: 14,
    mass: 1.5,
    duration: 1.0
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div 
      className="flex flex-col md:flex-row overflow-hidden"
      style={{ height: windowHeight }}
    >
      <motion.div 
        className="flex flex-col md:flex-row w-full h-full"
        layout
        transition={pageTransition}
      >
        {/* Left Section - becomes top section on mobile */}
        <motion.div 
          className={`w-full md:w-1/2 flex-shrink-0 flex flex-col items-center justify-between p-4 md:p-8 text-white relative ${
            !isLogin && !isMobile ? 'order-2' : 'order-1'
          } ${isMobile ? 'h-1/3' : 'h-full'}`}
          layout
          transition={pageTransition}
          style={{
            backgroundImage: `url(${leftBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#391E10] opacity-70"></div>
          
          {/* Content */}
          <motion.div 
            className="z-10 w-full flex justify-center mb-2 md:mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <img src={logo} alt="Tech Titan Logo" className="w-16 h-16 md:w-20 md:h-20" />
          </motion.div>
          
          <motion.div 
            className="z-10 text-center mb-2 md:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <motion.h1 
              className="text-xl md:text-3xl font-bold mb-1"
              layout
              transition={pageTransition}
            >
              {isLogin ? "Bonjour ! Bienvenue sur la plateforme" : "Bon retour parmi nous !"}
            </motion.h1>
            <motion.h2 
              className="text-lg md:text-2xl font-bold mb-4"
              layout
              transition={pageTransition}
            >
              {isLogin ? "de trading ArBitrage" : "Veuillez vous connecter pour continuer"}
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-4"
              layout
              transition={pageTransition}
            >
              {isLogin ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
            </motion.p>
            
            {/* Toggle Button */}
            <motion.button 
              onClick={toggleAuthMode}
              className="bg-[#00C4A7] hover:bg-teal-600 text-white font-bold py-2 px-8 rounded-lg shadow-lg"
              whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </motion.button>
          </motion.div>
          
          {/* Illustration with image switching based on isLogin state */}
          <div className="z-10 w-full hidden sm:flex justify-center mb-4">
            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.img 
                  key="login-image"
                  src={loginImage} 
                  alt="Illustration de la plateforme de trading" 
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-xl"
                  style={{ maxHeight: isMobile ? '120px' : '200px' }}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={imageTransition}
                />
              ) : (
                <motion.img 
                  key="signup-image"
                  src={signupImage} 
                  alt="Illustration d'inscription" 
                  className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-lg shadow-xl"
                  style={{ maxHeight: isMobile ? '120px' : '200px' }}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={imageTransition}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div 
          className={`w-full md:w-1/2 flex-shrink-0 flex flex-col items-center justify-center p-4 md:p-8 relative ${
            !isLogin && !isMobile ? 'order-1' : 'order-2'
          } ${isMobile ? 'h-2/3' : 'h-full'} overflow-y-auto hide-scrollbar`}
          layout
          transition={pageTransition}
          style={{
            backgroundImage: `url(${rightBgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-[#616e83] opacity-20"></div>
          
          {/* Logo in top right - only visible on larger screens */}
          <motion.div 
            className="absolute top-4 right-4 z-10 hidden md:block"
            layout
            transition={imageTransition}
          >
            <motion.img 
              src={logo} 
              alt="Tech Titan Logo" 
              className="h-8"
              layout
              transition={imageTransition}
            />
          </motion.div>
          
          <AnimatePresence mode="wait">
            {isLogin ? (
              <LoginForm key="login" />
            ) : (
              <SignupForm key="signup" />
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default AuthPage;