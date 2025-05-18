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
    title: "Hall of Fame",
    href: "/hall-of-fame",
  },
  {
    title: "Projects",
    href: "/projects",
  },
  {
    title: "Awards",
    href: "/awards",
  },
  {
    title: "Contact",
    href: "/contact",
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
          <a>Awwwards</a>
          <a>Instagram</a>
          <a>Dribble</a>
          <a>LinkedIn</a>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}
