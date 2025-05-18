import React, { useState } from "react";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { menuSlide } from "./Anim/anim";
import NavLink from "./NavLink/NavLink";
import Curve from "../Curve/Curve";
import { useLocation, useNavigate } from "react-router-dom";
import useToken from "../../../../hooks/useToken";

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
    title: "Créer un template personnalisé",
    href: "/create-page",
  },
  {
    title: "Générer un template",
    href: "/app/create-ai",
  },
  {
    title: "Maze Game",
    href: "/maze-game",
  },

];

export default function Nav() {
  const location = useLocation();
  const pathname = location.pathname;
  const { clearToken } = useToken();
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);
const nav = useNavigate();
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
          <a onClick={() => {
            removeToken();
            nav("/signIn");
          }} className={styles.link}>Déconnexion</a>
        </div>
        <div className={styles.footer}>
          <a href="/bridge-game" target="_blank">Bridge Game</a>
          <a href="/maze-game" target="_blank">Maze Game</a>
        </div>
      </div>
      <Curve />
    </motion.div>
  );
}
