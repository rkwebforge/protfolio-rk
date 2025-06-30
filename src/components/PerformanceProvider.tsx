import { MotionConfig } from 'framer-motion';
import React from 'react';

interface PerformanceProviderProps {
  children: React.ReactNode;
}

// Performance optimization wrapper for all animations
const PerformanceProvider: React.FC<PerformanceProviderProps> = ({
  children,
}) => {
  return (
    <MotionConfig
      // Reduce layout shifts and improve performance
      reducedMotion='user'
      // Use hardware acceleration with optimized transitions
      transition={{
        type: 'tween',
        ease: [0.25, 0.46, 0.45, 0.94],
        duration: 0.25,
      }}
    >
      {children}
    </MotionConfig>
  );
};

export default PerformanceProvider;
