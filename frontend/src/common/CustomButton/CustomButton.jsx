import React from "react";

const CustomButton = ({ title, icon, className }) => {
  return (
    <button
      className={`bg-[#8C2EFF] text-[#FDFCE8] font-semibold barlow-condensed-regular text-lg px-8 py-4 rounded-full border-2 border-[#FFDD00] inline-flex items-center shadow-[6px_6px_0_#FFDD00] cursor-pointer ${className}`}
    >
      <span className="mr-3">{title}</span>
      {icon}
    </button>
  );
};

export default CustomButton;
