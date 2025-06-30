import { useEffect, useState } from 'react';

/**
 * Custom hook that tracks page readiness based on window.onload and optional async operations.
 *
 * @param asyncOperations - Array of promises that need to resolve before the page is considered ready
 * @returns Object containing isReady boolean and error state
 *
 * @example
 * ```tsx
 * const { isReady, error } = usePageReady([
 *   fetch('/api/user').then(res => res.json()),
 *   new Promise(resolve => setTimeout(resolve, 1000)) // Minimum load time
 * ]);
 * ```
 */
export function usePageReady(asyncOperations: Promise<unknown>[] = []) {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const checkReadiness = async () => {
      try {
        // Wait for window.onload
        const windowLoadPromise = new Promise<void>(resolve => {
          if (document.readyState === 'complete') {
            resolve();
          } else {
            window.addEventListener('load', () => resolve(), { once: true });
          }
        });

        // Wait for all operations to complete
        await Promise.all([windowLoadPromise, ...asyncOperations]);

        // Only update state if component is still mounted
        if (isMounted) {
          setIsReady(true);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error('Unknown error occurred')
          );
          // Still set ready to true to prevent infinite loading
          setIsReady(true);
        }
      }
    };

    checkReadiness();

    return () => {
      isMounted = false;
    };
  }, [asyncOperations]);

  return { isReady, error };
}
