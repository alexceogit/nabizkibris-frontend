'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { NewsCard } from '@/components/news/NewsCard';
import { WP_Post } from '@/types';
import { SUPPORTED_LANGUAGES } from '@/lib/constants';

// Mock data for demo
const mockPosts: WP_Post[] = [
  {
    id: 1,
    date: '2024-01-15T10:00:00',
    date_gmt: '2024-01-15T08:00:00Z',
    guid: { rendered: 'https://nabizkibris.com/?p=1' },
    modified: '2024-01-15T10:00:00',
    modified_gmt: '2024-01-15T08:00:00Z',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    status: 'publish',
    type: 'post',
    link: 'https://nabizkibris.com/kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    title: { rendered: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler' },
    excerpt: { rendered: '<p>Economy bakanı açıkladı...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    author: 1,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {},
    categories: [1],
    tags: [],
    _embedded: {
      author: [{ 
        id: 1, 
        name: 'Ahmet Yılmaz', 
        url: '',
        description: '',
        link: 'https://nabizkibris.com/author/ahmet',
        slug: 'ahmet-yilmaz',
        avatar_urls: { '96': 'https://example.com/avatar1.jpg' }
      }],
      'wp:featuredmedia': [{ 
        id: 1, 
        date: '2024-01-15T10:00:00',
        slug: 'economy-reforms',
        type: 'image',
        link: 'https://nabizkibris.com/media/economy.jpg',
        title: { rendered: 'Economy Image' },
        author: 1,
        caption: { rendered: '' },
        alt_text: 'Economy reforms',
        media_type: 'image',
        mime_type: 'image/jpeg',
        media_details: { width: 800, height: 600, file: 'economy.jpg', sizes: {} },
        source_url: 'https://picsum.photos/800/600'
      }],
      'wp:term': [[{ 
        id: 1, 
        count: 5, 
        description: '', 
        link: 'https://nabizkibris.com/category/politika', 
        name: 'Politika', 
        slug: 'politika', 
        taxonomy: 'category' 
      }]]
    }
  },
  {
    id: 2,
    date: '2024-01-15T09:00:00',
    date_gmt: '2024-01-15T07:00:00Z',
    guid: { rendered: 'https://nabizkibris.com/?p=2' },
    modified: '2024-01-15T09:00:00',
    modified_gmt: '2024-01-15T07:00:00Z',
    slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
    status: 'publish',
    type: 'post',
    link: 'https://nabizkibris.com/girne-de-yeni-turizm-sezonu-hazirliklari',
    title: { rendered: 'Girne\'de yeni turizm sezonu hazırlıkları' },
    excerpt: { rendered: '<p>Turizm sezonu yaklaşıyor...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    author: 2,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {},
    categories: [2],
    tags: [],
    _embedded: {
      author: [{ 
        id: 2, 
        name: 'Ayşe Demir', 
        url: '',
        description: '',
        link: 'https://nabizkibris.com/author/ayse',
        slug: 'ayse-demir',
        avatar_urls: { '96': 'https://example.com/avatar2.jpg' }
      }],
      'wp:featuredmedia': [{ 
        id: 2, 
        date: '2024-01-15T09:00:00',
        slug: 'tourism-prep',
        type: 'image',
        link: 'https://nabizkibris.com/media/tourism.jpg',
        title: { rendered: 'Tourism Image' },
        author: 2,
        caption: { rendered: '' },
        alt_text: 'Tourism preparations',
        media_type: 'image',
        mime_type: 'image/jpeg',
        media_details: { width: 800, height: 600, file: 'tourism.jpg', sizes: {} },
        source_url: 'https://picsum.photos/800/600?random=2'
      }],
      'wp:term': [[{ 
        id: 2, 
        count: 3, 
        description: '', 
        link: 'https://nabizkibris.com/category/turizm', 
        name: 'Turizm', 
        slug: 'turizm', 
        taxonomy: 'category' 
      }]]
    }
  },
  {
    id: 3,
    date: '2024-01-15T08:00:00',
    date_gmt: '2024-01-15T06:00:00Z',
    guid: { rendered: 'https://nabizkibris.com/?p=3' },
    modified: '2024-01-15T08:00:00',
    modified_gmt: '2024-01-15T06:00:00Z',
    slug: 'yerel-secimler-icin-adaylar-belli-oldu',
    status: 'publish',
    type: 'post',
    link: 'https://nabizkibris.com/yerel-secimler-icin-adaylar-belli-oldu',
    title: { rendered: 'Yerel seçimler için adaylar belli oldu' },
    excerpt: { rendered: '<p>Seçim yaklaşıyor...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    author: 3,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {},
    categories: [1],
    tags: [],
    _embedded: {
      author: [{ 
        id: 3, 
        name: 'Mehmet Kaya', 
        url: '',
        description: '',
        link: 'https://nabizkibris.com/author/mehmet',
        slug: 'mehmet-kaya',
        avatar_urls: { '96': 'https://example.com/avatar3.jpg' }
      }],
      'wp:featuredmedia': [{ 
        id: 3, 
        date: '2024-01-15T08:00:00',
        guid: { rendered: 'https://nabizkibris.com/?p=3' },
        slug: 'elections-news',
        type: 'image',
        link: 'https://nabizkibris.com/media/elections.jpg',
        title: { rendered: 'Elections Image' },
        author: 3,
        caption: { rendered: 'Elections news' },
        alt_text: 'Elections news',
        media_type: 'image',
        mime_type: 'image/jpeg',
        media_details: { width: 800, height: 600, file: 'elections.jpg', sizes: {} },
        source_url: 'https://picsum.photos/800/600?random=3'
      }],
      'wp:term': [[{ 
        id: 1, 
        count: 10, 
        description: '', 
        link: 'https://nabizkibris.com/category/politika', 
        name: 'Politika', 
        slug: 'politika', 
        taxonomy: 'category' 
      }]]
    }
  },
  {
    id: 4,
    date: '2024-01-14T15:00:00',
    date_gmt: '2024-01-14T13:00:00Z',
    guid: { rendered: 'https://nabizkibris.com/?p=4' },
    modified: '2024-01-14T15:00:00',
    modified_gmt: '2024-01-14T13:00:00Z',
    slug: 'lefkosada-spor-tesisleri-yenileniyor',
    status: 'publish',
    type: 'post',
    link: 'https://nabizkibris.com/lefkosada-spor-tesisleri-yenileniyor',
    title: { rendered: 'Lefkoşa\'da spor tesisleri yenileniyor' },
    excerpt: { rendered: '<p>Yatırım yapılıyor...</p>', protected: false },
    content: { rendered: '<p>Content...</p>', protected: false },
    author: 4,
    featured_media: 0,
    comment_status: 'open',
    ping_status: 'closed',
    sticky: false,
    template: '',
    format: 'standard',
    meta: {},
    categories: [3],
    tags: [],
    _embedded: {
      author: [{ 
        id: 4, 
        name: 'Ali Vural', 
        url: '',
        description: '',
        link: 'https://nabizkibris.com/author/ali',
        slug: 'ali-vural',
        avatar_urls: { '96': 'https://example.com/avatar4.jpg' }
      }],
      'wp:featuredmedia': [{ 
        id: 4, 
        date: '2024-01-14T15:00:00',
        slug: 'sports-facilities',
        type: 'image',
        link: 'https://nabizkibris.com/media/sports.jpg',
        title: { rendered: 'Sports Facilities Image' },
        author: 4,
        caption: { rendered: '' },
        alt_text: 'Sports facilities renovation',
        media_type: 'image',
        mime_type: 'image/jpeg',
        media_details: { width: 800, height: 600, file: 'sports.jpg', sizes: {} },
        source_url: 'https://picsum.photos/800/600?random=4'
      }],
      'wp:term': [[{ 
        id: 3, 
        count: 8, 
        description: '', 
        link: 'https://nabizkibris.com/category/spor', 
        name: 'Spor', 
        slug: 'spor', 
        taxonomy: 'category' 
      }]]
    }
  },
];

export default function HomePage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Get current language from URL params
  const lang = (params?.lang as string) || 'tr';
  
  // Debug: Log when language changes
  useEffect(() => {
    console.log('Language changed to:', lang, 'Path:', pathname);
  }, [lang, pathname]);
  
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
