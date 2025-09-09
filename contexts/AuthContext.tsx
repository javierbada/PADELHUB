'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }): JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect((): void => {
    // Verificar si estamos en el cliente
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }
    
    // Simular verificación de sesión persistente
    const savedUser: string | null = localStorage.getItem('padelhub_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    
    // Mock de autenticación - en producción esto sería una llamada real a la API
    if (email === 'demo@padelhub.com' && password === 'demo123') {
      const userData: User = {
        id: '1',
        email,
        name: 'Usuario Demo',
        avatar: undefined
      };
      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('padelhub_user', JSON.stringify(userData));
      }
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular llamada a API
    await new Promise<void>(resolve => setTimeout(resolve, 1000));
    
    // Mock de registro - en producción esto sería una llamada real a la API
    const userData: User = {
      id: Date.now().toString(),
      email,
      name,
      avatar: undefined
    };
    
    setUser(userData);
    if (typeof window !== 'undefined') {
      localStorage.setItem('padelhub_user', JSON.stringify(userData));
    }
    setIsLoading(false);
    return true;
  };

  const logout = (): void => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('padelhub_user');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}