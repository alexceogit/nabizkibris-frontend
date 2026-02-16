'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Menu, X, Sun, Moon, Search, Globe } from 'lucide-react';
import { LANGUAGE_NAMES, SUPPORTED_LANGUAGES, LANGUAGE_FLAGS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

export function Header({ onMenuToggle, isMenuOpen }: HeaderProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('tr');

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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-700 dark:bg-gray-900/95 dark:supports-[backdrop-filter]:bg-gray-900/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl">🧠</span>
          <span className="text-xl font-bold text-primary hidden sm:inline-block">
            NabızKıbrıs
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/haberler" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
            Haberler
          </Link>
          <Link href="/son-dakika" className="text-sm font-medium text-flash hover:text-flash-dark transition-colors">
            Son Dakika
          </Link>
          <Link href="/kose-yazilari" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
            Köşe Yazıları
          </Link>
          <Link href="/hakkimizda" className="text-sm font-medium text-text-primary hover:text-primary transition-colors">
            Hakkımızda
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Search Toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-text-primary hover:text-primary transition-colors"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center space-x-1 p-2 text-text-primary hover:text-primary transition-colors"
              aria-label="Language"
            >
              <Globe className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:inline">
                {LANGUAGE_FLAGS[currentLang as keyof typeof LANGUAGE_FLAGS]}
              </span>
            </button>

            {langMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-lg border border-gray-200 bg-white py-1 shadow-lg dark:border-gray-700 dark:bg-gray-800">
                {SUPPORTED_LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLang(lang);
                      setLangMenuOpen(false);
                    }}
                    className={cn(
                      'flex w-full items-center space-x-2 px-4 py-2 text-sm transition-colors hover:bg-gray-100 dark:hover:bg-gray-700',
                      currentLang === lang ? 'bg-primary/10 text-primary' : 'text-text-primary'
                    )}
                  >
                    <span>{LANGUAGE_FLAGS[lang]}</span>
                    <span>{LANGUAGE_NAMES[lang]}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Dark Mode Toggle - Fixed icon logic */}
          <button
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
            className="p-2 text-text-primary hover:text-primary transition-colors"
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
            className="p-2 text-text-primary hover:text-primary transition-colors md:hidden"
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
            <form action="/ara" className="flex items-center space-x-2">
              <input
                type="search"
                name="q"
                placeholder="Haber ara..."
                className="input flex-1"
                autoFocus
              />
              <button type="submit" className="btn-primary">
                Ara
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
