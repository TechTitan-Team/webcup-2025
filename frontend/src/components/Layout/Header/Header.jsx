import { CgMenuGridO, CgProfile } from "react-icons/cg";
import React, { useState } from "react";
import styles from "./style.module.scss";
import { AnimatePresence } from "framer-motion";
import Nav from "./Nav/Nav";
import useToken from "../../../hooks/useToken";
import { imgUrl } from "../../../hooks/useHttps";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { token } = useToken();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
console.log(token);
  return (
    <header className="header w-full flex justify-between items-center px-6 py-4 bg-transparent">
      <div className="w-1/3 flex items-center gap-4">
         
        <p className="link font-medium text-gray-800">TheEnd.page</p>
      </div>
      <div className="w-1/3 flex items-center justify-end gap-4" > 
          <img 
            src={token.profile.trim() !== '' ? `${imgUrl}/${token.profile}` : 'https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2558760599.jpg'}
            alt="Profile"
            className="w-12 h-12 rounded-full object-cover cursor-pointer hover:opacity-80 transition-opacity"
          />
          <span className="text-gray-800 font-semibold">{token.name}</span>
          
        <div onClick={toggleMenu} className={styles.button}>
          <div
            className={`${styles.burger} ${
              isMenuOpen ? styles.burgerActive : ""
            }`}
          ></div>
        </div>
      </div>

      {/* Overlay qui apparaît quand le menu est ouvert */}
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
