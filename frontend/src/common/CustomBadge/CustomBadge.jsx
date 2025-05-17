import React from "react";

const CustomBadge = ({ title, className, theme = 'light' }) => {
  const bg = theme == "light" ? "#D8D6BC" : "#21231A";
  const text = theme == "light" ? "#21231A" : "#D8D6BC";

  return (
    <button
      className={`barlow-condensed-regular font-semibold text-sm py-2 px-6 rounded-full uppercase tracking-wide ${className}`}
      style={{ background: bg, color: text }}
    >
      {title}
    </button>
  );
};

export default CustomBadge;
