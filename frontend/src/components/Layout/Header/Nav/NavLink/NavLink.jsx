import styles from './style.module.scss';
import { motion } from 'framer-motion';
import { slide, scale } from '../Anim/anim';
import { Link } from "react-router-dom";

export default function NavLink({data, isActive, setSelectedIndicator}) {
  
    const { title, href, index} = data;
  
    return (
      <motion.div 
        className={styles.link} 
        onMouseEnter={() => {setSelectedIndicator(href)}} 
        custom={index} 
        variants={slide} 
        initial="initial" 
        animate="enter" 
        exit="exit"
      >
        <motion.div 
          variants={scale} 
          animate={isActive ? "open" : "closed"} 
          className={styles.indicator}>
        </motion.div>
        <Link to={href}>{title}</Link>
      </motion.div>
    )
}