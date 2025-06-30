import React from 'react';
import App from '../App';
import Loader from '../components/Loader';
import { usePageReady } from '../hooks';

/**
 * Example: Simple usage without AppWrapper
 *
 * This demonstrates how to use the Loader and usePageReady hook directly
 * if you need more control over the loading process.
 */
export const SimpleLoaderExample: React.FC = () => {
  const { isReady, error } = usePageReady([
    // Wait for fonts to load
    document.fonts.ready,
    // Simulate API calls
    fetch('/api/config')
      .then(res => res.json())
      .catch(() => ({})),
    // Minimum load time for better UX
    new Promise(resolve => setTimeout(resolve, 800)),
  ]);

  // Prevent scrolling while loading
  React.useEffect(() => {
    if (!isReady) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isReady]);

  if (error) {
    console.warn('Loading error:', error);
  }

  return (
    <>
      {!isReady && <Loader isVisible={true} />}
      <div
        aria-hidden={!isReady}
        style={{ display: isReady ? 'block' : 'none' }}
      >
        <App />
      </div>
    </>
  );
};

/**
 * Example: Advanced usage with custom loading states
 *
 * This shows how you might handle different loading phases
 * with custom messages or progress indicators.
 */
export const AdvancedLoaderExample: React.FC = () => {
  const [loadingPhase, setLoadingPhase] =
    React.useState<string>('Initializing...');

  const asyncOps = React.useMemo(
    () => [
      // Phase 1: Load user preferences
      new Promise(resolve => {
        setLoadingPhase('Loading preferences...');
        setTimeout(() => resolve({}), 300);
      }),
      // Phase 2: Load critical data
      new Promise(resolve => {
        setLoadingPhase('Fetching data...');
        setTimeout(() => resolve({}), 500);
      }),
      // Phase 3: Final setup
      new Promise(resolve => {
        setLoadingPhase('Almost ready...');
        setTimeout(() => resolve({}), 200);
      }),
    ],
    []
  );

  const { isReady } = usePageReady(asyncOps);

  return (
    <>
      <Loader isVisible={!isReady} />
      {!isReady && (
        <div className='fixed bottom-8 left-1/2 z-[10000] -translate-x-1/2'>
          <p className='text-center text-sm text-gray-400'>{loadingPhase}</p>
        </div>
      )}
      <div aria-hidden={!isReady}>
        <App />
      </div>
    </>
  );
};

export default SimpleLoaderExample;
