/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import type { ReactNode } from 'react';
import { api, setUnauthorizedHandler } from '@/shared/api/api';
import type { UserResponse } from '@/shared/types/userResponse.type';

interface AuthContextValue {
  user: UserResponse | null;
  isAuthenticated: boolean;
  isChecking: boolean;
  login: (user: UserResponse) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    setUnauthorizedHandler(() => setUser(null));
    return () => setUnauthorizedHandler(undefined);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const userData = await api.get<UserResponse>('v1/user/me');
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setIsChecking(false);
      }
    };
    checkAuth();
  }, []);

  const login = useCallback((userData: UserResponse) => {
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post('v1/auth/logout');
    } finally {
      setUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, isChecking, login, logout }}
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
