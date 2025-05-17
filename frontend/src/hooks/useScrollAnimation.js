import { useScroll, useTransform, useSpring } from "framer-motion";

export const useScrollAnimation = () => {
  const { scrollY } = useScroll();

  const titleScale = useTransform(scrollY, [0, 200], [1, 0.8]);
  const titleOpacity = useTransform(scrollY, [0, 100], [1, 0.8]);
  const titleY = useTransform(scrollY, [0, 200], [0, -20]);

  const searchBarY = useTransform(scrollY, [180, 200], [0, 1]);
  const searchBarPosition = useSpring(searchBarY, {
    stiffness: 300,
    damping: 30,
  });

  return {
    titleScale,
    titleOpacity,
    titleY,
    searchBarPosition,
  };
};
