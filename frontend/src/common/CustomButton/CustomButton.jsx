import React from "react";

const CustomButton = ({ title, icon, className }) => {
  return (
    <button
      className={`bg-gray-800 text-white font-medium text-sm px-6 py-3 rounded-md inline-flex items-center hover:bg-gray-700 transition-colors duration-300 ${className}`}
    >
      <span className="mr-2">{title}</span>
      {icon}
    </button>
  );
};

export default CustomButton;
