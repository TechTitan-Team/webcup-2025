import React from "react";
import { motion } from "framer-motion";

const SearchBar = ({
  searchQuery,
  handleSearchChange,
  handleSearchFocus,
  handleSearchBlur,
  searchIsFocused,
  style,
}) => {
  return (
    <motion.div
      className="max-w-3xl mx-auto mb-6 px-4 sticky top-2 "
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.div
        className="relative p-[1px] rounded-2xl overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
        initial={{ boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
        whileHover={{ boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)" }}
        animate={{
          boxShadow: searchIsFocused
            ? "0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(147, 51, 234, 0.3)"
            : "0 0 0 rgba(0, 0, 0, 0)",
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="bg-white rounded-2xl overflow-hidden flex items-center p-3"
          animate={{
            height: searchIsFocused ? "70px" : "58px",
          }}
          transition={{ duration: 0.3 }}
        >
          <svg
            className="w-6 h-6 text-blue-500 ml-2 mr-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            placeholder="Search across millions of resources"
            className="w-full py-2 px-2 outline-none text-gray-700 bg-transparent"
          />
          <motion.button
            className="bg-gray-100 p-3 rounded-full ml-2 hover:bg-gray-200 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SearchBar;
