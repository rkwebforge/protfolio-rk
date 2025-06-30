import { motion } from 'framer-motion';
import React from 'react';
import { pageTransitions, pageVariants } from '../utils/animations';

interface AnimatedPageProps {
  children: React.ReactNode;
  className?: string;
}

const AnimatedPage: React.FC<AnimatedPageProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      initial='initial'
      animate='in'
      exit='out'
      variants={pageVariants}
      transition={pageTransitions}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;
