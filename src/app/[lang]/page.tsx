'use client';

import { useState, useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { NewsCard } from '@/components/news/NewsCard';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { NewsGrid } from '@/components/home/NewsGrid';
import { ExchangeRateWidget, WeatherWidget } from '@/components/widgets/ExchangeRate';
import { WeatherWidget as WeatherWidgetComp } from '@/components/widgets/WeatherWidget';
import { PopularNews } from '@/components/news/PopularNews';
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

// Mock carousel data for hero section
const mockCarouselNews = [
  {
    id: '1',
    title: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler açıklandı',
    excerpt: 'Hükümetten ekonomi canlanması için yeni adımlar. İşte detaylar...',
    image: 'https://picsum.photos/1200/600?random=1',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    category: 'Ekonomi',
    isBreaking: true,
  },
  {
    id: '2',
    title: 'Girne\'de yeni turizm sezonu hazırlıkları başladı',
    excerpt: 'Turizm sezonu öncesi Girne\'de hummalı hazırlıklar sürüyor.',
    image: 'https://picsum.photos/1200/600?random=2',
    slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
    category: 'Turizm',
  },
  {
    id: '3',
    title: 'Yerel seçimler için adaylar belli oldu',
    excerpt: 'Yaklaşan yerel seçimlerde partiler adaylarını açıkladı.',
    image: 'https://picsum.photos/1200/600?random=3',
    slug: 'yerel-secimler-icin-adaylar-belli-oldu',
    category: 'Politika',
  },
  {
    id: '4',
    title: 'Lefkoşa\'da spor tesisleri yenileniyor',
    excerpt: 'Başkentteki spor tesisleri yenilenme sürecine giriyor.',
    image: 'https://picsum.photos/1200/600?random=4',
    slug: 'lefkosada-spor-tesisleri-yenileniyor',
    category: 'Spor',
  },
  {
    id: '5',
    title: 'Teknoloji sektöründe yeni yatırımlar',
    excerpt: 'KKTC\'de teknoloji alanında önemli yatırımlar bekleniyor.',
    image: 'https://picsum.photos/1200/600?random=5',
    slug: 'teknoloji-sektorunde-yeni-yatirimlar',
    category: 'Teknoloji',
  },
];

// Mock grid data for corasel-style 3-column layout
const mockGridNews = [
  {
    id: 'g1',
    title: 'Lefkoşa\'da yeni tramvay hattı planları',
    excerpt: 'Başkentte ulaşım sorununa çözüm olarak yeni tramvay hattı gündemde.',
    image: 'https://picsum.photos/600/400?random=10',
    slug: 'lefkosada-yeni-tramvay-hatti',
    category: 'Ulaşım',
    date: '15 Ocak 2024',
  },
  {
    id: 'g2',
    title: 'Girne Marina\'da sezon hazırlıkları',
    excerpt: 'Yaz sezonu öncesinde Girne Marina\'da bakım ve yenileme çalışmaları başladı.',
    image: 'https://picsum.photos/600/400?random=11',
    slug: 'girne-marina-sezon-hazirliklari',
    category: 'Turizm',
    date: '14 Ocak 2024',
  },
  {
    id: 'g3',
    title: 'Elektrik fiyatlarına yeni düzenleme',
    excerpt: 'KKTC\'de elektrik tarifelerinde önemli değişiklik. İşte yeni fiyatlar.',
    image: 'https://picsum.photos/600/400?random=12',
    slug: 'elektrik-fiyatlarina-yeni-duzenleme',
    category: 'Ekonomi',
    date: '13 Ocak 2024',
  },
];

// Mock popular news for sidebar
const mockPopularNews = [
  {
    id: 'p1',
    title: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler açıklandı',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    image: 'https://picsum.photos/400/300?random=20',
    category: 'Ekonomi',
    views: '125K',
    timeAgo: '2 saat önce',
  },
  {
    id: 'p2',
    title: 'Girne Marina sezonu açıldı',
    slug: 'girne-marina-sezonu-acildi',
    image: 'https://picsum.photos/400/300?random=21',
    category: 'Turizm',
    views: '98K',
    timeAgo: '4 saat önce',
  },
  {
    id: 'p3',
    title: 'Lefkoşa\'da trafik kazası: 3 yaralı',
    slug: 'lefkosada-trafik-kazasi',
    image: 'https://picsum.photos/400/300?random=22',
    category: 'Güncel',
    views: '87K',
    timeAgo: '5 saat önce',
  },
  {
    id: 'p4',
    title: 'Milli takım dostluk maçı hazırlıkları',
    slug: 'milli-takim-dostluk-maci-hazirliklari',
    image: 'https://picsum.photos/400/300?random=23',
    category: 'Spor',
    views: '76K',
    timeAgo: '6 saat önce',
  },
  {
    id: 'p5',
    title: 'Eğitimde yeni dönem: Müfredat güncellendi',
    slug: 'egitimde-yeni-donem-mufredat-guncellendi',
    image: 'https://picsum.photos/400/300?random=24',
    category: 'Eğitim',
    views: '65K',
    timeAgo: '8 saat önce',
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

      {/* Top Bar with Exchange Rate and Weather */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-2">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ExchangeRateWidget />
            <WeatherWidgetComp />
          </div>
        </div>
      </div>

      {/* Hero Section with Carousel */}
      <section className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="sr-only">NabızKıbrıs - Haberin Nabzı</h1>
          
          {/* Hero Carousel */}
          <HeroCarousel news={mockCarouselNews} currentLang={lang} />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Corasel-style 3-Column Grid */}
            <NewsGrid 
              title="Gündem" 
              items={mockGridNews} 
              currentLang={lang}
              viewAllLink={`/${lang}/haberler`}
            />

            {/* Section Title */}
            <div className="flex items-center justify-between mb-6 mt-8">
              <h2 className="text-2xl font-bold text-text-primary dark:text-white">
                Son Haberler
              </h2>
              <Link 
                href={`/${lang}/haberler`}
                className="text-sm text-primary hover:text-primary-dark transition-colors"
              >
                Tümünü Göster →
              </Link>
            </div>

            {/* Recent News Grid */}
            <div className="grid gap-6 sm:grid-cols-2">
              {recentPosts.map((post) => (
                <NewsCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Popular News */}
            <PopularNews 
              title="Popüler Haberler" 
              articles={mockPopularNews}
              currentLang={lang}
              variant="compact"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
