'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface GridItem {
  id: string;
  title: string;
  excerpt?: string;
  image: string;
  slug: string;
  category?: string;
  date?: string;
}

interface NewsGridProps {
  title?: string;
  items: GridItem[];
  currentLang?: string;
  viewAllLink?: string;
  variant?: 'horizontal' | 'vertical' | 'sidebar';
}

export function NewsGrid({ 
  title = 'Haberler', 
  items, 
  currentLang = 'tr', 
  viewAllLink,
  variant = 'horizontal' 
}: NewsGridProps) {
  
  if (items.length === 0) {
    return null;
  }

  // Horizontal variant (3-column grid)
  if (variant === 'horizontal') {
    return (
      <section className="mb-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {viewAllLink && (
            <Link 
              href={viewAllLink}
              className="text-sm text-primary hover:text-primary-dark transition-colors flex items-center gap-1"
            >
              Tümünü Göster <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* 3-Column Grid */}
        <div className="grid gap-4 md:grid-cols-3">
          {items.slice(0, 3).map((item) => (
            <article 
              key={item.id}
              className="group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800"
            >
              <Link href={`/${currentLang}/${item.slug}`}>
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image || '/placeholder-news.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {item.category && (
                    <span className="absolute top-3 left-3 px-2 py-1 text-xs font-semibold bg-flash text-white rounded">
                      {item.category}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  {item.excerpt && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                      {item.excerpt}
                    </p>
                  )}
                  {item.date && (
                    <time className="mt-3 block text-xs text-gray-500 dark:text-gray-500">
                      {item.date}
                    </time>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Vertical variant (2-column grid for sidebar)
  if (variant === 'vertical') {
    return (
      <section className="mb-8">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
          {title}
        </h2>
        <div className="space-y-4">
          {items.slice(0, 4).map((item) => (
            <article 
              key={item.id}
              className="flex gap-4 group bg-white p-3 rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              <Link href={`/${currentLang}/${item.slug}`}>
                <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded">
                  <Image
                    src={item.image || '/placeholder-news.jpg'}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </Link>
              <div className="flex-1 min-w-0">
                <Link href={`/${currentLang}/${item.slug}`}>
                  <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </Link>
                {item.date && (
                  <time className="mt-1 block text-xs text-gray-500 dark:text-gray-500">
                    {item.date}
                  </time>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  return null;
}
