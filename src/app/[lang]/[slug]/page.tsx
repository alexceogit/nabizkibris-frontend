'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/seo/JsonLd';
import { WP_Post } from '@/types';
import { Calendar, Clock, User, ArrowLeft } from 'lucide-react';

// Mock data for demo (same as main page)
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
    content: { rendered: `
      <p>Kuzey Kıbrıs Türk Cumhuriyeti'nde ekonomi alanında yeni düzenlemeler açıklandı. Bakanlık tarafından yapılan açıklamada, vergi reformları ve yatırım teşvikleri konusunda önemli adımlar atılacağı belirtildi.</p>
      <p>Yeni düzenlemelerle birlikte, küçük ve orta ölçekli işletmelere vergi avantajları sağlanması planlanıyor. Ayrıca, yabancı yatırımcılar için cazip teşvik paketleri hazırlandığı ifade edildi.</p>
      <h2>Ekonomik İstikrar Paketi</h2>
      <p>Hükümet, ekonomik istikrarı sağlamak amacıyla kapsamlı bir paket hazırladı. Bu paket, enflasyonla mücadele, istihdam artışı ve sürdürülebilir büyüme hedeflerini kapsıyor.</p>
      <p>Uzmanlar, alınan önlemlerin ekonomide canlanma sağlayacağını öngörüyor. Özellikle turizm ve yükseköğretim sektörlerinde beklenen iyileşme, GSYİH'ya olumlu yansıması bekleniyor.</p>
    `, protected: false },
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
    content: { rendered: `
      <p>Girne, yeni turizm sezonuna hazırlanıyor. Liman şehri olarak bilinen Girne, her yıl binlerce turisti ağırlıyor.</p>
      <p>Bu sezon için yapılan hazırlıklar kapsamında, oteller yenilendi, restoranlar menülerini güncelledi ve tur rehberleri eğitim aldı.</p>
      <h2>Turizmde Yeni Dönem</h2>
      <p>Sektör temsilcileri, bu sezonun geçen yıla göre daha başarılı geçmesini bekliyor. Özellikle İngiltere ve Avrupa pazarlarından artan talep dikkat çekiyor.</p>
    `, protected: false },
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
    content: { rendered: `
      <p>Yaklaşan yerel seçimler için partiler adaylarını açıkladı. Seçimler, tüm KKTC genelinde aynı gün yapılacak.</p>
      <p>Belediye başkanlığı seçimlerinde yarışacak adaylar, seçim çalışmalarına başladı. Seçim kampanyaları, sosyal medya ve mitingler aracılığıyla yürütülecek.</p>
      <h2>Seçimde Kritik Konular</h2>
      <p>Seçmenlerin gündeminde altyapı, çevre ve belediye hizmetleri ön planda. Adaylar, seçim vaatlerinde bu konulara ağırlık verdi.</p>
    `, protected: false },
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
        guid: { rendered: 'https://nabizkibris.com/?attachment=3' },
        slug: 'elections-news',
        type: 'image',
        link: 'https://nabizkibris.com/media/elections.jpg',
        title: { rendered: 'Elections Image' },
        author: 3,
        caption: { rendered: '' },
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
    content: { rendered: `
      <p>Lefkoşa'daki spor tesisleri yenileniyor. Gençlik ve Spor Dairesi, mevcut tesislerin modernizasyonu için kapsamlı bir proje başlattı.</p>
      <p>Yapılacak yatırımlar arasında yeni spor salonları, yüzme havuzları ve atletizm pistleri yer alıyor.</p>
      <h2>Gençlere Yönelik Yatırımlar</h2>
      <p>Proje, özellikle gençlerin spor yapmasını teşvik etmeyi amaçlıyor. Tesislerin tamamlanmasıyla birlikte, spor dalında önemli başarılar bekleniyor.</p>
    `, protected: false },
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

export default function ArticlePage() {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const slug = params?.slug as string;
  
  const post = mockPosts.find(p => p.slug === slug);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
        <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-text-primary mb-4">Haber Bulunamadı</h1>
          <p className="text-text-secondary mb-8">Aradığınız haber mevcut değil veya kaldırılmış olabilir.</p>
          <Link href="/" className="btn-primary">
            Ana Sayfaya Dön
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const featuredImage = post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://picsum.photos/800/400';
  const author = post._embedded?.author?.[0];
  const category = post._embedded?.['wp:term']?.[0]?.[0];

  // Get site URL
  const siteUrl = 'https://nabizkibris.com';

  return (
    <div className="min-h-screen bg-background">
      {/* SEO JSON-LD */}
      <ArticleJsonLd post={post} siteUrl={siteUrl} />
      <BreadcrumbJsonLd 
        items={[
          { name: 'Ana Sayfa', url: siteUrl },
          { name: 'Haberler', url: siteUrl + '/' + lang + '/haberler' },
          { name: post.title.rendered.replace(/<[^>]*>/g, ''), url: siteUrl + '/' + post.slug },
        ]}
      />

      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Article Header */}
      <article className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link 
          href="/" 
          className="inline-flex items-center text-text-secondary hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Ana Sayfaya Dön
        </Link>

        {/* Category Badge */}
        {category && (
          <Link 
            href={`/kategori/${category.slug}`}
            className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4 hover:bg-primary/20 transition-colors"
          >
            {category.name}
          </Link>
        )}

        {/* Title */}
        <h1 
          className="text-3xl sm:text-4xl font-bold text-text-primary mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-text-secondary mb-8 text-sm">
          {/* Author */}
          {author && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{author.name}</span>
            </div>
          )}
          
          {/* Date */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          
          {/* Read Time */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{calculateReadTime(post.content.rendered)} dk okuma</span>
          </div>
        </div>

        {/* Featured Image */}
        {featuredImage && (
          <div className="mb-8">
            <img
              src={featuredImage}
              alt={post.title.rendered}
              className="w-full h-64 sm:h-96 object-cover rounded-xl"
            />
          </div>
        )}

        {/* Content - Fixed for dark mode */}
        <div className="article-content text-lg leading-relaxed space-y-4">
          <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Etiketler</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tagId => (
                <span 
                  key={tagId}
                  className="bg-gray-100 text-text-secondary px-3 py-1 rounded-full text-sm dark:bg-gray-800"
                >
                  Tag {tagId}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      <Footer />
    </div>
  );
}
