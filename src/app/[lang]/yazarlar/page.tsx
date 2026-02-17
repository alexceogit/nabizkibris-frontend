'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/ui/Header';
import { Footer } from '@/components/ui/Footer';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { useState } from 'react';
import { Mail, Eye, Twitter, Facebook } from 'lucide-react';

interface Author {
  id: number;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  articles: number;
  views: string;
  specialties: string[];
}

const mockAuthors: Author[] = [
  {
    id: 1,
    name: 'Ahmet Yılmaz',
    role: 'Kıdemli Gazeteci',
    bio: '20 yılı aşkın gazetecilik deneyimiyle KKTC\'nin önemli konularını kaleme alıyor. Siyaset ve ekonomi alanlarında uzmanlaşmış.',
    avatar: 'https://picsum.photos/200/200?random=1',
    articles: 156,
    views: '2.5M',
    specialties: ['Politika', 'Ekonomi', 'Dış Haberler'],
  },
  {
    id: 2,
    name: 'Ayşe Demir',
    role: 'Köşe Yazarı',
    bio: 'Toplumsal konular ve kadın hakları konularında köşe yazarlığı yapıyor. KKTC\'nin sesi olmaya devam ediyor.',
    avatar: 'https://picsum.photos/200/200?random=2',
    articles: 89,
    views: '1.8M',
    specialties: ['Köşe Yazıları', 'Toplum', 'Kültür'],
  },
  {
    id: 3,
    name: 'Mehmet Kaya',
    role: 'Spor Editörü',
    bio: 'Kıbrıs futbolu ve uluslararası spor haberleri konusunda uzman. Taraftarların güvenilir adresi.',
    avatar: 'https://picsum.photos/200/200?random=3',
    articles: 234,
    views: '3.2M',
    specialties: ['Spor', 'Futbol', 'Transfer'],
  },
  {
    id: 4,
    name: 'Fatma Arslan',
    role: 'Kültür Sanat Editörü',
    bio: 'Kıbrıs\'ın kültürel zenginliklerini dünyaya tanıtıyor. Sanat, müzik ve etkinlik haberleri.',
    avatar: 'https://picsum.photos/200/200?random=4',
    articles: 67,
    views: '890K',
    specialties: ['Kültür', 'Sanat', 'Etkinlikler'],
  },
  {
    id: 5,
    name: 'Ali Özkan',
    role: 'Teknoloji Muhabiri',
    bio: 'Teknoloji dünyasını KKTC\'ye taşıyor. Dijital dönüşüm ve inovasyon haberleri.',
    avatar: 'https://picsum.photos/200/200?random=5',
    articles: 112,
    views: '1.2M',
    specialties: ['Teknoloji', 'Bilim', 'Start-up'],
  },
  {
    id: 6,
    name: 'Elif Çelik',
    role: 'Sağlık Editörü',
    bio: 'Sağlık alanında güncel gelişmeleri takip ediyor. Uzman görüşleri ve sağlık tavsiyeleri.',
    avatar: 'https://picsum.photos/200/200?random=6',
    articles: 78,
    views: '1.5M',
    specialties: ['Sağlık', 'Beslenme', 'Spor'],
  },
];

export default function AuthorsPage() {
  const params = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const lang = (params?.lang as string) || 'tr';
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    tr: {
      title: 'Yazarlarımız',
      subtitle: 'Deneyimli ve yetenekli kadromuz',
      searchPlaceholder: 'Yazar ara...',
      articles: 'Makale',
      views: 'Okunma',
      allArticles: 'Tüm Yazıları',
      follow: 'Takip Et',
    },
    en: {
      title: 'Our Authors',
      subtitle: 'Experienced and talented team',
      searchPlaceholder: 'Search author...',
      articles: 'Articles',
      views: 'Views',
      allArticles: 'All Articles',
      follow: 'Follow',
    },
    el: {
      title: 'Οι Συγγραφείς μας',
      subtitle: 'Έμπειρη και ταλαντούχη ομάδα',
      searchPlaceholder: 'Αναζήτηση συγγραφέα...',
      articles: 'Άρθρα',
      views: 'Προβολές',
      allArticles: 'Όλα τα Άρθρα',
      follow: 'Ακολουθήστε',
    },
  };

  const t = content[lang as keyof typeof content] || content.tr;

  const filteredAuthors = mockAuthors.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setIsMenuOpen(!isMenuOpen)} isMenuOpen={isMenuOpen} />
      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <main className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-text-primary dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-text-secondary dark:text-gray-400">
            {t.subtitle}
          </p>
        </div>

        {/* Search */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="search"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input w-full"
          />
        </div>

        {/* Authors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAuthors.map((author) => (
            <article 
              key={author.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-20 h-20 flex-shrink-0">
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    fill
                    className="object-cover rounded-full"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold text-text-primary dark:text-white">
                    {author.name}
                  </h2>
                  <p className="text-sm text-primary mb-2">
                    {author.role}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-text-muted dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {author.views}
                    </span>
                    <span>{author.articles} {t.articles}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-text-secondary dark:text-gray-400 text-sm line-clamp-3">
                {author.bio}
              </p>

              {/* Specialties */}
              <div className="mt-4 flex flex-wrap gap-2">
                {author.specialties.map((specialty, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs text-text-secondary dark:text-gray-300 rounded-full"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between">
                <Link
                  href={`/${lang}/yazar/${author.id}`}
                  className="text-sm text-primary hover:underline font-medium"
                >
                  {t.allArticles} →
                </Link>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-text-secondary hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <Mail className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                    <Twitter className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredAuthors.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-secondary dark:text-gray-400">
              Yazar bulunamadı.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
