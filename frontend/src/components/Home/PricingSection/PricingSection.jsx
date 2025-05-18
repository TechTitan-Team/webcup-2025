import React, { useState } from "react";

const PricingSection = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="tarifs" className="py-32 relative overflow-hidden">
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-200 w-[600px] h-[600px] top-[10%] left-[5%] animate-pulse-slow" style={{ opacity: 0.08 }}></div>
        <div className="animated-bg-shape bg-pink-300 w-[500px] h-[500px] bottom-[5%] right-[5%] animate-pulse-slow" style={{ animationDelay: "1.5s", opacity: 0.06 }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 reveal-section">
          <span className="inline-block text-indigo-600 text-sm uppercase tracking-widest mb-4">Options tarifaires</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            CHOISISSEZ VOTRE <span className="text-pink-500">PLAN</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            Des options adaptées à tous les types d'adieux, de la simple note au grand départ spectaculaire.
          </p>
          
          {/* Pricing toggle */}
          <div className="flex items-center justify-center mt-10">
            <span className="text-sm mr-3 opacity-80">Mensuel</span>
            <div className="relative">
              <input 
                type="checkbox" 
                id="pricing-toggle" 
                checked={isYearly}
                onChange={() => setIsYearly(!isYearly)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-pale-cream appearance-none cursor-pointer left-0 top-0 transform -translate-y-1/4"
              />
              <label htmlFor="pricing-toggle" className="toggle-label block overflow-hidden h-4 rounded-full bg-royal-purple/30 cursor-pointer w-12"></label>
            </div>
            <span className="text-sm ml-3 opacity-80">Annuel <span className="text-vivid-orange">-20%</span></span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 stagger-children">
          {/* Basic Plan */}
          <div className="pricing-card bg-gradient-to-br from-rich-black to-royal-purple/20 rounded-lg overflow-hidden border border-pale-cream/10">
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold mb-2">Basique</h3>
              <p className="text-sm opacity-70 mb-6">Pour un adieu simple mais efficace</p>
              
              <div className="flex items-end mb-8">
                {!isYearly && <span className="text-5xl font-display font-bold text-soft-gold">9€</span>}
                {isYearly && <span className="text-5xl font-display font-bold text-soft-gold">7€</span>}
                <span className="text-lg opacity-70 ml-1">/mois</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>1 page d'adieu personnalisée</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>3 styles émotionnels</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Texte + 2 images/GIFs</span>
                </li>
                <li className="flex items-start opacity-50">
                  <svg className="h-6 w-6 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Musique d'ambiance</span>
                </li>
                <li className="flex items-start opacity-50">
                  <svg className="h-6 w-6 mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  <span>Animations avancées</span>
                </li>
              </ul>
              
              <button className="magnetic-btn w-full py-3 border border-vivid-orange text-vivid-orange font-semibold rounded-sm hover:bg-vivid-orange/10 transition-colors">
                CHOISIR CE PLAN
              </button>
            </div>
          </div>
          
          {/* Premium Plan */}
          <div className="pricing-card relative bg-gradient-to-br from-royal-purple/30 to-rich-black rounded-lg overflow-hidden border border-vivid-orange/50 transform scale-105 z-10">
            <div className="absolute top-0 right-0 bg-vivid-orange text-pale-cream text-xs font-bold uppercase tracking-wider py-1 px-3">
              Populaire
            </div>
            
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold mb-2">Premium</h3>
              <p className="text-sm opacity-70 mb-6">Pour un adieu mémorable et percutant</p>
              
              <div className="flex items-end mb-8">
                {!isYearly && <span className="text-5xl font-display font-bold text-soft-gold">19€</span>}
                {isYearly && <span className="text-5xl font-display font-bold text-soft-gold">15€</span>}
                <span className="text-lg opacity-70 ml-1">/mois</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>3 pages d'adieu personnalisées</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Tous les styles émotionnels</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Texte + images/GIFs illimités</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Musique d'ambiance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Animations avancées</span>
                </li>
              </ul>
              
              <button className="magnetic-btn w-full py-3 bg-vivid-orange text-pale-cream font-semibold rounded-sm hover:bg-opacity-90 transition-colors">
                CHOISIR CE PLAN
              </button>
            </div>
          </div>
          
          {/* Ultimate Plan */}
          <div className="pricing-card bg-gradient-to-br from-rich-black to-royal-purple/20 rounded-lg overflow-hidden border border-pale-cream/10">
            <div className="p-8">
              <h3 className="text-2xl font-display font-bold mb-2">Ultimate</h3>
              <p className="text-sm opacity-70 mb-6">Pour un départ spectaculaire</p>
              
              <div className="flex items-end mb-8">
                {!isYearly && <span className="text-5xl font-display font-bold text-soft-gold">39€</span>}
                {isYearly && <span className="text-5xl font-display font-bold text-soft-gold">31€</span>}
                <span className="text-lg opacity-70 ml-1">/mois</span>
              </div>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Pages d'adieu illimitées</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Styles émotionnels personnalisés</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Contenu multimédia illimité</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Musique et effets sonores</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Animations exclusives</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-vivid-orange mt-0.5 mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>Support prioritaire</span>
                </li>
              </ul>
              
              <button className="magnetic-btn w-full py-3 border border-vivid-orange text-vivid-orange font-semibold rounded-sm hover:bg-vivid-orange/10 transition-colors">
                CHOISIR CE PLAN
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-sm opacity-70 max-w-2xl mx-auto">
            Tous les plans incluent une URL personnalisée, un support client, et la possibilité de modifier votre page pendant 30 jours après sa création. Besoin d'une solution sur mesure pour un grand départ ? <a href="#contact" className="text-vivid-orange hover:underline">Contactez-nous</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection; 