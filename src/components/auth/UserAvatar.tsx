'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Settings } from 'lucide-react';
import Link from 'next/link';

interface UserAvatarProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showMenu?: boolean;
}

export default function UserAvatar({ size = 'md', showMenu = true }: UserAvatarProps) {
  const { user, isAuthenticated, signIn, signOut } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSignIn = () => {
    // Navigate to signin page
    window.location.href = '/tr/signin';
  };

  if (!isAuthenticated || !user) {
    return (
      <button
        onClick={handleSignIn}
        className={`flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium hover:from-orange-600 hover:to-orange-700 transition-all`}
      >
        <span className="hidden sm:inline">Giriş Yap</span>
      </button>
    );
  }

  // Size classes
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className={`${sizeClasses[size]} rounded-full overflow-hidden ring-2 ring-offset-2 ring-transparent hover:ring-blue-500 transition-all`}
      >
        <img
          src={user.image}
          alt={user.name}
          className="w-full h-full object-cover"
        />
      </button>

      {showDropdown && showMenu && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShowDropdown(false)}
          />
          <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-[#1E293B] rounded-xl shadow-xl z-20 overflow-hidden animate-slide-down">
            {/* User Info */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-900 dark:text-white truncate">{user.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/profile"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=profile" alt="" className="w-5 h-5" />
                <span>Profilim</span>
              </Link>
              
              <Link
                href="/profile/saved"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=bookmark" alt="" className="w-5 h-5" />
                <span>Kaydettiklerim</span>
              </Link>
              
              <Link
                href="/profile/likes"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=heart" alt="" className="w-5 h-5" />
                <span>Beğenilerim</span>
              </Link>
              
              <Link
                href="/settings"
                className="flex items-center gap-3 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => setShowDropdown(false)}
              >
                <Settings className="w-5 h-5" />
                <span>Ayarlar</span>
              </Link>
            </div>

            {/* Logout */}
            <div className="border-t border-gray-200 dark:border-gray-700 py-2">
              <button
                onClick={() => {
                  signOut();
                  setShowDropdown(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
              >
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=logout" alt="" className="w-5 h-5" />
                <span>Çıkış Yap</span>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
