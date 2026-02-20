'use client';

import { useState, useEffect } from 'react';
import { UserPlus, UserCheck, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface FollowButtonProps {
  userId: string;
  userName: string;
  variant?: 'primary' | 'compact' | 'icon';
  size?: 'sm' | 'md' | 'lg';
}

export default function FollowButton({
  userId,
  userName,
  variant = 'primary',
  size = 'md',
}: FollowButtonProps) {
  const { isAuthenticated, signIn } = useAuth();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Load follow state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const following = localStorage.getItem(`nabiz_following_${userId}`);
      if (following) {
        setIsFollowing(true);
      }
    }
  }, [userId]);

  const handleFollow = async () => {
    if (!isAuthenticated) {
      signIn();
      return;
    }

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500));

    const newFollowing = !isFollowing;
    setIsFollowing(newFollowing);

    if (typeof window !== 'undefined') {
      if (newFollowing) {
        localStorage.setItem(`nabiz_following_${userId}`, 'true');
        
        // Update following count in localStorage
        const followingList = JSON.parse(localStorage.getItem('nabiz_following_list') || '[]');
        followingList.push(userId);
        localStorage.setItem('nabiz_following_list', JSON.stringify(followingList));
        
        toast.success(`${userName} takip ediliyor`);
      } else {
        localStorage.removeItem(`nabiz_following_${userId}`);
        
        // Update following list
        const followingList = JSON.parse(localStorage.getItem('nabiz_following_list') || '[]');
        const updatedList = followingList.filter((id: string) => id !== userId);
        localStorage.setItem('nabiz_following_list', JSON.stringify(updatedList));
        
        toast.success(`${userName} takip bırakıldı`);
      }
    }

    setIsLoading(false);
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  // Variant styles
  if (variant === 'compact') {
    return (
      <button
        onClick={handleFollow}
        disabled={isLoading}
        className={`${sizeClasses[size]} rounded-full font-medium transition-all
                   ${isFollowing
                     ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                     : 'bg-blue-500 text-white hover:bg-blue-600'
                   } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {isFollowing ? <UserCheck className={iconSizes[size]} /> : <UserPlus className={iconSizes[size]} />}
      </button>
    );
  }

  if (variant === 'icon') {
    return (
      <button
        onClick={handleFollow}
        disabled={isLoading}
        className={`p-2 rounded-full transition-all
                   ${isFollowing
                     ? 'bg-green-50 dark:bg-green-900/20 text-green-500'
                     : 'bg-blue-50 dark:bg-blue-900/20 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                   } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={isFollowing ? 'Takip Ediliyor' : 'Takip Et'}
      >
        {isLoading ? (
          <span className="w-4 h-4 animate-spin border-2 border-current border-t-transparent rounded-full block" />
        ) : isFollowing ? (
          <UserCheck className="w-4 h-4" />
        ) : (
          <UserPlus className="w-4 h-4" />
        )}
      </button>
    );
  }

  // Primary variant (default)
  return (
    <button
      onClick={handleFollow}
      disabled={isLoading}
      className={`${sizeClasses[size]} rounded-full font-medium transition-all flex items-center gap-2
                 ${isFollowing
                   ? 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                   : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                 } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {isLoading ? (
        <span className={`${iconSizes[size]} animate-spin border-2 border-current border-t-transparent rounded-full`} />
      ) : isFollowing ? (
        <>
          <UserCheck className={iconSizes[size]} />
          <span>Takip Ediliyor</span>
        </>
      ) : (
        <>
          <UserPlus className={iconSizes[size]} />
          <span>Takip Et</span>
        </>
      )}
    </button>
  );
}
