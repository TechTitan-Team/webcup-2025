import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("accueil");
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      // Set scrolled state for sticky behavior
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Detect active section for navigation
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        if(window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute('id'));
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav
        className={`navbar fixed w-full z-50 px-6 md:px-12 py-4 transition-all duration-300 ${
          isScrolled ? "scrolled shadow-lg backdrop-blur-sm" : ""
        }`}
      >
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="#"
            className="text-2xl font-display font-bold tracking-wider"
          >
            The<span className="text-indigo-500">End</span>
            <span className="text-indigo-400">.page</span>
          </a>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#accueil"
              className={`nav-highlight text-xs uppercase tracking-wider ${activeSection === 'accueil' ? 'active text-indigo-600' : 'text-gray-700'}`}
            >
              Accueil
            </a>
            <a
              href="#styles"
              className={`nav-highlight text-xs uppercase tracking-wider ${activeSection === 'styles' ? 'active text-indigo-600' : 'text-gray-700'}`}
            >
              Styles
            </a>
            <a
              href="#fonctionnement"
              className={`nav-highlight text-xs uppercase tracking-wider ${activeSection === 'fonctionnement' ? 'active text-indigo-600' : 'text-gray-700'}`}
            >
              Fonctionnement
            </a>
            <a
              href="#tarifs"
              className={`nav-highlight text-xs uppercase tracking-wider ${activeSection === 'tarifs' ? 'active text-indigo-600' : 'text-gray-700'}`}
            >
              Tarifs
            </a>
            <a
              href="#exemples"
              className={`nav-highlight text-xs uppercase tracking-wider ${activeSection === 'exemples' ? 'active text-indigo-600' : 'text-gray-700'}`}
            >
              Exemples
            </a>
            <a
              href="#contact"
              className={`nav-highlight text-xs uppercase tracking-wider ${activeSection === 'contact' ? 'active text-indigo-600' : 'text-gray-700'}`}
            >
              Contact
            </a>
            <button
              onClick={() => navigate("/signIn")}
              className="magnetic-btn bg-gradient-to-r from-indigo-400 to-indigo-500 text-white px-4 py-2 rounded-md text-xs uppercase tracking-wider font-medium hover:shadow-md hover:shadow-indigo-200 transition-all duration-300"
            >
              Commencer
            </button>
          </div>

          <button
            id="menu-toggle"
            className="md:hidden relative z-50 w-8 h-6 flex flex-col justify-between"
            onClick={toggleMenu}
          >
            <span
              className={`w-full h-0.5 bg-gray-700 transition-all ${
                isMenuOpen ? "rotate-45 translate-y-2.5" : ""
              }`}
            ></span>
            <span
              className={`w-3/4 h-0.5 bg-gray-700 transition-all self-end ${
                isMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-full h-0.5 bg-gray-700 transition-all ${
                isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <div
        id="mobile-menu"
        className={`fixed top-0 right-0 w-0 h-screen bg-white text-gray-800 z-40 overflow-hidden transition-all duration-500 ${
          isMenuOpen ? "w-full" : ""
        }`}
      >
        <div className="flex flex-col h-full justify-between p-12 pt-32">
          <div>
            <h3 className="text-lg font-semibold mb-8 border-b border-indigo-200 pb-2 text-indigo-600">
              NAVIGATION
            </h3>
            <ul
              className={`space-y-6 stagger-children ${
                isMenuOpen ? "active" : ""
              }`}
            >
              <li className="flex items-center gap-3">
                <span className="w-2 h-2 bg-indigo-400 rounded-full"></span>
                <a
                  href="#accueil"
                  className="text-lg font-medium mobile-nav-link"
                  onClick={closeMenu}
                >
                  ACCUEIL
                </a>
              </li>
              <li>
                <a
                  href="#styles"
                  className="text-lg font-medium pl-5 mobile-nav-link"
                  onClick={closeMenu}
                >
                  STYLES
                </a>
              </li>
              <li>
                <a
                  href="#fonctionnement"
                  className="text-lg font-medium pl-5 mobile-nav-link"
                  onClick={closeMenu}
                >
                  FONCTIONNEMENT
                </a>
              </li>
              <li>
                <a
                  href="#tarifs"
                  className="text-lg font-medium pl-5 mobile-nav-link"
                  onClick={closeMenu}
                >
                  TARIFS
                </a>
              </li>
              <li>
                <a
                  href="#exemples"
                  className="text-lg font-medium pl-5 mobile-nav-link"
                  onClick={closeMenu}
                >
                  EXEMPLES
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-lg font-medium pl-5 mobile-nav-link"
                  onClick={closeMenu}
                >
                  CONTACT
                </a>
              </li>

              <li className="mt-2">
                <button
                  onClick={() => navigate("/signIn")}
                  className="magnetic-btn bg-gradient-to-r from-indigo-400 to-indigo-500 text-white px-5 py-2 rounded-md text-sm uppercase tracking-wider font-medium w-full shadow-md"
                >
                  Commencer
                </button>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex gap-6 mb-8">
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-500 transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-500 transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-indigo-500 transition-colors"
              >
                TikTok
              </a>
            </div>
            <p className="text-xs text-gray-500">
              © 2025 TheEnd.page. Tous droits réservés.
            </p>
          </div>
        </div>
        <button
          id="close-menu"
          className="absolute top-6 right-6 text-3xl text-gray-700"
          onClick={closeMenu}
        >
          &times;
        </button>
      </div>

      {/* Cursor effects */}
      <div className="custom-cursor"></div>
      <div id="cursor-trail-container"></div>

      {/* Scroll progress indicator */}
      <div className="scroll-progress"></div>
    </>
  );
};

export default Navigation;
