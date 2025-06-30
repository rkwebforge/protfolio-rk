import { Variants } from 'framer-motion';

// Optimized animation variants for buttery smooth performance
export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 250,
      damping: 20,
      mass: 0.9,
    },
  },
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.9,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Optimized stagger container for faster sequential animations
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0,
    },
  },
};

// Ultra-fast stagger for immediate responsiveness
export const fastStaggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.01,
      delayChildren: 0,
    },
  },
};

export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const slideInFromBottom: Variants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

export const slideInFromTop: Variants = {
  initial: {
    opacity: 0,
    y: -50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 25,
      mass: 1,
      duration: 0.6,
    },
  },
};

export const bounceIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.3,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

export const rotateIn: Variants = {
  initial: {
    opacity: 0,
    rotate: -180,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
};

// Optimized hover effects for instant responsiveness
export const cardHover: Variants = {
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.15,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

export const buttonHover: Variants = {
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.05,
    },
  },
};

export const navItemAnimation: Variants = {
  initial: {
    opacity: 0,
    y: -20,
    scale: 0.95,
  },
  animate: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 350,
      damping: 25,
      mass: 0.6,
      delay: i * 0.06,
    },
  }),
};

export const typewriter: Variants = {
  initial: {
    width: 0,
  },
  animate: {
    width: '100%',
    transition: {
      duration: 2,
      ease: 'easeInOut',
    },
  },
};

// Optimized floating animation for better performance
export const floatingElement: Variants = {
  initial: {
    y: 0,
    opacity: 0.6,
  },
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Floating element with delay
export const floatingElementDelayed = (delay: number): Variants => ({
  initial: {
    y: 0,
    opacity: 0.6,
  },
  animate: {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    opacity: [0.4, 0.8, 0.4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
      delay,
    },
  },
});

export const pulseScale: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const glowEffect: Variants = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(59, 130, 246, 0.5)',
      '0 0 30px rgba(147, 51, 234, 0.7)',
      '0 0 20px rgba(59, 130, 246, 0.5)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Optimized page transitions
export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    x: -50,
    scale: 0.95,
  },
  in: {
    opacity: 1,
    x: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    x: 50,
    scale: 1.05,
  },
};

export const pageTransitions = {
  type: 'tween' as const,
  ease: 'anticipate' as const,
  duration: 0.25,
};

// Ultra-responsive button interactions
export const enhancedButtonHover: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0px 0px 0px rgba(0,0,0,0)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0px 8px 25px rgba(124, 58, 237, 0.25)',
    transition: {
      duration: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
  tap: {
    scale: 0.97,
    transition: {
      duration: 0.05,
    },
  },
};

// Optimized card animations
export const enhancedCardHover: Variants = {
  rest: {
    scale: 1,
    y: 0,
    boxShadow: '0px 2px 8px rgba(0,0,0,0.1)',
    transition: {
      duration: 0.1,
    },
  },
  hover: {
    scale: 1.02,
    y: -3,
    boxShadow: '0px 12px 35px rgba(124, 58, 237, 0.15)',
    transition: {
      duration: 0.1,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

// Text reveal animation
export const textReveal: Variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  }),
};

// Loading spinner animation
export const spinnerAnimation: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Notification slide in
export const notificationSlide: Variants = {
  initial: {
    x: 300,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.6, -0.05, 0.01, 0.99],
    },
  },
  exit: {
    x: 300,
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};
