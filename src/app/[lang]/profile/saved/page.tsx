'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Eye, Heart } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  views: number;
  slug: string;
}

export default function SavedPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'tr';
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    // Load saved articles from localStorage
    const saved = localStorage.getItem('nabiz_saved_articles');
    if (saved) {
      setArticles(JSON.parse(saved));
    } else {
      // Demo data
      setArticles([
        {
          id: '1',
          title: 'KKTC de yeni ekonomik düzenleme açıklandı',
          excerpt: 'Hükümetten kritik adım...',
          image: 'https://picsum.photos/400/300?random=1',
          date: '2024-01-15',
          views: 1250,
          slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
        },
        {
          id: '2',
          title: 'Girne Marina sezonu açıldı',
          excerpt: 'Turizm sezonu öncesi hazırlıklar tamamlandı...',
          image: 'https://picsum.photos/400/300?random=2',
          date: '2024-01-14',
          views: 890,
          slug: 'girne-marina-sezonu-acildi',
        },
      ]);
    }
  }, []);

  const removeArticle = (id: string) => {
    const updated = articles.filter(a => a.id !== id);
    setArticles(updated);
    localStorage.setItem('nabiz_saved_articles', JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Kaydettiklerim
        </h1>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <Bookmark className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">
              Henüz kaydedilen haber yok
            </p>
            <Link
              href={`/${lang}`}
              className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Haberlere Göz At
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex gap-4 p-4 bg-white dark:bg-[#1E293B] rounded-xl shadow-md"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <Link href={`/${lang}/${article.slug}`}>
                    <h3 className="font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.views}
                    </span>
                    <span>{article.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeArticle(article.id)}
                  className="self-start p-2 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <Bookmark className="w-5 h-5 fill-current" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
