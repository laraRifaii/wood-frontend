'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/types';
import { getAuth, saveAuth, clearAuth, isTokenValid } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const { token: savedToken, user: savedUser } = getAuth();
    if (savedToken && savedUser && isTokenValid(savedToken)) {
      setToken(savedToken);
      setUser(savedUser);
    } else {
      clearAuth();
    }
  }, []);

  const login = (newToken: string, newUser: User) => {
    saveAuth(newToken, newUser);
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!token && !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
