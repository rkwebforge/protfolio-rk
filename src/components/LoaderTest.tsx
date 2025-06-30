import React, { useEffect, useState } from 'react';

/**
 * Simple test component to debug the loader issue
 */
export const LoaderTest: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Starting 2 second timer...');
    const timer = setTimeout(() => {
      console.log('Timer finished, setting loading to false');
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  console.log('LoaderTest render:', { isLoading });

  return (
    <div>
      {isLoading ? (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: '#1e293b',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div>
            <h1>Loading...</h1>
            <p>This should disappear in 2 seconds</p>
          </div>
        </div>
      ) : (
        <div style={{ padding: '20px' }}>
          <h1>App Loaded!</h1>
          <p>The loader should be gone and this should be visible.</p>
        </div>
      )}
    </div>
  );
};

export default LoaderTest;
