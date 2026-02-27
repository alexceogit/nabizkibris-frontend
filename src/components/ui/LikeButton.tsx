'use client';

import { Heart } from 'lucide-react';
import { useLikes } from '@/hooks/useLikes';
import { motion } from 'framer-motion';

interface LikeButtonProps {
  postId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LikeButton({ postId, size = 'md' }: LikeButtonProps) {
  const { count, isLiked, isLoading, toggleLike } = useLikes(postId);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
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
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleLike}
      className={`
        ${sizeClasses[size]} rounded-full flex items-center justify-center
        transition-colors duration-200
        ${isLiked
          ? 'bg-red-100 text-red-500 dark:bg-red-900/30 dark:text-red-400'
          : 'bg-gray-100 text-gray-500 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400'
        }
      `}
      aria-label={isLiked ? 'Beğeniyi kaldır' : 'Beğen'}
    >
      <Heart
        size={iconSizes[size]}
        fill={isLiked ? 'currentColor' : 'none'}
        className={isLiked ? 'animate-pulse' : ''}
      />
      {count > 0 && (
        <span className="ml-1 text-xs font-medium">{count}</span>
      )}
    </motion.button>
  );
}
