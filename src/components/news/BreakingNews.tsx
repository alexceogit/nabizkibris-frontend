'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Zap, X } from 'lucide-react';
import { WP_Post } from '@/types';
import { cn } from '@/lib/utils';

interface BreakingNewsProps {
  posts?: WP_Post[];
}

export function BreakingNews({ posts = [] }: BreakingNewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Auto-rotate through posts
  useEffect(() => {
    if (posts.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [posts.length]);

  if (!isVisible || posts.length === 0) return null;

  const currentPost = posts[currentIndex];
  const title = currentPost?.title?.rendered || 'Son dakika haberi';
  const slug = currentPost?.slug || '#';

  return (
    <div className="w-full bg-flash text-white">
      <div className="container mx-auto">
        <div className="flex items-center">
          {/* Label */}
          <div className="flex shrink-0 items-center space-x-2 bg-flash-dark px-4 py-3">
            <Zap className="h-5 w-5 animate-pulse" />
            <span className="hidden font-bold sm:inline">SON DAKİKA</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden py-3">
            <Link
              href={`/haber/${slug}`}
              className="group flex items-center px-4 transition-colors hover:bg-flash-dark/50"
            >
              <span
                className="line-clamp-1 text-sm font-medium transition-all group-hover:text-white/90 sm:text-base"
                dangerouslySetInnerHTML={{ __html: title }}
              />
              <span className="ml-2 hidden text-xs opacity-75 sm:inline">
                Devamı →
              </span>
            </Link>
          </div>

          {/* Controls */}
          <div className="flex shrink-0 items-center space-x-1 pr-4">
            {/* Navigation dots */}
            {posts.length > 1 && (
              <div className="hidden space-x-1 sm:flex">
                {posts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={cn(
                      'h-2 w-2 rounded-full transition-all',
                      index === currentIndex
                        ? 'bg-white'
                        : 'bg-white/50 hover:bg-white/75'
                    )}
                    aria-label={`Go to news ${index + 1}`}
                  />
                ))}
              </div>
            )}

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 rounded-full p-1 hover:bg-white/20"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
