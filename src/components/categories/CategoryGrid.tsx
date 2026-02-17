'use client';

import Link from 'next/link';
import Image from 'next/image';

interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  image?: string;
  articleCount?: number;
}

interface CategoryGridProps {
  categories?: Category[];
  title?: string;
  variant?: 'default' | 'compact' | 'icons-only';
}

const defaultCategories: Category[] = [
  { id: '1', name: 'Politika', slug: 'politika', icon: '🏛️', color: 'bg-blue-500', articleCount: 245 },
  { id: '2', name: 'Ekonomi', slug: 'ekonomi', icon: '💰', color: 'bg-green-500', articleCount: 189 },
  { id: '3', name: 'Spor', slug: 'spor', icon: '⚽', color: 'bg-orange-500', articleCount: 324 },
  { id: '4', name: 'Dünya', slug: 'dunya', icon: '🌍', color: 'bg-purple-500', articleCount: 156 },
  { id: '5', name: 'Kültür', slug: 'kultur', icon: '🎭', color: 'bg-pink-500', articleCount: 98 },
  { id: '6', name: 'Teknoloji', slug: 'teknoloji', icon: '💻', color: 'bg-indigo-500', articleCount: 178 },
  { id: '7', name: 'Sağlık', slug: 'saglik', icon: '🏥', color: 'bg-red-500', articleCount: 87 },
  { id: '8', name: 'Eğitim', slug: 'egitim', icon: '📚', color: 'bg-yellow-500', articleCount: 65 },
  { id: '9', name: 'Turizm', slug: 'turizm', icon: '🏖️', color: 'bg-cyan-500', articleCount: 112 },
  { id: '10', name: 'Magazin', slug: 'magazin', icon: '✨', color: 'bg-rose-500', articleCount: 203 },
  { id: '11', name: 'Güncel', slug: 'guncel', icon: '📰', color: 'bg-gray-600', articleCount: 312 },
  { id: '12', name: 'Kıbrıs', slug: 'kibris', icon: '🌊', color: 'bg-teal-500', articleCount: 445 },
];

export function CategoryGrid({
  categories = defaultCategories,
  title = 'Kategoriler',
  variant = 'default',
}: CategoryGridProps) {
  if (variant === 'icons-only') {
    return (
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/tr/kategori/${category.slug}`}
            className="group flex flex-col items-center justify-center w-20 h-20 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <span className="text-3xl mb-1 group-hover:scale-110 transition-transform">
              {category.icon}
            </span>
            <span className="text-xs font-medium text-text-primary dark:text-white text-center line-clamp-1">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/tr/kategori/${category.slug}`}
            className="group flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all"
          >
            <span className="text-2xl">{category.icon}</span>
            <span className="font-medium text-text-primary dark:text-white text-sm group-hover:text-primary transition-colors">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    );
  }

  // Default variant (large cards with images)
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-6 flex items-center gap-2">
        <span className="text-primary">📂</span>
        {title}
      </h2>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/tr/kategori/${category.slug}`}
            className="group relative overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            {/* Background */}
            <div className={`absolute inset-0 ${category.color} opacity-10 group-hover:opacity-15 transition-opacity`} />
            
            {/* Image if available */}
            {category.image && (
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover opacity-20 group-hover:opacity-30 transition-opacity"
              />
            )}
            
            {/* Content */}
            <div className="relative p-4 flex flex-col items-center text-center">
              <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {category.icon}
              </span>
              <h3 className="font-bold text-text-primary dark:text-white group-hover:text-primary transition-colors">
                {category.name}
              </h3>
              {category.articleCount && (
                <span className="text-xs text-text-muted dark:text-gray-400 mt-1">
                  {category.articleCount} haber
                </span>
              )}
              
              {/* Hover Arrow */}
              <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-primary">→</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

// Featured category section (like Kibrispostasi)
export function FeaturedCategories() {
  const featured = [
    { name: 'Son Dakika', slug: 'son-dakika', icon: '🚨', color: 'bg-red-500' },
    { name: 'Özel Haberler', slug: 'ozel', icon: '⭐', color: 'bg-yellow-500' },
    { name: 'Söyleşi', slug: 'soylesi', icon: '🎙️', color: 'bg-purple-500' },
    { name: 'Röportaj', slug: 'roportaj', icon: '📝', color: 'bg-blue-500' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-6">
      {featured.map((cat) => (
        <Link
          key={cat.slug}
          href={`/tr/${cat.slug}`}
          className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all group"
        >
          <span className={`w-12 h-12 rounded-full ${cat.color} flex items-center justify-center text-2xl`}>
            {cat.icon}
          </span>
          <span className="font-semibold text-text-primary dark:text-white group-hover:text-primary transition-colors">
            {cat.name}
          </span>
        </Link>
      ))}
    </div>
  );
}

// Category pills for article pages
export function CategoryPills({ categories, currentLang = 'tr' }: { categories: Category[]; currentLang?: string }) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/${currentLang}/kategori/${cat.slug}`}
          className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-text-secondary dark:text-gray-300 hover:bg-primary hover:text-white transition-colors"
        >
          <span>{cat.icon}</span>
          <span>{cat.name}</span>
        </Link>
      ))}
    </div>
  );
}
