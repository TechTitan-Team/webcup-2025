import React from "react";

const BackgroundEffects = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-purple-100 to-transparent rounded-full filter blur-3xl opacity-30 -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-t from-blue-100 to-transparent rounded-full filter blur-3xl opacity-30 translate-y-1/2 -translate-x-1/3"></div>
      <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gradient-to-r from-amber-100 to-transparent rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
};

export default BackgroundEffects;
