'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Eye, TrendingUp, ArrowRight } from 'lucide-react';

interface PopularArticle {
  id: string;
  title: string;
  slug: string;
  image: string;
  category: string;
  views: string;
  timeAgo: string;
}

interface PopularNewsProps {
  title?: string;
  articles?: PopularArticle[];
  variant?: 'default' | 'compact' | 'numbered';
  limit?: number;
  currentLang?: string;
}

const defaultArticles: PopularArticle[] = [
  {
    id: '1',
    title: 'KKTC\'de yeni ekonomik tedbirler açıklandı',
    slug: 'kkte-de-yeni-ekonomik-tedbirler',
    image: 'https://picsum.photos/400/300?random=10',
    category: 'Ekonomi',
    views: '125K',
    timeAgo: '2 saat önce',
  },
  {
    id: '2',
    title: 'Girne Marina sezonu açıldı',
    slug: 'girne-marina-sezonu-acildi',
    image: 'https://picsum.photos/400/300?random=11',
    category: 'Turizm',
    views: '98K',
    timeAgo: '4 saat önce',
  },
  {
    id: '3',
    title: 'Lefkoşa\'da trafik kazası: 3 yaralı',
    slug: 'lefkosada-trafik-kazasi',
    image: 'https://picsum.photos/400/300?random=12',
    category: 'Güncel',
    views: '87K',
    timeAgo: '5 saat önce',
  },
  {
    id: '4',
    title: 'Milli takım dostluk maçı hazırlıkları',
    slug: 'milli-takim-dostluk-maci-hazirliklari',
    image: 'https://picsum.photos/400/300?random=13',
    category: 'Spor',
    views: '76K',
    timeAgo: '6 saat önce',
  },
  {
    id: '5',
    title: 'Eğitimde yeni dönem: Müfredat güncellendi',
    slug: 'egitimde-yeni-donem-mufredat-guncellendi',
    image: 'https://picsum.photos/400/300?random=14',
    category: 'Eğitim',
    views: '65K',
    timeAgo: '8 saat önce',
  },
];

export function PopularNews({ 
  title = 'Popüler Haberler',
  articles = defaultArticles,
  variant = 'default',
  limit = 5,
  currentLang = 'tr'
}: PopularNewsProps) {
  const displayArticles = articles.slice(0, limit);

  if (variant === 'compact') {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
        <h3 className="font-bold text-text-primary dark:text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-flash" />
          {title}
        </h3>
        <div className="space-y-3">
          {displayArticles.map((article, index) => (
            <Link 
              key={article.id}
              href={`/${currentLang}/${article.slug}`}
              className="flex items-center gap-3 group"
            >
              <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-flash transition-colors">
                {index + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-text-primary dark:text-white text-sm line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-text-muted dark:text-gray-400">
                  <span className="text-flash">{article.views}</span>
                  <span>•</span>
                  <span>{article.timeAgo}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'numbered') {
    return (
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-text-primary dark:text-white flex items-center gap-2">
            <span className="text-flash">🔥</span>
            {title}
          </h2>
        </div>
        <div className="space-y-4">
          {displayArticles.map((article, index) => (
            <article 
              key={article.id}
              className="flex gap-4 bg-white dark:bg-gray-800 rounded-lg p-3 shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-0 left-0 w-6 h-6 bg-flash text-white text-xs font-bold flex items-center justify-center rounded-tr-lg">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/${currentLang}/${article.slug}`}>
                  <h3 className="font-semibold text-text-primary dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                </Link>
                <div className="flex items-center gap-2 mt-2 text-sm">
                  <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-text-secondary dark:text-gray-300">
                    {article.category}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400">
                    <Eye className="w-3 h-3" />
                    {article.views}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    );
  }

  // Default variant (large cards)
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-100 dark:border-gray-700">
        <TrendingUp className="w-5 h-5 text-flash" />
        <h3 className="font-bold text-gray-900 dark:bg-gray-900 dark:text-white px-2 py-1 rounded">
          {title}
        </h3>
      </div>
      <div className="space-y-4">
        {displayArticles.map((article, index) => (
          <article 
            key={article.id}
            className="group"
          >
            <Link href={`/${currentLang}/${article.slug}`}>
              <div className="relative h-32 overflow-hidden rounded-lg mb-3">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 w-7 h-7 bg-flash text-white text-sm font-bold flex items-center justify-center rounded">
                  {index + 1}
                </div>
                <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white text-xs rounded backdrop-blur-sm">
                  {article.category}
                </span>
              </div>
              <h4 className="font-semibold text-text-primary dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                {article.title}
              </h4>
              <div className="flex items-center gap-2 mt-2 text-xs text-text-muted dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views}
                </span>
                <span>•</span>
                <span>{article.timeAgo}</span>
              </div>
            </Link>
          </article>
        ))}
      </div>
      <Link
        href={`/${currentLang}/populer`}
        className="block mt-4 text-center text-sm text-primary hover:underline font-medium py-2 border-t border-gray-100 dark:border-gray-700"
      >
        Tümünü Göster →
      </Link>
    </div>
  );
}

// Horizontal scroll version
export function PopularNewsHorizontal({ 
  articles = defaultArticles,
  currentLang = 'tr'
}: PopularNewsProps) {
  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {articles.slice(0, 6).map((article, index) => (
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
              <div className="absolute top-3 left-3 w-8 h-8 bg-flash text-white font-bold flex items-center justify-center rounded">
                {index + 1}
              </div>
            </div>
            <div className="p-4">
              <span className="text-xs text-primary font-medium">
                {article.category}
              </span>
              <Link href={`/${currentLang}/${article.slug}`}>
                <h3 className="mt-2 font-semibold text-text-primary dark:text-white line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-3 text-xs text-text-muted dark:text-gray-400">
                <span className="flex items-center gap-1">
                  <Eye className="w-3 h-3" />
                  {article.views}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
