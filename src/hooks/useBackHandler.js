import { useEffect } from 'react';

/**
 * Hook to handle hardware back button (Android) or Browser Back.
 * 
 * @param {Function} handler - The function to execute when back is pressed.
 * @param {Array} deps - Dependencies to re-bind the listener.
 */
export const useBackHandler = (handler, deps = []) => {
  useEffect(() => {
    const handlePopState = (event) => {
      // Prevent default browser behavior if handler returns true
      event.preventDefault(); 
      handler();
    };

    // Push a state so we can pop it
    window.history.pushState(null, '', window.location.pathname);
    
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, deps);
};
