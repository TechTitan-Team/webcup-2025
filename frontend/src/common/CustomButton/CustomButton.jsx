import React from "react";

const CustomButton = ({ title, icon, className }) => {
  return (
    <button
      className={`bg-[#000000] text-[#FDFCE8] font-semibold barlow-condensed-regular text-lg px-6 py-3 border-2 border-[#C7A07A] inline-flex items-center shadow-[6px_6px_0_#E2CEB1] cursor-pointer ${className}`}
    >
      <span className="mr-3">{title}</span>
      {icon}
    </button>
  );
};

export default CustomButton;
