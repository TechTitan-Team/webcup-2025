import { useState, useEffect } from "react";

export const useScrollIndicator = (timeout = 5000) => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout]);

  return { showScrollIndicator };
};
