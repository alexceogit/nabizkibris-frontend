'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { StoriesList } from '@/components/stories/Stories';
import { BreakingNews } from '@/components/news/BreakingNews';
import { WP_Post } from '@/types';
import { TRANSLATIONS } from '@/lib/constants';
import type { Language } from '@/types';

interface HomeClientProps {
  initialPosts: WP_Post[];
  lang: string;
}

export default function HomeClient({ initialPosts, lang }: HomeClientProps) {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Use server-fetched posts
  const posts = initialPosts;
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 4);

  const currentLang = (params?.lang as Language) || lang || 'tr';
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Breaking News - Header altında, Stories üstünde */}
      <BreakingNews posts={posts.slice(0, 5)} lang={currentLang} />

      {/* Stories Section */}
      <StoriesList />

      {/* Main Content */}
      <section className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Hero Carousel with WP posts */}
        {featuredPost && (
          <div className="mb-8">
            <h1 className="sr-only">NabızKıbrıs - Haberin Nabzı</h1>
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-xl group">
              <div className="absolute inset-0 transition-opacity duration-700 ease-in-out opacity-100">
                <div 
                  className="w-full h-full bg-cover bg-center"
                  style={{ 
                    backgroundImage: `url(${featuredPost._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/1200/600?random=1'})` 
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  {(() => {
                    const categories = featuredPost._embedded?.['wp:term']?.[0] || [];
                    const primaryCat = categories[0];
                    return primaryCat ? (
                      <Link href={`/${currentLang}/kategori/${primaryCat.slug}`}>
                        <span className="category-badge bg-blue-600 text-white">
                          {primaryCat.name}
                        </span>
                      </Link>
                    ) : (
                      <span className="category-badge bg-red-600 text-white animate-pulse">🔥 SON DAKİKA</span>
                    );
                  })()}
                  <Link href={`/${currentLang}/${featuredPost.slug}`}>
                    <h2 
                      className="text-2xl md:text-4xl font-bold text-white leading-tight hover:text-gray-200 transition-colors"
                      dangerouslySetInnerHTML={{ __html: featuredPost.title.rendered }}
                    />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Grid with WP posts */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Son Haberler */}
            <div className="flex items-center justify-between mb-6 mt-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:bg-gray-900 dark:text-white px-3 py-1.5 rounded">Son Haberler</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.slice(3, 7).map((post) => (
                <article key={post.id} className="card group flex flex-col">
                  <Link className="aspect-[16/9] w-full overflow-hidden" href={`/${currentLang}/${post.slug}`}>
                    <div 
                      className="h-full w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                      style={{ 
                        backgroundImage: `url(${post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/800/600?random=' + post.id})` 
                      }}
                    />
                  </Link>
                  <div className="flex flex-1 flex-col p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-semibold text-blue-600">Haber</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(post.date).toLocaleDateString('tr-TR')}
                      </span>
                    </div>
                    <Link className="flex-1" href={`/${currentLang}/${post.slug}`}>
                      <h3 
                        className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 dark:text-white line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                Popüler Haberler
              </h3>
              <div className="space-y-3">
                {posts.slice(0, 5).map((post, index) => (
                  <Link key={post.id} className="flex items-center gap-3 group" href={`/${currentLang}/${post.slug}`}>
                    <span className="text-2xl font-bold text-gray-200 dark:text-gray-700 group-hover:text-red-500 transition-colors">{index + 1}</span>
                    <div className="flex-1 min-w-0">
                      <h4 
                        className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2 group-hover:text-blue-600 transition-colors"
                        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                      />
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-500 dark:text-gray-400">
                        <span className="text-red-500">Yeni</span>
                        <span>•</span>
                        <span>{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
