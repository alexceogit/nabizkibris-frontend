'use client';

import { UserPlus, UserCheck } from 'lucide-react';
import { useFollow } from '@/hooks/useFollow';
import { motion } from 'framer-motion';

interface FollowButtonProps {
  authorId: string;
  size?: 'sm' | 'md' | 'lg';
  showCount?: boolean;
}

export function FollowButton({ authorId, size = 'md', showCount = true }: FollowButtonProps) {
  const { isFollowing, followerCount, isLoading, toggleFollow } = useFollow(authorId);

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  if (isLoading) {
    return (
      <button
        className={`${sizeClasses[size]} rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse`}
        disabled
      />
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.02 }}
      onClick={toggleFollow}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center gap-2 font-medium
        transition-colors duration-200
        ${isFollowing
          ? 'bg-gray-100 text-gray-700 border border-gray-300 hover:bg-red-50 hover:text-red-500 hover:border-red-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-red-900/20 dark:hover:text-red-400 dark:hover:border-red-800'
          : 'bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700'
        }
      `}
      aria-label={isFollowing ? 'Takipten çık' : 'Takip et'}
    >
      {isFollowing ? (
        <>
          <UserCheck size={size === 'sm' ? 14 : 16} />
          <span>Takip Ediliyor</span>
        </>
      ) : (
        <>
          <UserPlus size={size === 'sm' ? 14 : 16} />
          <span>Takip Et</span>
        </>
      )}
      {showCount && followerCount > 0 && (
        <span className="text-xs opacity-70">({followerCount})</span>
      )}
    </motion.button>
  );
}
