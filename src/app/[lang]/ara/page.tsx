'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, Suspense } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, Calendar, Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  category: string;
  date: string;
  image: string;
  readTime: string;
}

interface SearchFilters {
  category?: string;
  dateRange?: 'all' | 'today' | 'week' | 'month';
  sortBy?: 'relevance' | 'date' | 'views';
}

const mockResults: SearchResult[] = [
  {
    id: '1',
    title: 'KKTC ekonomisinde yeni dönem başlıyor',
    excerpt: 'Hükümet tarafından açıklanan yeni ekonomik paket merakla bekleniyor. İşte detaylar...',
    slug: 'kkte-ekonomisinde-yeni-donem',
    category: 'Ekonomi',
    date: '15 Şub 2024',
    image: 'https://picsum.photos/400/250?random=1',
    readTime: '5 dk',
  },
  {
    id: '2',
    title: 'Girne\'de turizm sezonu açıldı',
    excerpt: 'Marina\'da düzenlenen törenle sezon resmi olarak başladı. Tüm hazırlıklar tamamlandı...',
    slug: 'girne-turizm-sezonu',
    category: 'Turizm',
    date: '14 Şub 2024',
    image: 'https://picsum.photos/400/250?random=2',
    readTime: '4 dk',
  },
  {
    id: '3',
    title: 'Milli takım hazırlıklarını tamamladı',
    excerpt: 'Cumartesi günü oynanacak maç öncesinde son antrenman yapıldı. Takım hazır...',
    slug: 'milli-takim-hazirliklari',
    category: 'Spor',
    date: '14 Şub 2024',
    image: 'https://picsum.photos/400/250?random=3',
    readTime: '3 dk',
  },
  {
    id: '4',
    title: 'Eğitimde dijital dönüşüm',
    excerpt: 'Yeni dönemde teknoloji destekli eğitim sistemi hayata geçiyor. Öğrenciler için yeni imkanlar...',
    slug: 'egitimde-dijital-donusum',
    category: 'Eğitim',
    date: '13 Şub 2024',
    image: 'https://picsum.photos/400/250?random=4',
    readTime: '6 dk',
  },
  {
    id: '5',
    title: 'Sağlık alanında önemli adımlar',
    excerpt: 'Bakanlık yeni sağlık politikalarını açıkladı. Vatandaşlar için yeni hizmetler...',
    slug: 'saglik-alaninda-adimlar',
    category: 'Sağlık',
    date: '12 Şub 2024',
    image: 'https://picsum.photos/400/250?random=5',
    readTime: '5 dk',
  },
];

const categories = [
  'Tümü',
  'Politika',
  'Ekonomi',
  'Spor',
  'Dünya',
  'Kültür',
  'Teknoloji',
  'Sağlık',
  'Eğitim',
  'Turizm',
  'Magazin',
];

function SearchContent() {
  const params = useSearchParams();
  const query = params.get('q') || '';
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    category: 'Tümü',
    dateRange: 'all',
    sortBy: 'relevance',
  });
  const [searchInput, setSearchInput] = useState(query);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const filtered = mockResults.filter(r => 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setResults(filtered.length > 0 ? filtered : mockResults);
    setLoading(false);
  };

  return (
    <>
      {/* Filters - Mobile Responsive */}
      <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          {/* Filter Toggle Button (Mobile) */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-between w-full md:hidden px-4 py-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <span className="font-medium text-text-primary dark:text-white">Filtrele</span>
            {showFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {/* Filter Options */}
          <div className={`${showFilters ? 'block' : 'hidden md:block'} mt-4 md:mt-0`}>
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1.5">Kategori</label>
                <select 
                  value={filters.category} 
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              
              {/* Date Filter */}
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1.5">Tarih</label>
                <select 
                  value={filters.dateRange} 
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">Tümü</option>
                  <option value="today">Bugün</option>
                  <option value="week">Bu Hafta</option>
                  <option value="month">Bu Ay</option>
                </select>
              </div>
              
              {/* Sort Filter */}
              <div className="flex-1 min-w-[140px]">
                <label className="block text-xs font-medium text-text-secondary dark:text-gray-400 mb-1.5">Sırala</label>
                <select 
                  value={filters.sortBy} 
                  onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
                  className="w-full px-3 py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-text-primary dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="relevance">İlgili</option>
                  <option value="date">Tarih</option>
                  <option value="views">Okunma</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <main className="container mx-auto px-4 py-6">
        {/* Results Count */}
        <div className="mb-6">
          {query ? (
            <p className="text-text-secondary dark:text-gray-400">
              <span className="font-medium text-text-primary dark:text-white">"{query}"</span> için <span className="font-medium text-text-primary dark:text-white">{results.length}</span> sonuç bulundu
            </p>
          ) : (
            <p className="text-text-secondary dark:text-gray-400">Arama yapın</p>
          )}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-32 h-24 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <article 
                key={result.id} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-200"
              >
                <Link href={`/tr/${result.slug}`} className="flex flex-col sm:flex-row gap-4 p-4">
                  {/* Image */}
                  <div className="relative w-full sm:w-40 h-48 sm:h-32 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={result.image} alt={result.title} fill className="object-cover" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 py-1">
                    {/* Category & Meta */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                        {result.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400">
                        <Calendar className="w-3.5 h-3.5" />
                        {result.date}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400">
                        <Clock className="w-3.5 h-3.5" />
                        {result.readTime}
                      </span>
                    </div>
                    
                    {/* Title */}
                    <h2 className="text-lg font-bold text-text-primary dark:text-white hover:text-primary transition-colors line-clamp-2 mb-2">
                      {result.title}
                    </h2>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-text-secondary dark:text-gray-400 line-clamp-2">
                      {result.excerpt}
                    </p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-xl font-bold text-text-primary dark:text-white mb-2">Sonuç bulunamadı</h2>
            <p className="text-text-secondary dark:text-gray-400">
              "<span className="font-medium">{query}</span>" için sonuç bulunamadı
            </p>
          </div>
        ) : null}
      </main>
    </>
  );
}

export default function SearchPage() {
  const params = useParams();
  const lang = (params?.lang as string) || 'tr';
  const [searchInput, setSearchInput] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/${lang}/ara?q=${encodeURIComponent(searchInput)}`;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Haber ara..."
                className="w-full px-12 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-text-primary dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
              {searchInput && (
                <button 
                  type="button" 
                  onClick={() => setSearchInput('')}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button 
              type="submit" 
              className="px-6 py-3 bg-primary text-white font-medium rounded-xl hover:bg-primary-dark transition-colors"
            >
              Ara
            </button>
            <button 
              type="button" 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3 border rounded-xl transition-colors ${
                showFilters 
                  ? 'bg-primary text-white border-primary' 
                  : 'bg-white dark:bg-gray-800 text-text-secondary dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <Suspense fallback={
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mx-auto" />
            <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-xl" />
          </div>
        </div>
      }>
        <SearchContent />
      </Suspense>
    </div>
  );
}
