'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, MessageCircle } from 'lucide-react';
import { SITE_NAME, SITE_DESCRIPTION, SOCIAL_LINKS, SUPPORTED_LANGUAGES } from '@/lib/constants';

export function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  
  // Get current language from pathname
  let currentLang = 'tr';
  if (pathname) {
    const segments = pathname.split('/');
    if (segments[1] && SUPPORTED_LANGUAGES.includes(segments[1])) {
      currentLang = segments[1];
    }
  }

  // Helper to get language-prefixed URL
  const getLangUrl = (path: string) => {
    return `/${currentLang}${path}`;
  };

  return (
    <footer className="border-t border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
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

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary dark:text-white">
              Hızlı Linkler
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={getLangUrl('/haberler')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Tüm Haberler
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/son-dakika')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Son Dakika
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/kose-yazilari')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Köşe Yazıları
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/kategori/politika')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Politika
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/kategori/spor')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Spor
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-text-primary dark:text-white">
              Kurumsal
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href={getLangUrl('/hakkimizda')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/iletisim')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/gizlilik-politikasi')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/kullanim-sartlari')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Kullanım Şartları
                </Link>
              </li>
              <li>
                <Link href={getLangUrl('/reklam')} className="text-sm text-text-secondary hover:text-primary transition-colors dark:text-gray-400 dark:hover:text-blue-400">
                  Reklam
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-sm text-text-secondary dark:text-gray-400">
              © {currentYear} {SITE_NAME}. Tüm hakları saklıdır.
            </p>
            <p className="text-xs text-text-secondary dark:text-gray-500">
              Made with 🧠 for KKTC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
