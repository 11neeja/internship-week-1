import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token
    const token = localStorage.getItem('ecovision_token');
    const userData = localStorage.getItem('ecovision_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('ecovision_token');
        localStorage.removeItem('ecovision_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Mock authentication - accept any email/password combination
      if (email && password) {
        const mockUser = {
          id: Date.now().toString(),
          email,
          name: email.split('@')[0]
        };
        setUser(mockUser);
        localStorage.setItem('ecovision_token', 'mock_token_' + Date.now());
        localStorage.setItem('ecovision_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Mock signup - accept any valid inputs
      if (name && email && password) {
        const mockUser = {
          id: Date.now().toString(),
          email,
          name
        };
        setUser(mockUser);
        localStorage.setItem('ecovision_token', 'mock_token_' + Date.now());
        localStorage.setItem('ecovision_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecovision_token');
    localStorage.removeItem('ecovision_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}