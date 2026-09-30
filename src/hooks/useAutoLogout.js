import { useEffect, useRef, useCallback } from 'react';
import { useAuth } from '../security/auth';
import { SESSION_TIMEOUT } from '../security/constants';

export const useAutoLogout = () => {
  const { isAuthenticated, logout } = useAuth();
  const timeoutRef = useRef(null);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (isAuthenticated) {
      timeoutRef.current = setTimeout(() => {
        logout();
      }, SESSION_TIMEOUT);
    }
  }, [isAuthenticated, logout]);

  useEffect(() => {
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    
    const handleActivity = () => {
      resetTimeout();
    };

    if (isAuthenticated) {
      resetTimeout();
      events.forEach(event => {
        window.addEventListener(event, handleActivity);
      });
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [isAuthenticated, resetTimeout]);
};

export default useAutoLogout;
