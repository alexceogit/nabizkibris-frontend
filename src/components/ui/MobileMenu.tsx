'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, ArrowRight, Search } from 'lucide-react';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES } from '@/lib/constants';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState('tr');

  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/');
      if (segments[1] && SUPPORTED_LANGUAGES.includes(segments[1])) {
        setCurrentLang(segments[1]);
      }
    }
  }, [pathname]);

  if (!isOpen) return null;

  // Helper to get language-prefixed URL
  const getLangUrl = (path: string) => {
    return `/${currentLang}${path}`;
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 md:hidden"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-white shadow-xl dark:bg-gray-900 md:hidden">
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4 dark:border-gray-700">
          <span className="text-lg font-bold text-primary">NabızKıbrıs</span>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
            aria-label="Kapat"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="border-b border-gray-200 px-4 py-4 dark:border-gray-700">
          <form action={getLangUrl('/ara')} className="relative">
            <input
              type="search"
              name="q"
              placeholder="Haber ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input w-full pl-10"
            />
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-primary"
            >
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 h-[calc(100vh-180px)]">
          <ul className="space-y-2">
            <li>
              <Link
                href={getLangUrl('/')}
                className="block rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={onClose}
              >
                Ana Sayfa
              </Link>
            </li>
            <li>
              <Link
                href={getLangUrl('/haberler')}
                className="block rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={onClose}
              >
                Tüm Haberler
              </Link>
            </li>
            <li>
              <Link
                href={getLangUrl('/son-dakika')}
                className="block rounded-lg px-4 py-3 text-base font-medium text-flash hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={onClose}
              >
                Son Dakika
              </Link>
            </li>
            <li>
              <Link
                href={getLangUrl('/kose-yazilari')}
                className="block rounded-lg px-4 py-3 text-base font-medium text-text-primary hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white"
                onClick={onClose}
              >
                Köşe Yazıları
              </Link>
            </li>

            {/* Categories */}
            <li className="pt-4">
              <span className="px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-gray-400">
                Kategoriler
              </span>
            </li>
            {['Politika', 'Ekonomi', 'Spor', 'Kültür', 'Teknoloji'].map((category) => (
              <li key={category}>
                <Link
                  href={getLangUrl(`/kategori/${category.toLowerCase()}`)}
                  className="block rounded-lg px-4 py-2 text-base text-text-secondary hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800 dark:text-gray-400"
                  onClick={onClose}
                >
                  {category}
                </Link>
              </li>
            ))}

            {/* Language */}
            <li className="pt-4">
              <span className="px-4 text-xs font-semibold uppercase tracking-wider text-text-secondary dark:text-gray-400">
                Dil
              </span>
            </li>
            {SUPPORTED_LANGUAGES.map((lang) => (
              <li key={lang}>
                <Link
                  href={`/${lang}`}
                  className="block rounded-lg px-4 py-2 text-base text-text-secondary hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-800 dark:text-gray-400"
                  onClick={onClose}
                >
                  {LANGUAGE_NAMES[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Section */}
        <div className="border-t border-gray-200 px-4 py-4 dark:border-gray-700">
          <Link
            href={getLangUrl('/giris')}
            className="btn-primary w-full"
            onClick={onClose}
          >
            Giriş Yap
          </Link>
          <Link
            href={getLangUrl('/kayit')}
            className="btn-outline mt-2 w-full"
            onClick={onClose}
          >
            Kayıt Ol
          </Link>
        </div>
      </div>
    </>
  );
}
