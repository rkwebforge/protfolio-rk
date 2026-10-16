import { useReducedMotion, type MotionProps } from "framer-motion";

// Neon-sign flicker shared with NeonText: on, off, on, dim, on.
export const FLICKER = [0, 0.8, 0.15, 1, 0.4, 1];
export const FLICKER_TIMES = [0, 0.15, 0.3, 0.45, 0.6, 1];

/** Motion props for a framed block (image, card) that flickers on with a glow. */
export const useNeonFrame = (): MotionProps => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return {};

  return {
    initial: { opacity: 0, boxShadow: "0 0 0px rgba(255,77,94,0)" },
    whileInView: {
      opacity: FLICKER,
      boxShadow: [
        "0 0 0px rgba(255,77,94,0)",
        "0 0 60px rgba(255,77,94,0.45)",
        "0 0 0px rgba(255,77,94,0)",
      ],
    },
    viewport: { once: true, amount: 0.4 },
    transition: {
      opacity: { duration: 0.6, times: FLICKER_TIMES },
      boxShadow: { duration: 1.6, times: [0, 0.35, 1] },
    },
  };
};
