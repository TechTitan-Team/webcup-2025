import React from "react";

const StylesSection = () => {
  return (
    <section id="styles" className="py-32 relative overflow-hidden">
      <div className="animated-bg">
        <div className="animated-bg-shape bg-indigo-200 w-[600px] h-[600px] top-[20%] -right-[300px] animate-pulse-slow opacity-20 rounded-full"></div>
        <div className="animated-bg-shape bg-indigo-100 w-[400px] h-[400px] bottom-[10%] left-[5%] animate-pulse-slow opacity-20 rounded-full" style={{ animationDelay: "1.5s" }}></div>
      </div>
      
      <div className="container max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-20 reveal-section">
          <span className="inline-block text-indigo-500 text-xs uppercase tracking-widest mb-4">Choisir votre ton</span>
          <h2 className="section-title text-2xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-gray-800">
            QUEL EST VOTRE <span className="text-indigo-500">TON</span> ?
          </h2>
          <p className="max-w-2xl mx-auto text-base text-gray-600">
            Choisissez un style qui reflète votre personnalité et le message que vous souhaitez transmettre.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 stagger-children">
          {/* Style 1 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">SINCÈRE</h3>
              <p className="text-sm text-gray-600 mb-6">Un adieu honnête et émotionnel qui exprime votre gratitude et vos véritables sentiments.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 2 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">CRÉATIF</h3>
              <p className="text-sm text-gray-600 mb-6">Une expression artistique de votre départ avec des éléments visuels et narratifs uniques.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 3 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.243 3.03a1 1 0 01.727 1.213L9.53 6h2.94l.56-2.243a1 1 0 111.94.486L14.53 6H17a1 1 0 110 2h-2.97l-1 4H15a1 1 0 110 2h-2.47l-.56 2.242a1 1 0 11-1.94-.485L10.47 14H7.53l-.56 2.242a1 1 0 11-1.94-.485L5.47 14H3a1 1 0 110-2h2.97l1-4H5a1 1 0 110-2h2.47l.56-2.243a1 1 0 011.213-.727zM9.03 8l-1 4h2.938l1-4H9.031z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">IRONIQUE</h3>
              <p className="text-sm text-gray-600 mb-6">Un au revoir sarcastique qui utilise l'humour et l'ironie pour masquer (ou pas) vos vrais sentiments.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 4 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">DRAMATIQUE</h3>
              <p className="text-sm text-gray-600 mb-6">Une sortie théâtrale et mémorable qui ne passera certainement pas inaperçue.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 5 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">INSPIRANT</h3>
              <p className="text-sm text-gray-600 mb-6">Un message positif qui inspire les autres et laisse un héritage motivant derrière vous.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 6 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">MYSTÉRIEUX</h3>
              <p className="text-sm text-gray-600 mb-6">Un adieu énigmatique qui laisse votre audience avec plus de questions que de réponses.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 7 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">ÉMOTIONEL</h3>
              <p className="text-sm text-gray-600 mb-6">Un adieu expressif qui communique la profondeur de vos sentiments avec authenticité.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Style 8 */}
          <div className="card-3d relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 border border-indigo-100">
            <div className="card-3d-content p-8 text-center">
              <div className="icon-wrapper bg-gradient-to-br from-indigo-50 to-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                </svg>
              </div>
              <h3 className="text-lg md:text-xl font-display font-bold mb-4 text-gray-800">MINIMALISTE</h3>
              <p className="text-sm text-gray-600 mb-6">Un adieu simple et direct qui va droit à l'essentiel sans artifice inutile.</p>
              <a href="/list-template" className="group inline-flex items-center gap-1 text-indigo-500 font-medium text-sm">
                <span>Explorer</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="text-center mt-16">
          <a href="#fonctionnement" className="magnetic-btn group relative overflow-hidden bg-white border border-indigo-200 text-indigo-500 px-8 py-3 font-semibold text-lg inline-flex items-center gap-3 rounded-md shadow-md hover:shadow-lg transition-shadow duration-300">
            <span className="relative z-10 group-hover:text-white transition-colors duration-500">VOIR LE FONCTIONNEMENT</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 relative z-10 transition-transform group-hover:translate-x-1 group-hover:text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-indigo-500 transform scale-x-0 origin-left transition-transform group-hover:scale-x-100 duration-500"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default StylesSection; 