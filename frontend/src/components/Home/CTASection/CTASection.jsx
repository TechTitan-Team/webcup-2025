import React from "react";

const CTASection = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-gradient-to-br from-pink-50 to-indigo-50">
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-200 w-[800px] h-[800px] top-[20%] -left-[400px] animate-pulse-slow opacity-30 rounded-full"></div>
        <div className="animated-bg-shape bg-pink-200 w-[600px] h-[600px] bottom-[10%] right-[5%] animate-pulse-slow opacity-30 rounded-full" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-3xl mx-auto text-center reveal-section">
          <div className="h-1 w-full bg-gradient-to-r from-indigo-200 via-pink-200 to-indigo-200 mb-12 rounded-full"></div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-800">
            PRÊT À FAIRE VOTRE <span className="text-pink-400">SORTIE ?</span>
          </h2>
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            Parce que si c'est la fin — autant la rendre inoubliable. Et partageable.
          </p>
          <a href="#" className="magnetic-btn group relative overflow-hidden bg-gradient-to-r from-indigo-400 to-indigo-500 text-white px-8 py-4 font-semibold text-sm inline-flex items-center gap-3 rounded-md shadow-lg shadow-indigo-200/50 hover:shadow-xl hover:shadow-indigo-200/60 transition-all duration-300">
            <span className="relative z-10">CRÉER VOTRE ADIEU</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
          </a>
          <div className="h-1 w-full bg-gradient-to-r from-indigo-200 via-pink-200 to-indigo-200 mt-12 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default CTASection; 