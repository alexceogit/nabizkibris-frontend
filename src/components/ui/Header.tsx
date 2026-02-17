'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Search, Globe } from 'lucide-react';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, LANGUAGE_FLAGS, TRANSLATIONS } from '@/lib/constants';
import type { Language } from '@/types';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isChangingLang, setIsChangingLang] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>('tr');

  // Get current language from pathname
  useEffect(() => {
    if (pathname) {
      const segments = pathname.split('/');
      if (segments[1] && SUPPORTED_LANGUAGES.includes(segments[1] as Language)) {
        setCurrentLang(segments[1] as Language);
        // Language changed, hide loader
        setIsChangingLang(false);
      }
    }
  }, [pathname]);

  // Get translations for current language
  const t = TRANSLATIONS[currentLang];

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const handleLanguageChange = (lang: Language) => {
    setIsChangingLang(true);
    setLangMenuOpen(false);
    
    // Navigate to new language
    if (pathname) {
      const segments = pathname.split('/');
      if (segments[1] && SUPPORTED_LANGUAGES.includes(segments[1] as Language)) {
        segments[1] = lang;
        const newPath = segments.join('/');
        router.push(newPath);
      } else {
        router.push(`/${lang}${pathname}`);
      }
    }
  };

  // Helper to get language-prefixed URL
  const getLangUrl = (path: string) => {
    return `/${currentLang}${path}`;
  };

  // Current date
  const today = new Date().toLocaleDateString('tr-TR', { 
    weekday: 'short', 
    day: 'numeric', 
    month: 'short' 
  });

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900">
      {/* Language changing loader */}
      {isChangingLang && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      )}
      
      {/* Widget Bar inside Header */}
      <div className="bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <div className="container mx-auto px-4 py-1.5">
          <div className="flex items-center justify-between gap-4">
            {/* Date */}
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400">
              {today}
            </div>
            
            {/* Widgets */}
            <div className="flex items-center gap-3">
              {/* Exchange Rate */}
              <div className="flex items-center gap-1.5 px-2 py-0.5 bg-white dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                <span className="text-xs">💱</span>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">$43.45</span>
              </div>
              
              {/* Weather */}
              <div className="flex items-center gap-1 px-2 py-0.5 bg-sky-50 dark:bg-sky-900/20 rounded-md border border-sky-200 dark:border-sky-800">
                <span className="text-xs">☀️</span>
                <span className="text-xs font-medium text-sky-700 dark:text-sky-300">22°</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href={getLangUrl('/')} className="flex items-center space-x-2">
          <span className="text-xl">🧠</span>
          <span className="text-lg font-bold text-primary hidden sm:inline-block">
            NabızKıbrıs
          </span>
        </Link>

        {/* Desktop Navigation - Fixed dark mode colors */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href={getLangUrl('/haberler')} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors dark:text-white dark:hover:text-blue-400">
            {t.allNews}
          </Link>
          <Link href={getLangUrl('/son-dakika')} className="text-sm font-medium text-flash hover:text-flash-dark transition-colors">
            {t.breakingNews}
          </Link>
          <Link href={getLangUrl('/kose-yazilari')} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors dark:text-white dark:hover:text-blue-400">
            {t.columns}
          </Link>
          <Link href={getLangUrl('/hakkimizda')} className="text-sm font-medium text-gray-700 hover:text-primary transition-colors dark:text-white dark:hover:text-blue-400">
            {t.about}
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-700 hover:text-primary transition-colors dark:text-white dark:hover:text-blue-400"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 p-2 text-gray-700 hover:text-primary transition-colors dark:text-white dark:hover:text-blue-400"
              aria-label="Language"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">
                {LANGUAGE_FLAGS[currentLang]}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={cn(
                      'flex w-full items-center space-x-2 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700',
                      currentLang === lang ? 'bg-primary/10 text-primary' : 'text-text-primary dark:text-gray-200'
                    )}
                  >
                    <span>{LANGUAGE_FLAGS[lang]}</span>
                    <span>{LANGUAGE_NAMES[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle - Fixed icon visibility */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-gray-700 hover:text-primary transition-colors dark:text-white dark:hover:text-blue-400"
            aria-label="Toggle theme"
          >
            {mounted && resolvedTheme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={onMenuToggle}
            className="p-2 text-gray-700 hover:text-primary transition-colors md:hidden dark:text-white dark:hover:text-blue-400"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      {searchOpen && (
        <div className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-800">
          <div className="container mx-auto">
            <form action={`/${currentLang}/ara`} className="flex items-center space-x-2">
              <input
                type="search"
                name="q"
                placeholder={t.searchPlaceholder}
                className="input flex-1"
                autoFocus
              />
              <button type="submit" className="btn-primary">
                {t.search}
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
