'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Home, ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[];
  homeLabel?: string;
}

export function Breadcrumb({ items = [], homeLabel = 'Ana Sayfa' }: BreadcrumbProps) {
  const params = useParams();
  const lang = (params?.lang as string) || 'tr';

  // Generate default items based on current path
  const getDefaultItems = (): BreadcrumbItem[] => {
    const path = typeof window !== 'undefined' ? window.location.pathname : '';
    const segments = path.split('/').filter(Boolean);
    
    const defaultItems: BreadcrumbItem[] = [{ label: homeLabel, href: `/${lang}` }];
    
    segments.forEach((segment, index) => {
      if (segment === lang) return;
      
      const href = '/' + segments.slice(0, index + 2).join('/');
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      
      defaultItems.push({ label, href });
    });
    
    return defaultItems;
  };

  const breadcrumbItems = items.length > 0 ? items : getDefaultItems();

  if (breadcrumbItems.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="w-4 h-4 text-gray-400 mx-1" />
            )}
            {item.href && index < breadcrumbItems.length - 1 ? (
              <Link
                href={item.href}
                className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-text-primary dark:text-white font-medium">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

// Simple version for use in article pages
export function ArticleBreadcrumb({ 
  category, 
  categoryHref,
  title 
}: { 
  category?: string; 
  categoryHref?: string;
  title: string;
}) {
  const params = useParams();
  const lang = (params?.lang as string) || 'tr';

  return (
    <nav className="flex items-center space-x-2 text-sm mb-6" aria-label="Breadcrumb">
      <Link 
        href={`/${lang}`}
        className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors flex items-center gap-1"
      >
        <Home className="w-4 h-4" />
        {lang === 'tr' ? 'Ana Sayfa' : 'Home'}
      </Link>
      <ChevronRight className="w-4 h-4 text-gray-400" />
      {category && categoryHref ? (
        <Link
          href={categoryHref}
          className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
        >
          {category}
        </Link>
      ) : (
        <span className="text-text-secondary dark:text-gray-400">
          {lang === 'tr' ? 'Haberler' : 'News'}
        </span>
      )}
      <ChevronRight className="w-4 h-4 text-gray-400" />
      <span className="text-text-primary dark:text-white font-medium truncate max-w-xs">
        {title}
      </span>
    </nav>
  );
}
