'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useState, useEffect, createContext, useContext, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  signIn: () => void;
  signOut: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as any).id || '0',
        name: session.user.name || 'Kullanıcı',
        email: session.user.email || '',
        image: session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      });
    } else {
      setUser(null);
    }
    setIsLoading(false);
  }, [session]);

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    // Clear local storage
    localStorage.removeItem('nabiz_user_preferences');
    localStorage.removeItem('nabiz_liked_articles');
    localStorage.removeItem('nabiz_saved_articles');
    localStorage.removeItem('nabiz_following');
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...data } : null);
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('nabiz_user_data', JSON.stringify(user));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status === 'loading' || isLoading,
        isAuthenticated: status === 'authenticated',
        signIn: handleSignIn,
        signOut: handleSignOut,
        updateUser,
      }}
    >
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
