import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../lib/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('giftwrappedToken') || '');
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('giftwrappedUser') || 'null');
    } catch (error) {
      return null;
    }
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem('giftwrappedToken', token);
    } else {
      localStorage.removeItem('giftwrappedToken');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('giftwrappedUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('giftwrappedUser');
    }
  }, [user]);

  async function refreshProfile() {
    if (!token) {
      return null;
    }

    const profile = await api.get('/api/auth/profile', token);
    setUser(profile);
    return profile;
  }

  function finishAuth(data) {
    setToken(data.token);
    setUser(data.user);
  }

  function logout() {
    setToken('');
    setUser(null);
  }

  const value = useMemo(
    () => ({ token, user, finishAuth, refreshProfile, logout }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
