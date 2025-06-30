import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { usePageReady } from '../hooks';
import Loader from './Loader';

/**
 * Props for the AppWrapper component
 */
interface AppWrapperProps {
  /** The main app component to render after loading */
  children: React.ReactNode;
  /** Optional array of async operations to wait for before showing the app */
  asyncOperations?: Promise<unknown>[];
  /** Optional minimum loading time in milliseconds */
  minimumLoadTime?: number;
}

/**
 * Wrapper component that handles the preloader logic and app initialization.
 *
 * This component:
 * - Shows a full-screen loader while assets load
 * - Blocks scrolling and hides the main app during loading
 * - Handles smooth transitions between loader and app
 * - Provides accessibility features
 *
 * @param children - The main app component to render
 * @param asyncOperations - Optional promises to wait for
 * @param minimumLoadTime - Optional minimum time to show loader (default: 800ms)
 *
 * @example
 * ```tsx
 * <AppWrapper
 *   asyncOperations={[
 *     fetch('/api/config').then(res => res.json()),
 *     import('./heavy-component')
 *   ]}
 *   minimumLoadTime={1000}
 * >
 *   <App />
 * </AppWrapper>
 * ```
 */
export const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  asyncOperations = [],
  minimumLoadTime = 800,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  // Add minimum load time to async operations for better UX
  const allOperations = [
    ...asyncOperations,
    new Promise(resolve => setTimeout(resolve, minimumLoadTime)),
  ];

  const { isReady, error } = usePageReady(allOperations);

  // When page is ready, start the fade out process
  useEffect(() => {
    if (isReady) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        setIsLoading(false);
      }, 100);
    }
  }, [isReady]);

  // Prevent scrolling while loader is visible
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.right = '0';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
    };
  }, [isLoading]);

  // Log errors in development
  useEffect(() => {
    if (error && import.meta.env.DEV) {
      console.warn('AppWrapper: Error during loading:', error);
    }
  }, [error]);

  const handleLoaderComplete = () => {
    // Loader complete callback - could be used for additional cleanup
  };

  return (
    <>
      <AnimatePresence mode='wait'>
        {isLoading && (
          <Loader
            key='loader'
            isVisible={isLoading}
            onAnimationComplete={handleLoaderComplete}
          />
        )}
      </AnimatePresence>

      {/* Main app - hidden while loading for accessibility */}
      <div
        aria-hidden={isLoading}
        style={{
          visibility: isLoading ? 'hidden' : 'visible',
          position: isLoading ? 'fixed' : 'relative',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default AppWrapper;
