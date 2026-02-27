'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle, ChevronDown } from 'lucide-react';
import { SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS, SUPPORTED_LANGUAGES, TRANSLATIONS, CATEGORY_EMOJIS, SUBCATEGORY_FLAGS } from '@/lib/constants';
import type { Language } from '@/types';

interface Category {
  id: number;
  name: string;
  slug: string;
  parent: number;
  count: number;
  description?: string;
  children?: Category[];
}

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  
  // Get current language from pathname
  let currentLang: Language = 'tr';
  if (pathname) {
    const segments = pathname.split('/');
    if (segments[1] && SUPPORTED_LANGUAGES.includes(segments[1] as Language)) {
      currentLang = segments[1] as Language;
    }
  }

  // Fetch categories from WordPress API
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`/api/wordpress/categories?lang=${currentLang}`);
        if (res.ok) {
          const data = await res.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  // Toggle subcategory expansion
  const toggleExpand = (slug: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(slug)) {
        next.delete(slug);
      } else {
        next.add(slug);
      }
      return next;
    });
  };

  // Get emoji for category
  const getCategoryEmoji = (slug: string) => {
    return CATEGORY_EMOJIS[slug] || '📁';
  };

  // Get flag for subcategory
  const getSubcategoryFlag = (slug: string) => {
    return SUBCATEGORY_FLAGS[slug.toLowerCase().replace(/\s+/g, '-')] || '📍';
  };

  // Get translations for current language
  const t = TRANSLATIONS[currentLang];

  // Helper to get language-prefixed URL
  const getLangUrl = (path: string) => {
    return `/${currentLang}${path}`;
  };

  // Default static categories as fallback
  const defaultCategories: Category[] = [
    { id: 0, name: 'Tüm Haberler', slug: 'haberler', parent: 0, count: 0 },
    { id: 0, name: 'Son Dakika', slug: 'son-dakika', parent: 0, count: 0 },
    { id: 3, name: 'Politika', slug: 'politika', parent: 0, count: 0 },
    { id: 5, name: 'Ekonomi', slug: 'ekonomi', parent: 0, count: 0 },
    { id: 4, name: 'Spor', slug: 'spor', parent: 0, count: 0 },
    { id: 7, name: 'Teknoloji', slug: 'tekno', parent: 0, count: 3, children: [
      { id: 11, name: 'Girişim', slug: 'girisim', parent: 7, count: 0 },
    ]},
    { id: 12, name: 'Yaşam', slug: 'yasam', parent: 0, count: 0 },
    { id: 8, name: 'Kültür & Etkinlikler', slug: 'kultur-etkinlikler', parent: 0, count: 0 },
    { id: 13, name: 'Gençlik', slug: 'genclik', parent: 0, count: 0 },
    { id: 6, name: 'Dünya', slug: 'dunya', parent: 0, count: 0 },
    { id: 9, name: 'Sağlık', slug: 'saglik', parent: 0, count: 0 },
  ];

  // Use API categories if available, otherwise fall back to defaults
  const displayCategories = categories.length > 0 ? categories : defaultCategories;

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900 pb-safe">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8 pb-16 sm:pb-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <Link href={getLangUrl('/')} className="flex items-center space-x-2">
              <span className="text-2xl">🧠</span>
              <span className="text-xl font-bold text-primary">{SITE_NAME}</span>
            </Link>
            <p className="mt-4 text-sm text-text-secondary dark:text-gray-400">
              {SITE_DESCRIPTION}
            </p>
            <div className="mt-6 flex space-x-4">
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400"
                aria-label="Telegram"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Categories - With Subcategories */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary dark:text-white">
              Kategoriler
            </h3>
            <ul className="mt-4 space-y-2">
              {/* Special links */}
              <li>
                <Link href={getLangUrl('/haberler')} className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                  📰 Tüm Haberler
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/son-dakika')} className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                  🔥 Son Dakika
                </Link>
              </li>
              
              {/* Dynamic Categories with Subcategories */}
              {displayCategories.filter(c => c.slug !== 'haberler' && c.slug !== 'son-dakika').map((category) => {
                const hasChildren = category.children && category.children.length > 0;
                const isExpanded = expandedCategories.has(category.slug);
                const emoji = getCategoryEmoji(category.slug);

                return (
                  <li key={category.slug}>
                    {hasChildren ? (
                      <div>
                        <button
                          onClick={() => toggleExpand(category.slug)}
                          className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400 w-full"
                        >
                          <span>{emoji} {category.name}</span>
                          <ChevronDown 
                            className={`h-3 w-3 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        
                        {/* Subcategories */}
                        {isExpanded && category.children && (
                          <ul className="ml-4 mt-1 space-y-1 border-l-2 border-gray-200 dark:border-gray-700 pl-2">
                            {category.children.map((subcat) => (
                              <li key={subcat.slug}>
                                <Link
                                  href={getLangUrl('/kategori/' + subcat.slug)}
                                  className="text-xs text-text-secondary hover:text-primary dark:text-gray-500 dark:hover:text-blue-400 block py-0.5"
                                >
                                  {getSubcategoryFlag(subcat.slug)} {subcat.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ) : (
                      <Link 
                        href={getLangUrl('/kategori/' + category.slug)} 
                        className="text-sm text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400"
                      >
                        {emoji} {category.name}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Legal & Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-6 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:space-y-0">
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link href={getLangUrl('/hakkimizda')} className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                Hakkımızda
              </Link>
              <Link href={getLangUrl('/iletisim')} className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                İletişim
              </Link>
              <Link href={getLangUrl('/gizlilik-politikasi')} className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                Gizlilik
              </Link>
              <Link href={getLangUrl('/kullanim-sartlari')} className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                Kullanım
              </Link>
              <Link href={getLangUrl('/reklam')} className="text-text-secondary hover:text-primary dark:text-gray-400 dark:hover:text-blue-400">
                Reklam
              </Link>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-text-secondary dark:text-gray-400">
              © {currentYear} {SITE_NAME}. {t.allRightsReserved}
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-500 mt-1">
              {t.madeWith}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
