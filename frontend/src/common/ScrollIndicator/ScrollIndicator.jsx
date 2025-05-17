import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollIndicator = ({ showScrollIndicator }) => {
  return (
    <AnimatePresence>
      {showScrollIndicator && (
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 bottom-5"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            repeat: 3,
            repeatType: "reverse",
            duration: 1.5,
          }}
        >
          <svg
            className="w-6 h-6 text-gray-400 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollIndicator;
