import { motion, useReducedMotion } from "framer-motion";
import React from "react";
import { FLICKER, FLICKER_TIMES } from "./useNeonFrame";

// Shared "neon sign switching on" flicker, matching the hero portrait.
// Plays once, the first time the element scrolls into view.
const VIEWPORT = { once: true, amount: 0.6 } as const;

/** Wrap heading text so it flickers on in the accent red, then cools to white. */
export const NeonText: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const reduceMotion = useReducedMotion();
  if (reduceMotion) return <>{children}</>;

  return (
    <motion.span
      initial={{ opacity: 0 }}
      whileInView={{
        opacity: FLICKER,
        color: ["#ff4d5e", "#ff4d5e", "#ffffff"],
        textShadow: [
          "0 0 18px rgba(255,77,94,0.9)",
          "0 0 18px rgba(255,77,94,0.9)",
          "0 0 0px rgba(255,77,94,0)",
        ],
      }}
      viewport={VIEWPORT}
      transition={{
        opacity: { duration: 0.6, times: FLICKER_TIMES },
        color: { duration: 1.2, times: [0, 0.5, 1] },
        textShadow: { duration: 1.4, times: [0, 0.4, 1] },
      }}
    >
      {children}
    </motion.span>
  );
};
