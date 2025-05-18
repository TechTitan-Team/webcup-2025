import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { menuSlide } from "./Anim/anim";
import NavLink from "./NavLink/NavLink";
import Curve from "../Curve/Curve";
import { useLocation } from "react-router-dom";

const navItems = [
  {
    title: "Accueil",
    href: "/",
  },
  {
    title: "Liste des templates",
    href: "/list-template",
  },
  {
    title: "Liste des clash",
    href: "/clash",
  },
  {
    title: "Créer",
    href: "/create-page",
  },
  {
    title: "Se connecter",
    href: "/signIn",
  },
];

export default function Nav() {
  const location = useLocation();
  const pathname = location.pathname;
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <NavLink
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></NavLink>
            );
          })}
        </div>
        <div className={styles.footer}>
          <a>Instagram</a>
          <a>Twitter</a>
          <a>LinkedIn</a>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}
