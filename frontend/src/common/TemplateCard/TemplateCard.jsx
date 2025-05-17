import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const TemplateCard = ({ template }) => {
  return (
    
    <Link to={`/app/template/${template.id}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative cursor-pointer"
      >
        <div className="relative p-[1px] rounded-lg overflow-hidden bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 shadow-lg">
          <div className="bg-white rounded-lg overflow-hidden">
            <div className="relative overflow-hidden rounded-t-lg aspect-video group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img
                src={template.image}
                alt={`Exemple d'adieu ${template.category.toLowerCase()}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  className="w-5 h-5 text-gray-700"
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
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-lg font-bold mb-1 text-gray-800 group-hover:text-blue-600 transition-colors">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {template.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-7 h-7 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                    {template.author.charAt(0)}
                  </div>
                  <span className="ml-2 text-sm text-gray-700">
                    by {template.author}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center text-gray-500 text-xs">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {template.likes}
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {template.views}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default TemplateCard;
