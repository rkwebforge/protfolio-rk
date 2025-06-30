import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

/**
 * Logo component reused from Navbar for consistency
 */
const LoaderLogo: React.FC = () => (
  <div className='flex items-center space-x-3'>
    <div className='relative'>
      <motion.div
        className='flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-blue-500/25 sm:h-16 sm:w-16'
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          rotate: {
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <span className='text-xl font-bold text-white sm:text-2xl'>RK</span>
      </motion.div>
      <motion.div
        className='absolute -inset-1 -z-10 rounded-xl bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 blur-md'
        animate={{
          opacity: [0.5, 1, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
    <div className='flex flex-col'>
      <span className='bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-xl font-bold text-transparent sm:text-2xl'>
        RK Prasad
      </span>
      <span className='text-sm font-medium tracking-wide text-gray-400 opacity-80'>
        Frontend Developer
      </span>
    </div>
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
 * - Dark-mode aware background
 * - Centered brand logo with animations
 * - Smooth fade-out transition
 * - Accessibility support
 * - CSS keyframe animations for performance
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
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');

  // Progress animation and message updates
  useEffect(() => {
    if (!isVisible) return;

    const messages = [
      'Initializing...',
      'Loading React & TypeScript...',
      'Initializing JavaScript expertise...',
      'Preparing HTML/CSS & Tailwind...',
      'Ready to showcase skills...',
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
    <>
      {/* CSS Keyframes for performance-optimized animations */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            transform: scale(0.8);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: scale(0.8);
            opacity: 1;
          }
        }
        
        @keyframes rotate-ring {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes fade-dots {
          0%, 20% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          80%, 100% {
            opacity: 0;
          }
        }
        
        .pulse-ring {
          animation: pulse-ring 3s ease-in-out infinite;
        }
        
        .rotate-ring {
          animation: rotate-ring 2s linear infinite;
        }
        
        .fade-dot-1 {
          animation: fade-dots 1.5s ease-in-out infinite;
        }
        
        .fade-dot-2 {
          animation: fade-dots 1.5s ease-in-out infinite 0.2s;
        }
        
        .fade-dot-3 {
          animation: fade-dots 1.5s ease-in-out infinite 0.4s;
        }
      `}</style>

      <motion.div
        className='fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900 dark:bg-slate-950'
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          if (!isVisible) {
            onAnimationComplete?.();
          }
        }}
        style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
        role='status'
        aria-label='Loading page content'
        aria-live='polite'
      >
        {/* Main content container */}
        <div className='flex w-full flex-col items-center space-y-8'>
          {/* Logo */}
          <LoaderLogo />

          {/* Animated accent elements */}
          <div className='relative flex items-center justify-center'>
            {/* Rotating ring */}
            <div className='rotate-ring absolute h-16 w-16 rounded-full border-2 border-transparent border-r-purple-500 border-t-blue-500'></div>

            {/* Pulsing ring */}
            <div className='pulse-ring h-12 w-12 rounded-full border border-blue-400/30'></div>

            {/* Fading dots */}
            <div className='absolute flex space-x-1'>
              <div className='fade-dot-1 h-1 w-1 rounded-full bg-blue-400'></div>
              <div className='fade-dot-2 h-1 w-1 rounded-full bg-purple-400'></div>
              <div className='fade-dot-3 h-1 w-1 rounded-full bg-pink-400'></div>
            </div>
          </div>

          {/* Loading text */}
          <motion.p
            className='text-sm font-medium text-gray-400'
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {loadingMessage}
          </motion.p>

          {/* Progress bar */}
          <div className='w-full max-w-xs rounded-full bg-gray-700'>
            <div
              className='h-2 rounded-full bg-gradient-to-r from-blue-600 to-pink-600'
              style={{ width: `${progress}%` }}
              role='progressbar'
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Background gradient overlay for depth */}
        <div className='pointer-events-none absolute inset-0 bg-gradient-to-br from-blue-900/5 via-purple-900/5 to-pink-900/5'></div>
      </motion.div>
    </>
  );
};

export default Loader;
