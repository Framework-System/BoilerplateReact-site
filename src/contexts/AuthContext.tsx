import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin, useDecodeToken } from '@/hooks/user/useUsers';
import type { User } from '@/models/User';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  checkTokenExpiration: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const loginMutation = useLogin();
  const decodeTokenMutation = useDecodeToken();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const { token } = await loginMutation.mutateAsync({ email, senha: password });
      localStorage.setItem('token', token);

      const { payload } = await decodeTokenMutation.mutateAsync({ token });
      const user: User = {
        id: payload.id,
        name: payload.name?.trim() || payload.email.split('@')[0],
        email: payload.email,
        role: payload.permissions,
        company: payload.company,
      };

      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    } catch (error) {
      throw new Error('Falha no login');
    }
  }, [loginMutation, decodeTokenMutation]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }, []);

  const checkTokenExpiration = useCallback(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const expirationDate = new Date(JSON.parse(atob(token.split('.')[1])).exp * 1000);
      if (expirationDate < new Date()) {
        logout();
        navigate('/login');
      }
    } else {
      logout();
      navigate('/login');
    }
  }, [logout, navigate]);

  useEffect(() => {
    checkTokenExpiration();
  }, [checkTokenExpiration]);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, checkTokenExpiration }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
