'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { WP_Post } from '@/types';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

// Mock data for demo
const mockPosts: WP_Post[] = [
  {
    id: 1,
    date: '2024-01-15T10:00:00',
    date_gmt: '2024-01-15T08:00:00Z',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    title: { rendered: 'KKTC\'de ekonomiye yönelik yeni düzenlemeler' },
    excerpt: { rendered: '<p>Economy bakanı açıkladı...</p>' },
    content: { rendered: `
      <p>Kuzey Kıbrıs Türk Cumhuriyeti'nde ekonomi alanında yeni düzenlemeler açıklandı.</p>
      <p>Yeni düzenlemelerle birlikte, küçük ve orta ölçekli işletmelere vergi avantajları sağlanması planlanıyor.</p>
      <h2>Ekonomik İstikrar Paketi</h2>
      <p>Hükümet, ekonomik istikrarı sağlamak amacıyla kapsamlı bir paket hazırladı.</p>
    ` },
    author: 1,
    categories: [1],
    _embedded: {
      author: [{ name: 'Ahmet Yılmaz' }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/1200/800?random=10' }],
      'wp:term': [[{ name: 'Ekonomi', slug: 'ekonomi' }]]
    }
  },
  {
    id: 101,
    date: '2024-01-16T09:00:00',
    slug: 'elektrik-fiyatlarina-zam',
    title: { rendered: 'Elektrik fiyatlarına zam geliyor' },
    excerpt: { rendered: '<p>Elektrik tarifelerinde yeni düzenleme...</p>' },
    content: { rendered: `
      <p>Kuzey Kıbrıs'ta elektrik fiyatlarına zam yapılacağı açıklandı. Kıbrıs Türk Elektrik Kurumu (KTEK) tarafından yapılan açıklamada, enerji maliyetlerindeki artış nedeniyle tarife düzenlemesi yapılacağı belirtildi.</p>
      <p>Yeni tarifelerin yürürlüğe gireceği tarih ve zam oranları önümüzdeki günlerde netleşecek.</p>
      <h2>Zam Oranları</h2>
      <p>Edinilen bilgilere göre, elektriğe yapılacak zam oranı yüzde 15 ile 25 arasında olması bekleniyor.</p>
    ` },
    author: 2,
    categories: [1],
    _embedded: {
      author: [{ name: 'Ayşe Demir' }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/1200/800?random=101' }],
      'wp:term': [[{ name: 'Ekonomi', slug: 'ekonomi' }]]
    }
  },
  {
    id: 2,
    date: '2024-01-15T09:00:00',
    slug: 'girne-marina-sezonu-acildi',
    title: { rendered: 'Girne Marina sezonu açıldı' },
    excerpt: { rendered: '<p>Turizm sezonu öncesi Girne'de hummalı hazırlıklar sürüyor.</p>' },
    content: { rendered: `
      <p>Girne Marina sezonu açıldı. Yat sahipleri ve turistler için hazırlıklar tamamlandı.</p>
      <h2>Sezon Hazırlıkları</h2>
      <p>Marina yönetimi, bu sezon için özel indirimler ve hizmetler sunuyor.</p>
    ` },
    author: 2,
    categories: [2],
    _embedded: {
      author: [{ name: 'Ayşe Demir' }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/1200/800?random=11' }],
      'wp:term': [[{ name: 'Turizm', slug: 'turizm' }]]
    }
  },
  {
    id: 102,
    date: '2024-01-16T08:00:00',
    slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
    title: { rendered: 'Girne\'de yeni turizm sezonu hazırlıkları' },
    excerpt: { rendered: '<p>Girne\'de turizm sezonu için hazırlıklar başladı.</p>' },
    content: { rendered: `
      <p>Girne'de yeni turizm sezonu için hummalı hazırlıklar sürüyor. Marina ve sahil bölgelerinde düzenlemeler yapılıyor.</p>
      <p>Bu sezon için hedeflenen turist sayısı geçen yıla göre yüzde 20 artış gösteriyor.</p>
      <h2>Yatırımlar</h2>
      <p>Turizm altyapısına yapılan yatırımlar, bölgenin cazibesini artırmayı hedefliyor. Yeni otel projeleri ve restorasyon çalışmaları devam ediyor.</p>
      <p>Yerel işletmeler, sezon hazırlıklarını titizlikle sürdürüyor. Restoran ve eğlence mekanları yenileme çalışmalarını tamamladı.</p>
      <h2>Beklentiler</h2>
      <p>Sektör temsilcileri, bu sezonun hem yerli hem de yabancı turistler için bereketli geçmesini bekliyor.</p>
    ` },
    author: 2,
    categories: [2],
    _embedded: {
      author: [{ name: 'Ayşe Demir' }],
      'wp:featuredmedia': [{ source_url: 'https://picsum.photos/1200/800?random=12' }],
      'wp:term': [[{ name: 'Turizm', slug: 'turizm' }]]
    }
  },
];

export default function ArticlePage() {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const lang = params?.lang as string || 'tr';
  const slug = params?.slug as string;
  
  const post = mockPosts.find(p => p.slug === slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--color-background)]">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold mb-4">Haber bulunamadı</h1>
          <Link href={`/${lang}`} className="text-primary hover:underline">
            Ana sayfaya dön
          </Link>
        </div>
      </div>
    );
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
  const author = post._embedded?.author?.[0]?.name;
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <article className="container mx-auto px-4 py-8">
        <Link 
          href={`/${lang}`} 
          className="inline-flex items-center text-[var(--color-text-secondary)] hover:text-primary mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ana Sayfaya Dön
        </Link>

        {category && (
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            {category}
          </span>
        )}

        <h1 
          className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--color-text-primary)]"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-secondary)] mb-8 text-sm">
          {author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        {featuredImage && (
          <div className="mb-8">
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="w-full h-64 sm:h-96 object-cover rounded-xl"
            />
          </div>
        )}

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </article>

      <Footer />

      <style jsx global>{`
        .article-content p {
          color: #000000;
          margin-bottom: 1rem;
          line-height: 1.8;
        }
        .article-content h2 {
          color: #000000;
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
        }
        .article-content h3 {
          color: #000000;
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        .article-content a {
          color: #0066CC;
          text-decoration: underline;
        }
        .article-content ul {
          list-style-type: disc;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .article-content ol {
          list-style-type: decimal;
          margin-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .article-content li {
          color: #000000;
          margin-bottom: 0.5rem;
        }
        .article-content blockquote {
          border-left: 4px solid #0066CC;
          padding-left: 1rem;
          margin: 1rem 0;
          font-style: italic;
          color: #000000;
        }
        .article-content strong {
          color: #000000;
          font-weight: 700;
        }
        .article-content em {
          color: #000000;
          font-style: italic;
        }
        
        /* Dark mode */
        .dark .article-content p,
        .dark .article-content h2,
        .dark .article-content h3,
        .dark .article-content li,
        .dark .article-content strong,
        .dark .article-content em,
        .dark .article-content blockquote {
          color: #000000 !important;
        }
        .dark .article-content a {
          color: #0066CC !important;
        }
      `}</style>
    </div>
  );
}
