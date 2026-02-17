'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Home, RefreshCw } from 'lucide-react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
      {/* Animated 404 */}
      <div className="text-center mb-8">
        <h1 className="text-8xl md:text-9xl font-bold text-flash opacity-20 dark:text-red-400 animate-pulse">
          404
        </h1>
      </div>

      {/* Content */}
      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-8">
          Aradığınız sayfa mevcut değil, taşınmış veya kaldırılmış olabilir.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tr"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            <Home className="w-5 h-5" />
            Ana Sayfa
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 text-text-primary dark:text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Geri Dön
          </button>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="mt-16 text-center">
        <p className="text-sm text-text-muted dark:text-gray-500">
          NabızKıbrıs - Haberin Nabzı
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-flash dark:bg-red-400 animate-bounce" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 rounded-full bg-flash dark:bg-red-400 animate-bounce" style={{ animationDelay: '150ms' }} />
          <div className="w-2 h-2 rounded-full bg-flash dark:bg-red-400 animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      {/* Quick Links */}
      <div className="mt-12 flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/tr/haberler" className="text-primary hover:underline dark:text-blue-400">
          Tüm Haberler
        </Link>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <Link href="/tr/kategori/politika" className="text-primary hover:underline dark:text-blue-400">
          Politika
        </Link>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <Link href="/tr/kategori/spor" className="text-primary hover:underline dark:text-blue-400">
          Spor
        </Link>
        <span className="text-gray-400 dark:text-gray-600">|</span>
        <Link href="/tr/kategori/ekonomi" className="text-primary hover:underline dark:text-blue-400">
          Ekonomi
        </Link>
      </div>
    </div>
  );
}
