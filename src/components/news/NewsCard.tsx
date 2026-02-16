'use client';

import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { formatDate, getRelativeTime, calculateReadingTime } from '@/lib/utils';
import { WP_Post } from '@/types';

interface NewsCardProps {
  post: WP_Post;
  featured?: boolean;
  lang?: string;
}

export function NewsCard({ post, featured = false, lang = 'tr' }: NewsCardProps) {
  const title = post.title?.rendered || 'Başlıksız';
  const excerpt = post.excerpt?.rendered || '';
  const date = post.date || new Date().toISOString();
  const slug = post.slug || '#';
  const author = post._embedded?.author?.[0]?.name || 'NabızKıbrıs';
  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || null;
  const readingTime = calculateReadingTime(post.content?.rendered || '');
  const categories = post._embedded?.['wp:term']?.[0] || [];

  // Get first category
  const primaryCategory = categories[0];

  // Use correct URL structure with language prefix
  const articleUrl = `/${lang}/${slug}`;
  const categoryUrl = `/kategori/${primaryCategory?.slug || 'genel'}`;

  if (featured) {
    return (
      <article className="group relative overflow-hidden rounded-2xl bg-white shadow-lg transition-all hover:shadow-xl dark:bg-gray-800">
        {featuredImage && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={featuredImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-6">
          {primaryCategory && (
            <Link
              href={categoryUrl}
              className="badge-primary mb-3 inline-block"
            >
              {primaryCategory.name}
            </Link>
          )}
          <Link href={articleUrl}>
            <h2 className="text-xl font-bold text-text-primary group-hover:text-primary dark:text-white">
              <span dangerouslySetInnerHTML={{ __html: title }} />
            </h2>
          </Link>
          <div className="mt-3 flex items-center space-x-4 text-sm text-text-secondary dark:text-gray-400">
            <span className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{readingTime} dk okuma</span>
            </span>
            <span>{getRelativeTime(date)}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="card group flex flex-col">
      {featuredImage && (
        <Link href={articleUrl} className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={featuredImage}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      )}
      <div className="flex flex-1 flex-col p-4">
        <div className="mb-2 flex items-center justify-between">
          {primaryCategory && (
            <Link
              href={categoryUrl}
              className="badge-primary text-xs"
            >
              {primaryCategory.name}
            </Link>
          )}
          <span className="text-xs text-text-secondary dark:text-gray-400">
            {getRelativeTime(date)}
          </span>
        </div>
        <Link href={articleUrl} className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary dark:text-white line-clamp-2">
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h3>
        </Link>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-text-secondary dark:text-gray-400">
            {author}
          </span>
          <Link
            href={articleUrl}
            className="group/link inline-flex items-center text-xs font-medium text-primary hover:underline"
          >
            Devamı
            <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </article>
  );
}

// Skeleton loader for NewsCard
export function NewsCardSkeleton() {
  return (
    <div className="card animate-pulse">
      <div className="aspect-[16/9] w-full bg-gray-200 dark:bg-gray-700" />
      <div className="p-4">
        <div className="mb-2 h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-2 h-6 w-full rounded bg-gray-200 dark:bg-gray-700" />
        <div className="mb-4 h-6 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
        <div className="flex justify-between">
          <div className="h-4 w-20 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-16 rounded bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>
    </div>
  );
}
