import Image from 'next/image';

interface SkeletonCardProps {
  variant?: 'default' | 'featured' | 'horizontal';
}

export function SkeletonCard({ variant = 'default' }: SkeletonCardProps) {
  if (variant === 'featured') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden animate-pulse">
        {/* Image placeholder */}
        <div className="w-full h-64 md:h-96 bg-gray-300 dark:bg-gray-700" />
        
        <div className="p-6 space-y-4">
          {/* Category badge */}
          <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 rounded-full" />
          
          {/* Title */}
          <div className="space-y-2">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
          </div>
          
          {/* Meta info */}
          <div className="flex items-center gap-4 pt-4">
            <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
            <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'horizontal') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse flex flex-col md:flex-row">
        {/* Image */}
        <div className="w-full md:w-1/3 h-48 md:h-auto bg-gray-300 dark:bg-gray-700" />
        
        <div className="p-6 flex-1 space-y-4">
          {/* Category */}
          <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded-full" />
          
          {/* Title */}
          <div className="space-y-2">
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
            <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
          </div>
          
          {/* Excerpt */}
          <div className="space-y-2">
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
          </div>
          
          {/* Meta */}
          <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mt-4" />
        </div>
      </div>
    );
  }

  // Default variant (small card)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      {/* Image */}
      <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />
      
      <div className="p-4 space-y-3">
        {/* Category */}
        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full" />
        
        {/* Title */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          <div className="h-5 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        </div>
        
        {/* Date */}
        <div className="h-4 w-24 bg-gray-300 dark:bg-gray-700 rounded mt-2" />
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 6, variant = 'default' }: { count?: number; variant?: 'default' | 'featured' | 'horizontal' }) {
  return (
    <div className={`grid gap-6 ${
      variant === 'featured' ? '' : 
      variant === 'horizontal' ? '' : 
      'sm:grid-cols-2 lg:grid-cols-3'
    }`}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} variant={variant} />
      ))}
    </div>
  );
}

export function SkeletonArticle() {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl p-8 animate-pulse">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6">
        <div className="h-4 w-16 bg-gray-300 dark:bg-gray-700 rounded" />
        <span className="text-gray-400">/</span>
        <div className="h-4 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Title */}
      <div className="space-y-3 mb-6">
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
      </div>

      {/* Meta */}
      <div className="flex items-center gap-6 mb-8">
        <div className="h-5 w-28 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 rounded" />
      </div>

      {/* Featured Image */}
      <div className="w-full h-64 md:h-96 bg-gray-300 dark:bg-gray-700 rounded-xl mb-8" />

      {/* Content */}
      <div className="space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-4/6" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
      </div>
    </article>
  );
}

export function SkeletonCarousel() {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl animate-pulse bg-gray-300 dark:bg-gray-700">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
