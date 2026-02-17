'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Filter, X, Calendar, Clock } from 'lucide-react';

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
    excerpt: 'Hükümet tarafından açıklanan yeni ekonomik paket merakla bekleniyor...',
    slug: 'kkte-ekonomisinde-yeni-donem',
    category: 'Ekonomi',
    date: '2024-02-15',
    image: 'https://picsum.photos/400/250?random=1',
    readTime: '5 dk',
  },
  {
    id: '2',
    title: 'Girne\'de turizm sezonu açıldı',
    excerpt: 'Marina\'da düzenlenen törenle sezon resmi olarak başladı...',
    slug: 'girne-turizm-sezonu',
    category: 'Turizm',
    date: '2024-02-14',
    image: 'https://picsum.photos/400/250?random=2',
    readTime: '4 dk',
  },
  {
    id: '3',
    title: 'Milli takım hazırlıklarını tamamladı',
    excerpt: 'Cumartesi günü oynanacak maç öncesinde son antrenman yapıldı...',
    slug: 'milli-takim-hazirliklari',
    category: 'Spor',
    date: '2024-02-14',
    image: 'https://picsum.photos/400/250?random=3',
    readTime: '3 dk',
  },
  {
    id: '4',
    title: 'Eğitimde dijital dönüşüm',
    excerpt: 'Yeni dönemde teknoloji destekli eğitim sistemi hayata geçiyor...',
    slug: 'egitimde-dijital-donusum',
    category: 'Eğitim',
    date: '2024-02-13',
    image: 'https://picsum.photos/400/250?random=4',
    readTime: '6 dk',
  },
  {
    id: '5',
    title: 'Sağlık alanında önemli adımlar',
    excerpt: 'Bakanlık yeni sağlık politikalarını açıkladı...',
    slug: 'saglik-alaninda-adimlar',
    category: 'Sağlık',
    date: '2024-02-12',
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
      {/* Filters */}
      {showFilters && (
        <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-4">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">Kategori</label>
                <select value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} className="input w-40">
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">Tarih</label>
                <select value={filters.dateRange} onChange={(e) => setFilters({ ...filters, dateRange: e.target.value as any })} className="input w-40">
                  <option value="all">Tümü</option>
                  <option value="today">Bugün</option>
                  <option value="week">Bu Hafta</option>
                  <option value="month">Bu Ay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-text-primary dark:text-white mb-2">Sırala</label>
                <select value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })} className="input w-40">
                  <option value="relevance">İlgili</option>
                  <option value="date">Tarih</option>
                  <option value="views">Okunma</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Results */}
      <main className="container mx-auto px-4 py-8">
        <p className="text-text-secondary dark:text-gray-400 mb-6">
          {query ? <span>"<strong>{query}</strong>" için <strong>{results.length}</strong> sonuç bulundu</span> : <span>Arama yapın</span>}
        </p>

        {loading ? (
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse">
                <div className="flex gap-6">
                  <div className="w-40 h-28 bg-gray-200 dark:bg-gray-700 rounded-lg" />
                  <div className="flex-1 space-y-3">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result) => (
              <article key={result.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                <Link href={`/tr/${result.slug}`} className="flex gap-4">
                  <div className="relative w-40 h-28 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image src={result.image} alt={result.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded">{result.category}</span>
                      <span className="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400"><Calendar className="w-3 h-3" />{result.date}</span>
                      <span className="flex items-center gap-1 text-xs text-text-muted dark:text-gray-400"><Clock className="w-3 h-3" />{result.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold text-text-primary dark:text-white hover:text-primary transition-colors line-clamp-1">{result.title}</h2>
                    <p className="mt-2 text-text-secondary dark:text-gray-400 line-clamp-2">{result.excerpt}</p>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        ) : query ? (
          <div className="text-center py-16">
            <Search className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-2">Sonuç bulunamadı</h2>
            <p className="text-text-secondary dark:text-gray-400">"<strong>{query}</strong>" için sonuç bulunamadı.</p>
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
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Haber ara..."
                className="input pl-12 pr-4 py-3 text-lg w-full"
              />
              {searchInput && (
                <button type="button" onClick={() => setSearchInput('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <button type="submit" className="btn-primary px-6">Ara</button>
            <button type="button" onClick={() => setShowFilters(!showFilters)} className={`btn-outline px-4 ${showFilters ? 'bg-primary text-white' : ''}`}>
              <Filter className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-8">Yükleniyor...</div>}>
        <SearchContent />
      </Suspense>
    </div>
  );
}
