'use client';

import Link from 'next/link';
import { Rss, Check } from 'lucide-react';

export default function RSSPage() {
  const feeds = [
    { lang: 'tr', name: 'Türkçe', url: '/tr/rss', description: 'Tüm Türkçe haberler' },
    { lang: 'en', name: 'English', url: '/en/rss', description: 'All English news' },
    { lang: 'el', name: 'Ελληνικά', url: '/el/rss', description: 'Όλα τα ελληνικά νέα' },
  ];

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-6">
            <Rss className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-text-primary dark:text-white mb-4">
            RSS Beslemeleri
          </h1>
          <p className="text-xl text-text-secondary dark:text-gray-400">
            En son haberlerden anında haberdar olun
          </p>
        </div>

        <div className="space-y-6">
          {feeds.map((feed) => (
            <div 
              key={feed.lang}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary dark:text-white flex items-center gap-2">
                    <span className="text-2xl">
                      {feed.lang === 'tr' ? '🇹🇷' : feed.lang === 'en' ? '🇬🇧' : '🇬🇷'}
                    </span>
                    {feed.name}
                  </h2>
                  <p className="text-text-secondary dark:text-gray-400 mt-1">
                    {feed.description}
                  </p>
                </div>
                <Link 
                  href={feed.url}
                  className="btn-primary flex items-center gap-2"
                  target="_blank"
                >
                  <Rss className="w-4 h-4" />
                  Abone Ol
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
          <h3 className="font-bold text-text-primary dark:text-white mb-4 flex items-center gap-2">
            ℹ️ RSS Nedir?
          </h3>
          <p className="text-text-secondary dark:text-gray-400 text-sm leading-relaxed">
            RSS (Really Simple Syndication) ile sitemizdeki en son haberlere 
            anında ulaşabilirsiniz. RSS okuyucu uygulamaları veya tarayıcı 
            uzantıları kullanarak beslemeleri takip edebilirsiniz.
          </p>
        </div>
      </div>
    </div>
  );
}
