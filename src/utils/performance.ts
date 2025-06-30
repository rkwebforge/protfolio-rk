// Performance utilities for smooth animations
export const combineClasses = (...classes: (string | undefined)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Add performance classes to motion components
export const addPerformanceClasses = (
  baseClasses: string,
  type: 'card' | 'button' | 'safe' = 'safe'
): string => {
  const performanceClass = {
    card: 'motion-card gpu-accelerated',
    button: 'motion-button gpu-accelerated',
    safe: 'motion-safe gpu-accelerated',
  }[type];

  return combineClasses(baseClasses, performanceClass);
};

// Optimized viewport settings for better performance
export const optimizedViewport = {
  once: true,
  amount: 0.1,
};

// Fast transition defaults
export const fastTransition = {
  type: 'tween' as const,
  duration: 0.2,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};

// Instant transition for immediate feedback
export const instantTransition = {
  type: 'tween' as const,
  duration: 0.1,
  ease: [0.25, 0.46, 0.45, 0.94] as const,
};
