import React from "react";
import { motion } from "framer-motion";
import { categories } from "../../constants/templateData";

const CategoryFilter = ({ activeCategory, setActiveCategory }) => {
  return (
    <motion.div
      className="flex justify-center space-x-2 mb-6 px-4 overflow-x-auto py-2 scrollbar-hide"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {categories.map((category) => (
        <motion.button
          key={category.id}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${
            activeCategory === category.id
              ? "bg-purple-100 text-purple-800"
              : "text-gray-600 hover:text-gray-800"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setActiveCategory(category.id)}
        >
          <span>{category.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;
