import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION } from './constants';

const AuthContext = createContext(null);

const MOCK_USER = {
  id: 1,
  name: 'Hugo Acosta',
  email: 'hugo@phound.io',
  role: 'admin',
  avatar: null
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutUntil, setLockoutUntil] = useState(null);

  // In-memory auth state, never using localStorage for security as requested
  const isAuthenticated = !!user;

  const login = useCallback(async (email, password) => {
    // Check if locked out
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const remainingTime = Math.ceil((lockoutUntil - Date.now()) / 1000 / 60);
      throw new Error(`Account locked. Try again in ${remainingTime} minutes.`);
    }

    if (lockoutUntil && Date.now() >= lockoutUntil) {
      setLockoutUntil(null);
      setLoginAttempts(0);
    }

    // Mock validation
    if (email === MOCK_USER.email && password === 'Password123!') { // Mock valid password
      setUser(MOCK_USER);
      setLoginAttempts(0);
      return MOCK_USER;
    } else {
      const attempts = loginAttempts + 1;
      setLoginAttempts(attempts);
      
      if (attempts >= MAX_LOGIN_ATTEMPTS) {
        setLockoutUntil(Date.now() + LOCKOUT_DURATION);
        throw new Error('Too many failed attempts. Account temporarily locked.');
      }
      
      throw new Error('Invalid email or password');
    }
  }, [loginAttempts, lockoutUntil]);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(async (name, email, password) => {
    // Mock registration - would typically call API here
    return { success: true, message: 'Registration successful. Please login.' };
  }, []);

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
    register,
    loginAttempts,
    isLockedOut: !!(lockoutUntil && Date.now() < lockoutUntil)
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
