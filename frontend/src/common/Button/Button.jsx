import React from "react";
import { motion } from "framer-motion";

export const Button = ({
  children,
  className = "",
  icon,
  iconPosition = "left",
  ...props
}) => {
  return (
    <motion.button
      className={`bg-white rounded-lg px-4 py-2 shadow-sm flex items-center border border-gray-100 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {iconPosition === "left" && icon && <span className="mr-2">{icon}</span>}
      {children}
      {iconPosition === "right" && icon && <span className="ml-2">{icon}</span>}
    </motion.button>
  );
};

export default Button;
