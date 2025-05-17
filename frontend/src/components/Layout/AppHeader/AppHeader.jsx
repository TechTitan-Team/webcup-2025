import React from "react";
import { motion } from "framer-motion";
import Button from "../../../common/Button/Button";

const AppHeader = () => {
  return (
    <motion.div
      className="flex justify-end p-4 gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Button
        icon={<span className="text-amber-500">⭐</span>}
        iconPosition="left"
      >
        <span className="text-sm font-medium text-gray-800">
          Essayer Pro pendant 30 jours
        </span>
      </Button>
      <Button
        className="p-2 flex items-center justify-center"
        whileHover={{ scale: 1.05, rotate: 90 }}
      >
        <svg
          className="w-6 h-6 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </Button>
      <Button className="p-2 flex items-center justify-center">
        <svg
          className="w-6 h-6 text-purple-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </Button>
    </motion.div>
  );
};

export default AppHeader;
