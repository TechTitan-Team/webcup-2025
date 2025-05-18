import React from "react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 relative overflow-hidden">
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-300 w-[700px] h-[700px] -top-[350px] right-[10%] animate-pulse-slow" style={{ opacity: 0.08 }}></div>
        <div className="animated-bg-shape bg-pink-200 w-[500px] h-[500px] bottom-[5%] left-[10%] animate-pulse-slow" style={{ animationDelay: "1.5s", opacity: 0.06 }}></div>
      </div>
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 reveal-section">
          <span className="inline-block text-indigo-600 text-sm uppercase tracking-widest mb-4">Nous contacter</span>
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            UNE QUESTION ? UN <span className="text-pink-500">PROJET</span> ?
          </h2>
          <p className="max-w-2xl mx-auto text-lg opacity-80">
            Besoin d'aide pour créer l'adieu parfait ? Notre équipe est là pour vous accompagner.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-16 items-center stagger-children">
          <div>
            <h3 className="text-2xl font-display font-bold mb-6">Envoyez-nous un message</h3>
            
            <form className="space-y-8">
              <div className="input-focus-effect">
                <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">Nom</label>
                <input type="text" className="w-full bg-transparent border-none focus:outline-none py-2" placeholder="Votre nom" />
              </div>
              
              <div className="input-focus-effect">
                <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">Email</label>
                <input type="email" className="w-full bg-transparent border-none focus:outline-none py-2" placeholder="votre@email.com" />
              </div>
              
              <div className="input-focus-effect">
                <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">Sujet</label>
                <select className="w-full bg-rich-black border-none focus:outline-none py-2">
                  <option>Choisissez un sujet</option>
                  <option>Question sur les tarifs</option>
                  <option>Support technique</option>
                  <option>Projet personnalisé</option>
                  <option>Autre</option>
                </select>
              </div>
              
              <div className="input-focus-effect">
                <label className="block text-sm uppercase tracking-wider opacity-70 mb-2">Message</label>
                <textarea className="w-full bg-transparent border-none focus:outline-none py-2 h-32 resize-none" placeholder="Votre message"></textarea>
              </div>
              
              <button type="submit" className="magnetic-btn group relative overflow-hidden bg-vivid-orange text-pale-cream px-8 py-3 font-semibold text-lg inline-flex items-center gap-3">
                <span className="relative z-10">ENVOYER LE MESSAGE</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
                <span className="absolute inset-0 bg-soft-gold transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
              </button>
            </form>
          </div>
          
          <div className="relative">
            <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-vivid-orange opacity-70"></div>
            <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-vivid-orange opacity-70"></div>
            
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold mb-4">Nos coordonnées</h3>
                <p className="opacity-80">Notre équipe est disponible du lundi au vendredi, de 9h à 18h.</p>
              </div>
              
              <div>
                <h4 className="text-vivid-orange text-lg font-semibold mb-2">Email</h4>
                <a href="mailto:contact@theend.page" className="block hover:text-vivid-orange transition-colors">contact@theend.page</a>
              </div>
              
              <div>
                <h4 className="text-vivid-orange text-lg font-semibold mb-2">Téléphone</h4>
                <a href="tel:+33123456789" className="block hover:text-vivid-orange transition-colors">+33 1 23 45 67 89</a>
              </div>
              
              <div>
                <h4 className="text-vivid-orange text-lg font-semibold mb-2">Suivez-nous</h4>
                <div className="flex gap-6">
                  <a href="#" className="hover:text-vivid-orange transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-vivid-orange transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-vivid-orange transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
                    </svg>
                  </a>
                  <a href="#" className="hover:text-vivid-orange transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                    </svg>
                  </a>
                </div>
              </div>
              
              <div className="p-6 bg-royal-purple/20 rounded-lg border border-royal-purple/30">
                <h4 className="text-xl font-display font-bold mb-4">Besoin d'un adieu sur mesure ?</h4>
                <p className="opacity-80 mb-4">Pour les projets spéciaux, les entreprises ou les événements, notre équipe peut créer une expérience d'adieu entièrement personnalisée.</p>
                <a href="#" className="text-vivid-orange hover:underline inline-flex items-center gap-2">
                  <span>Demander un devis</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 