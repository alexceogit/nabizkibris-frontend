'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Eye, Clock } from 'lucide-react';

interface RelatedArticle {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  date: string;
  readTime: string;
}

interface RelatedNewsProps {
  title?: string;
  articles?: RelatedArticle[];
  limit?: number;
  currentLang?: string;
  variant?: 'default' | 'compact' | 'horizontal';
}

const defaultArticles: RelatedArticle[] = [
  {
    id: '1',
    title: 'KKTC ekonomisine ilişkin yeni kararlar',
    slug: 'kkte-ekonomisine-iliskin-yeni-kararlar',
    image: 'https://picsum.photos/400/300?random=20',
    category: 'Ekonomi',
    date: '15 Şub 2024',
    readTime: '5 dk',
  },
  {
    id: '2',
    title: 'Turizm sektöründe büyük atılım',
    slug: 'turizm-sektorunde-buyuk-atilim',
    image: 'https://picsum.photos/400/300?random=21',
    category: 'Turizm',
    date: '14 Şub 2024',
    readTime: '4 dk',
  },
  {
    id: '3',
    title: 'Eğitim alanında önemli gelişmeler',
    slug: 'egitim-alaninda-onemli-gelismeler',
    image: 'https://picsum.photos/400/300?random=22',
    category: 'Eğitim',
    date: '13 Şub 2024',
    readTime: '6 dk',
  },
];

export function RelatedNews({
  title = 'İlgili Haberler',
  articles = defaultArticles,
  limit = 3,
  currentLang = 'tr',
  variant = 'default',
}: RelatedNewsProps) {
  const displayArticles = articles.slice(0, limit);

  if (variant === 'horizontal') {
    return (
      <section className="py-8 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-text-primary dark:text-white mb-6 flex items-center gap-2">
          <span className="text-primary">📰</span>
          {title}
        </h3>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {displayArticles.map((article) => (
            <article
              key={article.id}
              className="flex-shrink-0 w-72 bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm group"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                  {article.category}
                </span>
              </div>
              <div className="p-4">
                <Link href={`/${currentLang}/${article.slug}`}>
                  <h4 className="font-semibold text-text-primary dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h4>
                </Link>
                <div className="flex items-center gap-3 mt-3 text-xs text-text-muted dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                  <span>{article.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4">
        <h4 className="font-bold text-text-primary dark:text-white mb-4">
          {title}
        </h4>
        <div className="space-y-3">
          {displayArticles.map((article) => (
            <Link
              key={article.id}
              href={`/${currentLang}/${article.slug}`}
              className="flex gap-3 group"
            >
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h5 className="font-medium text-text-primary dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h5>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-muted dark:text-gray-400">
                  <span className="text-primary">{article.category}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <section className="py-8 border-t border-gray-200 dark:border-gray-700">
      <h3 className="text-xl font-bold text-text-primary dark:text-white mb-6 flex items-center gap-2">
        <span className="text-primary">📰</span>
        {title}
      </h3>
      <div className="grid md:grid-cols-3 gap-6">
        {displayArticles.map((article) => (
          <article
            key={article.id}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm group hover:shadow-md transition-shadow"
          >
            <div className="relative h-48 overflow-hidden">
              <Image
                src={article.image}
                alt={article.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-2 py-1 bg-primary text-white text-xs font-medium rounded">
                {article.category}
              </span>
            </div>
            <div className="p-4">
              <Link href={`/${currentLang}/${article.slug}`}>
                <h4 className="font-semibold text-text-primary dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
              </Link>
              <div className="flex items-center justify-between mt-4 text-sm">
                <div className="flex items-center gap-1 text-text-muted dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
                <span className="text-text-muted dark:text-gray-400 text-xs">
                  {article.date}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// In-article inline version
export function RelatedNewsInline({
  articles = defaultArticles,
  currentLang = 'tr',
}: RelatedNewsProps) {
  return (
    <div className="my-8 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <h4 className="font-bold text-text-primary dark:text-white mb-4">
        Konuyla İlgili Diğer Haberler
      </h4>
      <div className="space-y-3">
        {articles.slice(0, 3).map((article) => (
          <Link
            key={article.id}
            href={`/${currentLang}/${article.slug}`}
            className="flex items-center gap-3 py-2 border-b border-gray-200 dark:border-gray-700 last:border-0 group"
          >
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="flex-1 font-medium text-text-primary dark:text-white group-hover:text-primary transition-colors line-clamp-1">
              {article.title}
            </span>
            <span className="text-xs text-text-muted dark:text-gray-400">
              {article.readTime}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
