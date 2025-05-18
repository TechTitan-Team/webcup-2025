import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoginForm from './LoginForm';
import SignupForm from './SignUpForm';

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

  // Transition plus douce
  const pageTransition = {
    type: "spring",
    stiffness: 25,
    damping: 15,
    mass: 1,
    duration: 0.6
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
        {/* Section gauche - devient section supérieure sur mobile */}
        <motion.div 
          className={`w-full md:w-1/2 flex-shrink-0 flex flex-col items-center justify-between p-4 md:p-8 text-white relative ${
            !isLogin && !isMobile ? 'order-2' : 'order-1'
          } ${isMobile ? 'h-1/3' : 'h-full'}`}
          layout
          transition={pageTransition}
          style={{
            backgroundColor: '#f5f5f5',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Overlay */}
          <div className="absolute inset-0 bg-gray-800 opacity-90"></div>
          
          {/* Contenu */}
          <motion.div 
            className="z-10 w-full flex justify-center mb-2 md:mb-4 mt-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="text-xl font-medium">TheEnd.page</h2>
          </motion.div>
          
          <motion.div 
            className="z-10 text-center mb-2 md:mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.h1 
              className="text-xl md:text-2xl font-normal mb-2"
              layout
              transition={pageTransition}
            >
              {isLogin ? "Bienvenue sur TheEnd.page" : "Créez votre compte"}
            </motion.h1>
            <motion.h2 
              className="text-base md:text-lg font-light mb-4"
              layout
              transition={pageTransition}
            >
              {isLogin ? "La plateforme pour créer votre page d'adieu" : "Et commencez à créer votre page d'adieu"}
            </motion.h2>
            
            <motion.p 
              className="text-gray-300 mb-4 text-sm"
              layout
              transition={pageTransition}
            >
              {isLogin ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
            </motion.p>
            
            {/* Bouton de bascule */}
            <motion.button 
              onClick={toggleAuthMode}
              className="bg-gray-700 hover:bg-gray-600 text-white font-normal py-2 px-6 rounded-md text-sm"
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.97 }}
            >
              {isLogin ? "S'inscrire" : "Se connecter"}
            </motion.button>
          </motion.div>
          
          <div className="z-10 w-full flex justify-center mb-6">
            <p className="text-xs text-gray-400">Parce que si c'est la fin, autant qu'elle soit inoubliable.</p>
          </div>
        </motion.div>

        {/* Section droite - Formulaire */}
        <motion.div 
          className={`w-full md:w-1/2 flex-shrink-0 flex flex-col items-center justify-center p-4 md:p-8 relative ${
            !isLogin && !isMobile ? 'order-1' : 'order-2'
          } ${isMobile ? 'h-2/3' : 'h-full'} overflow-y-auto hide-scrollbar`}
          layout
          transition={pageTransition}
          style={{
            backgroundColor: '#ffffff',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Logo en haut à droite - visible uniquement sur les grands écrans */}
          <motion.div 
            className="absolute top-4 right-4 z-10 hidden md:block"
            layout
            transition={pageTransition}
          >
            <motion.p 
              className="text-sm text-gray-500"
              layout
              transition={pageTransition}
            >
              TheEnd.page
            </motion.p>
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