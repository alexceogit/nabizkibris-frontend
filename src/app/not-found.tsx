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
      <div className="text-center mb-8">
        <h1 className="text-9xl font-bold text-flash opacity-20 dark:text-flash-dark animate-pulse">
          404
        </h1>
      </div>

      <div className="text-center max-w-md">
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-4">
          Sayfa Bulunamadı
        </h2>
        <p className="text-text-secondary dark:text-gray-400 mb-8">
          Aradığınız sayfa mevcut değil veya kaldırılmış olabilir.
        </p>

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
    </div>
  );
}
