'use client';

import { useSession, signIn as nextAuthSignIn, signOut as nextAuthSignOut } from 'next-auth/react';
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
  signIn: (userData?: User) => void;
  signOut: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount for demo users
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('nabiz_user');
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser({
            id: parsedUser.id || '1',
            name: parsedUser.name || 'Kullanıcı',
            email: parsedUser.email || '',
            image: parsedUser.avatar || parsedUser.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsedUser.name}`,
          });
        } catch (e) {
          console.error('Error parsing stored user:', e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (session?.user) {
      setUser({
        id: (session.user as any).id || '0',
        name: session.user.name || 'Kullanıcı',
        email: session.user.email || '',
        image: session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`,
      });
    }
    // Don't set user to null if no session - keep localStorage user
    setIsLoading(false);
  }, [session]);

  const handleSignIn = (userData?: User) => {
    if (userData) {
      // Direct login with user data (from modal)
      setUser(userData);
      if (typeof window !== 'undefined') {
        localStorage.setItem('nabiz_user', JSON.stringify(userData));
      }
    } else {
      // NextAuth login
      nextAuthSignIn();
    }
  };

  const handleSignOut = () => {
    setUser(null);
    nextAuthSignOut();
    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nabiz_user');
      localStorage.removeItem('nabiz_user_preferences');
      localStorage.removeItem('nabiz_liked_articles');
      localStorage.removeItem('nabiz_saved_articles');
      localStorage.removeItem('nabiz_following');
    }
  };

  const updateUser = (data: Partial<User>) => {
    setUser(prev => {
      const updated = prev ? { ...prev, ...data } : null;
      if (typeof window !== 'undefined' && updated) {
        localStorage.setItem('nabiz_user', JSON.stringify(updated));
      }
      return updated;
    });
  };

  const isAuthenticated = status === 'authenticated' || user !== null;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading: status === 'loading' || isLoading,
        isAuthenticated,
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
    return {
      user: null,
      isLoading: false,
      isAuthenticated: false,
      signIn: () => {},
      signOut: () => {},
      updateUser: () => {},
    };
  }
  return context;
}
