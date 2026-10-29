import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const sess = await authService.getSession();
        if (isMounted && sess) {
          setSession(sess);
          setUser(sess.user);
        }
      } catch (err) {
        console.warn('Auth initialization error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const sess = await authService.login(email, password);
      setSession(sess);
      setUser(sess.user);
      return sess;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await authService.logout(user);
    setSession(null);
    setUser(null);
  };

  const isSuperAdmin = user?.role === 'super_admin';
  const isEditor = user?.role === 'editor' || isSuperAdmin;

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        loading,
        login,
        logout,
        isSuperAdmin,
        isEditor,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

