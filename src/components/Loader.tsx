import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

/**
 * Terminal-style brand mark: name with a blinking accent caret, role below.
 */
const LoaderLogo: React.FC = () => (
  <div className="flex flex-col items-start">
    <span className="flex items-center font-display text-xl font-semibold text-white sm:text-2xl">
      RK Prasad
      <span className="caret" aria-hidden="true" />
    </span>
    <span className="mt-2 text-sm text-muted">Full Stack Developer</span>
  </div>
);

/**
 * Props for the Loader component
 */
interface LoaderProps {
  /** Whether the loader is visible and should be rendered */
  isVisible: boolean;
  /** Callback fired when the fade-out animation completes */
  onAnimationComplete?: () => void;
}

/**
 * Full-screen preloader component that blocks the app until assets are ready.
 *
 * Features:
 * - Minimal terminal-style brand mark with a blinking caret
 * - Short fade-out transition
 * - Accessibility support
 *
 * @param isVisible - Controls visibility and fade-out animation
 * @param onAnimationComplete - Called when fade-out completes for cleanup
 *
 * @example
 * ```tsx
 * const { isReady } = usePageReady();
 *
 * return (
 *   <>
 *     <Loader
 *       isVisible={!isReady}
 *       onAnimationComplete={() => setShowLoader(false)}
 *     />
 *     {isReady && <App />}
 *   </>
 * );
 * ```
 */
export const Loader: React.FC<LoaderProps> = ({
  isVisible,
  onAnimationComplete,
}) => {
  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState("Initializing...");

  // Progress animation and message updates
  useEffect(() => {
    if (!isVisible) return;

    const messages = [
      "Initializing...",
      "Loading React & TypeScript...",
      "Initializing JavaScript expertise...",
      "Preparing HTML/CSS & Tailwind...",
      "Ready to showcase skills...",
    ];

    let progressInterval: number;

    const startProgress = () => {
      let currentProgress = 0;
      let messageIndex = 0;

      progressInterval = setInterval(() => {
        currentProgress += 1;
        setProgress(currentProgress);

        // Update message every 20% progress
        const newMessageIndex = Math.floor(currentProgress / 20);
        if (newMessageIndex !== messageIndex && messages[newMessageIndex]) {
          messageIndex = newMessageIndex;
          setLoadingMessage(messages[newMessageIndex]);
        }

        if (currentProgress >= 100) {
          clearInterval(progressInterval);
        }
      }, 100); // 100ms * 100 = 10 seconds
    };

    // Start progress after a brief delay
    const timeoutId = setTimeout(startProgress, 200);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
    };
  }, [isVisible]);

  return (
    <motion.div
      className="fixed inset-0 z-9999 flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      onAnimationComplete={() => {
        if (!isVisible) {
          onAnimationComplete?.();
        }
      }}
      style={{ pointerEvents: isVisible ? "auto" : "none" }}
      role="status"
      aria-label="Loading page content"
      aria-live="polite"
    >
      <div className="flex w-full max-w-xs flex-col items-start space-y-6 px-4">
        <LoaderLogo />

        <div className="w-full space-y-2">
          <p className="text-sm text-muted">{loadingMessage}</p>
          <div className="h-px w-full bg-rule">
            <div
              className="h-px bg-accent"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;
