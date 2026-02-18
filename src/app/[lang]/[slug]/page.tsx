'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { Calendar, User, ArrowLeft } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    date: '2024-01-15T10:00:00',
    slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    title: 'KKTC de ekonomiye yonelik yeni duzenlemeler',
    excerpt: 'Economy bakanı acıkladı...',
    content: `
      <p>Kuzey Kibris Turk Cumhuriyeti nde ekonomi alanında yeni duzenlemeler acıklandı.</p>
      <p>Yeni duzenlemelerle birlikte, kucuk ve orta olcekli isletmelere vergi avantajları sağlanması planlanıyor.</p>
      <h2>Ekonomik Istikrar Paketi</h2>
      <p>Hukumet, ekonomik istikrarı saglamak amacıyla kapsamlı bir paket hazırladı.</p>
    `,
    author: 'Ahmet Yilmaz',
    category: 'Ekonomi',
    image: 'https://picsum.photos/1200/800?random=10'
  },
  {
    id: 101,
    date: '2024-01-16T09:00:00',
    slug: 'elektrik-fiyatlarina-zam',
    title: 'Elektrik fiyatlarına zam geliyor',
    excerpt: 'Elektrik tarifelerinde yeni duzenleme...',
    content: `
      <p>Kuzey Kıbrıs ta elektrik fiyatlarına zam yapılacağı acıklandı.</p>
      <p>Yeni tarifelerin yururlugune girecegi tarih ve zam oranları onumuzdeki gunlerde netlesecek.</p>
      <h2>Zam Oranları</h2>
      <p>Edinilen bilgilere gore, elektriye yapılacak zam oranı yuzde 15 ile 25 arasında olması bekleniyor.</p>
    `,
    author: 'Ayse Demir',
    category: 'Ekonomi',
    image: 'https://picsum.photos/1200/800?random=101'
  },
  {
    id: 2,
    date: '2024-01-15T09:00:00',
    slug: 'girne-marina-sezonu-acildi',
    title: 'Girne Marina sezonu acildi',
    excerpt: 'Turizm sezonu oncesi Girne de hummalı hazırlıklar suruyor.',
    content: `
      <p>Girne Marina sezonu acildı. Yat sahipleri ve turistler icin hazırlıklar tamamlandı.</p>
      <h2>Sezon Hazırlıkları</h2>
      <p>Marina yonetimı, bu sezon için ozel indirimler ve hizmetler sunuyor.</p>
    `,
    author: 'Ayse Demir',
    category: 'Turizm',
    image: 'https://picsum.photos/1200/800?random=11'
  },
  {
    id: 102,
    date: '2024-01-16T08:00:00',
    slug: 'girne-de-yeni-turizm-sezonu-hazirliklari',
    title: 'Girne de yeni turizm sezonu hazırlıkları',
    excerpt: 'Girne de turizm sezonu icin hazırlıklar basladı.',
    content: `
      <p>Girne de yeni turizm sezonu icin hummalı hazırlıklar suruyor. Marina ve sahil bolgelerinde duzenlemeler yapılıyor.</p>
      <p>Bu sezon icin hedeflenen turist sayısı gecen yıla gore yuzde 20 artıs gosteriyor.</p>
      <h2>Yatırımlar</h2>
      <p>Turizm altyapısına yapılan yatırımlar, bolgenin cazibesini artırmayı hedefliyor.</p>
      <p>Yerel isletmeler, sezon hazırlıklarını titizlikle surduruyor.</p>
      <h2>Beklentiler</h2>
      <p>Sektor temsilcileri, bu sezonun hem yerli hem de yabancı turistler icin bereketli gecmesini bekliyor.</p>
    `,
    author: 'Ayse Demir',
    category: 'Turizm',
    image: 'https://picsum.photos/1200/800?random=12'
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
            Ana sayfaya don
          </Link>
        </div>
      </div>
    );
  }

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
          Ana Sayfaya Don
        </Link>

        {post.category && (
          <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            {post.category}
          </span>
        )}

        <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-[var(--color-text-primary)]">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-[var(--color-text-secondary)] mb-8 text-sm">
          {post.author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.author}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
        </div>

        {post.image && (
          <div className="mb-8">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 sm:h-96 object-cover rounded-xl"
            />
          </div>
        )}

        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
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
        
        /* Dark mode - WHITE text */
        .dark .article-content p,
        .dark .article-content h2,
        .dark .article-content h3,
        .dark .article-content li,
        .dark .article-content strong,
        .dark .article-content em,
        .dark .article-content blockquote {
          color: #FFFFFF !important;
        }
        .dark .article-content a {
          color: #60A5FA !important;
        }
      `}</style>
    </div>
  );
}
