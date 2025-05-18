import React from "react";

const HowItWorks = () => {
  return (
    <section id="fonctionnement" className="py-32 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-blue-50">
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-200 w-[500px] h-[500px] top-[50%] -left-[250px] animate-pulse-slow opacity-30 rounded-full"></div>
        <div className="animated-bg-shape bg-pink-200 w-[700px] h-[700px] -bottom-[350px] right-[10%] animate-pulse-slow opacity-30 rounded-full" style={{ animationDelay: "2s" }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 reveal-section">
          <span className="inline-block text-indigo-500 text-xs uppercase tracking-widest mb-4">Processus simple</span>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-800">
            COMMENT ÇA <span className="text-indigo-500">MARCHE</span>
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-600">
            Trois étapes simples pour créer votre message d'adieu parfait.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12 stagger-children">
          {/* Step 1 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-pink-100 rounded-lg transform scale-y-0 origin-bottom transition-transform group-hover:scale-y-100 duration-500"></div>
            <div className="relative p-8 border border-indigo-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-5xl font-display font-bold text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">01</div>
              <h3 className="text-xl font-display font-bold mb-4 text-gray-800">CHOISISSEZ VOTRE STYLE</h3>
              <p className="text-sm text-gray-600">Sélectionnez le ton émotionnel qui correspond le mieux à votre adieu. Chaque style possède sa propre identité visuelle, ses animations et ses fonctionnalités.</p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-pink-100 rounded-lg transform scale-y-0 origin-bottom transition-transform group-hover:scale-y-100 duration-500"></div>
            <div className="relative p-8 border border-indigo-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-5xl font-display font-bold text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">02</div>
              <h3 className="text-xl font-display font-bold mb-4 text-gray-800">CRÉEZ VOTRE MESSAGE</h3>
              <p className="text-sm text-gray-600">Racontez votre histoire, ajoutez des médias et personnalisez chaque aspect de votre page d'adieu. Rendez-la aussi simple ou élaborée que vous le souhaitez.</p>
            </div>
          </div>
          
          {/* Step 3 */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-pink-100 rounded-lg transform scale-y-0 origin-bottom transition-transform group-hover:scale-y-100 duration-500"></div>
            <div className="relative p-8 border border-indigo-100 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="text-5xl font-display font-bold text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">03</div>
              <h3 className="text-xl font-display font-bold mb-4 text-gray-800">PARTAGEZ & CLAQUEZ LA PORTE</h3>
              <p className="text-sm text-gray-600">Obtenez une URL unique à partager avec le monde. Votre page d'adieu reste en ligne pour toujours, un monument numérique à votre départ.</p>
            </div>
          </div>
        </div>
        
        {/* Interactive demo button */}
        <div className="text-center mt-20">
          <button className="magnetic-btn group relative overflow-hidden bg-white border border-indigo-200 text-indigo-500 px-7 py-3 font-semibold text-sm inline-flex items-center gap-3 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">VOIR UNE DÉMO INTERACTIVE</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 