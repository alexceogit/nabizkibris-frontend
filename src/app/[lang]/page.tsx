'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { NewsCard } from '@/components/news/NewsCard';
import { WP_Post } from '@/types';

// Mock data for demo
const mockPosts: WP_Post[] = [
  {
    id: 1,
    title: { rendered: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler' },
    excerpt: { rendered: '<p>Economy bakanı açıkladı...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    date: '2024-01-15T10:00:00',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    status: 'publish',
    type: 'post',
    _embedded: {
      author: [{ name: 'Ahmet Yılmaz', avatar_urls: {} }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600' }],
      'wp:term': [[{ id: 1, name: 'Politika', slug: 'politika' }]],
    },
  },
  {
    id: 2,
    title: { rendered: 'Girne\'de yeni turizm sezonu hazırlıkları' },
    excerpt: { rendered: '<p>Turizm sezonu yaklaşıyor...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    date: '2024-01-15T09:00:00',
    slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
    status: 'publish',
    type: 'post',
    _embedded: {
      author: [{ name: 'Ayşe Demir', avatar_urls: {} }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600?random=2' }],
      'wp:term': [[{ id: 2, name: 'Turizm', slug: 'turizm' }]],
    },
  },
  {
    id: 3,
    title: { rendered: 'Yerel seçimler için adaylar belli oldu' },
    excerpt: { rendered: '<p>Seçim yaklaşıyor...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    date: '2024-01-15T08:00:00',
    slug: 'yerel-secimler-icin-adaylar-belli-oldu',
    status: 'publish',
    type: 'post',
    _embedded: {
      author: [{ name: 'Mehmet Kaya', avatar_urls: {} }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600?random=3' }],
      'wp:term': [[{ id: 1, name: 'Politika', slug: 'politika' }]],
    },
  },
  {
    id: 4,
    title: { rendered: 'Lefkoşa\'da spor tesisleri yenileniyor' },
    excerpt: { rendered: '<p>Yatırım yapılıyor...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    date: '2024-01-14T15:00:00',
    slug: 'lefkosada-spor-tesisleri-yenileniyor',
    status: 'publish',
    type: 'post',
    _embedded: {
      author: [{ name: 'Ali Vural', avatar_urls: {} }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/800/600?random=4' }],
      'wp:term': [[{ id: 3, name: 'Spor', slug: 'spor' }]],
    },
  },
];

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const featuredPost = mockPosts[0];
  const recentPosts = mockPosts.slice(1, 4);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="sr-only">NabızKıbrıs - Haberin Nabzı</h1>
          
          {/* Featured Post */}
          <NewsCard post={featuredPost} featured />
        </div>

        {/* Recent News Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recentPosts.map((post) => (
            <NewsCard key={post.id} post={post} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
