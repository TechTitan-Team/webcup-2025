import { CgMenuGridO } from "react-icons/cg";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav/Nav";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header w-full flex justify-between items-center px-12 py-5">
      <div className="w-1/3">
        <p className="link">The EndPage</p>
      </div>
      <div className="w-1/3 text-center">
        {/* <p className="link">
            Fullstack developer
        </p> */}
      </div>
      <div className="w-1/3 flex justify-end">
        <div onClick={toggleMenu} className={styles.button}>
          <div
            className={`${styles.burger} ${
              isMenuOpen ? styles.burgerActive : ""
            }`}
          ></div>
        </div>
      </div>

      {/* Overlay that appears when menu is open */}
      {isMenuOpen && (
        <div
          className={`blur-overlay ${isMenuOpen ? "visible" : ""}`}
          onClick={toggleMenu}
        ></div>
      )}

      <AnimatePresence mode="wait">{isMenuOpen && <Nav />}</AnimatePresence>
    </header>
  );
};

export default Header;
