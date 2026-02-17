'use client';

import { useState, useEffect } from 'react';
import { Eye } from 'lucide-react';

interface ViewCounterProps {
  slug: string;
  initialViews?: number;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function ViewCounter({ 
  slug, 
  initialViews = 0, 
  showLabel = true,
  size = 'md' 
}: ViewCounterProps) {
  const [views, setViews] = useState(initialViews);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Simulate fetching view count
    const fetchViews = async () => {
      // In production, this would call your API
      const storedViews = localStorage.getItem(`views_${slug}`);
      if (storedViews) {
        setViews(parseInt(storedViews, 10));
      }
    };

    fetchViews();
  }, [slug]);

  // Increment view count on mount
  useEffect(() => {
    if (mounted) {
      const newViews = views + 1;
      setViews(newViews);
      localStorage.setItem(`views_${slug}`, newViews.toString());
    }
  }, [mounted, slug, views]);

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  };

  if (!mounted) {
    return (
      <span className={`${sizeClasses[size]} text-text-muted dark:text-gray-400 flex items-center gap-1`}>
        <Eye className={iconSizes[size]} />
        {showLabel && <span>...</span>}
      </span>
    );
  }

  const formattedViews = new Intl.NumberFormat('tr-TR').format(views);

  return (
    <span className={`${sizeClasses[size]} text-text-muted dark:text-gray-400 flex items-center gap-1`}>
      <Eye className={iconSizes[size]} />
      {showLabel && <span>{formattedViews}</span>}
    </span>
  );
}

// Animated counter version
export function AnimatedViewCounter({ 
  slug, 
  initialViews = 0 
}: { slug: string; initialViews?: number }) {
  const [views, setViews] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setViews(initialViews);
  }, [initialViews]);

  if (!mounted) {
    return <span className="text-sm text-text-muted">...</span>;
  }

  const formattedViews = new Intl.NumberFormat('tr-TR').format(views);

  return (
    <span className="text-sm text-text-muted dark:text-gray-400 flex items-center gap-1">
      <Eye className="w-4 h-4" />
      <span className="font-semibold">{formattedViews}</span>
      <span className="text-xs">okunma</span>
    </span>
  );
}

// Article meta component
export function ArticleMeta({ 
  date, 
  readTime, 
  views, 
  author 
}: { 
  date: string; 
  readTime: string; 
  views: number; 
  author?: string 
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted dark:text-gray-400">
      <time dateTime={date} className="flex items-center gap-1">
        <span className="w-4 h-4 flex items-center justify-center">📅</span>
        {date}
      </time>
      
      <span className="flex items-center gap-1">
        <span className="w-4 h-4 flex items-center justify-center">⏱️</span>
        {readTime}
      </span>
      
      <span className="flex items-center gap-1">
        <Eye className="w-4 h-4" />
        {new Intl.NumberFormat('tr-TR').format(views)}
      </span>
      
      {author && (
        <span className="flex items-center gap-1">
          <span className="w-4 h-4 flex items-center justify-center">✍️</span>
          {author}
        </span>
      )}
    </div>
  );
}

// Reading time estimator
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  
  if (minutes < 1) return '1 dk';
  return `${minutes} dk okuma`;
}

// Compact view for lists
export function ViewCountBadge({ views }: { views: number }) {
  const formatted = views >= 1000 
    ? `${(views / 1000).toFixed(1)}K` 
    : views.toString();

  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs font-medium text-text-secondary dark:text-gray-300">
      <Eye className="w-3 h-3" />
      {formatted}
    </span>
  );
}

// Popular badge for trending articles
export function TrendingBadge({ rank }: { rank: number }) {
  return (
    <span className="absolute top-2 left-2 w-7 h-7 bg-flash text-white text-sm font-bold flex items-center justify-center rounded shadow-sm z-10">
      #{rank}
    </span>
  );
}
