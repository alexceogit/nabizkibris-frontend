import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Bookmark, BookmarkCheck, Download, WifiOff, Trash2 } from 'lucide-react';

interface OfflineNews {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  savedAt: number;
  readTime: number;
}

interface UseOfflineNewsReturn {
  isOffline: boolean;
  savedNews: OfflineNews[];
  saveForOffline: (news: any) => void;
  removeFromOffline: (id: string) => void;
  clearAll: () => void;
  isSaved: (id: string) => boolean;
}

export function useOfflineNews(): UseOfflineNewsReturn {
  const [isOffline, setIsOffline] = useState(false);
  const [savedNews, setSavedNews] = useState<OfflineNews[]>([]);

  // Load saved news on mount
  useEffect(() => {
    const saved = localStorage.getItem('nabiz_offline_news');
    if (saved) {
      try {
        setSavedNews(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse offline news:', e);
      }
    }

    // Online/Offline detection
    const handleOnline = () => {
      setIsOffline(false);
      // Show "You're back online" toast
      showToast('İnternet bağlantısı恢复 edildi', 'success');
    };
    const handleOffline = () => {
      setIsOffline(true);
      showToast('İnternet bağlantısı kesildi - Çevrimdışı mod aktif', 'warning');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    setIsOffline(!navigator.onLine);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const saveForOffline = useCallback((news: any) => {
    const offlineNews: OfflineNews = {
      id: news.id?.toString() || news.slug,
      title: news.title?.rendered || news.title,
      excerpt: news.excerpt?.rendered || news.excerpt,
      image: news._embedded?.['wp:featuredmedia']?.[0]?.source_url || news.image,
      category: news._embedded?.['wp:term']?.[0]?.[0]?.name || news.category || 'Haber',
      savedAt: Date.now(),
      readTime: calculateReadTime(news.content?.rendered || news.excerpt?.rendered || '')
    };

    const updated = [offlineNews, ...savedNews].slice(0, 50); // Max 50 news
    setSavedNews(updated);
    localStorage.setItem('nabiz_offline_news', JSON.stringify(updated));

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(20);

    showToast('Haber çevrimdışı için kaydedildi ✓', 'success');
  }, [savedNews]);

  const removeFromOffline = useCallback((id: string) => {
    const updated = savedNews.filter((news) => news.id !== id);
    setSavedNews(updated);
    localStorage.setItem('nabiz_offline_news', JSON.stringify(updated));

    if (navigator.vibrate) navigator.vibrate(15);
    showToast('Haber çevrimdışı listesinden kaldırıldı', 'info');
  }, [savedNews]);

  const clearAll = useCallback(() => {
    if (confirm('Tüm çevrimdışı haberleri silmek istiyor musun?')) {
      setSavedNews([]);
      localStorage.removeItem('nabiz_offline_news');
      if (navigator.vibrate) navigator.vibrate([30, 30, 30]);
      showToast('Tüm çevrimdışı haberler silindi', 'info');
    }
  }, []);

  const isSaved = useCallback((id: string) => {
    return savedNews.some((news) => news.id === id);
  }, [savedNews]);

  return {
    isOffline,
    savedNews,
    saveForOffline,
    removeFromOffline,
    clearAll,
    isSaved
  };
}

function calculateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute));
}

function showToast(message: string, type: 'success' | 'warning' | 'info') {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = `
    fixed bottom-24 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full shadow-lg z-50
    flex items-center gap-2 text-sm font-medium animate-fade-in-up
    ${type === 'success' ? 'bg-green-500 text-white' : ''}
    ${type === 'warning' ? 'bg-yellow-500 text-black' : ''}
    ${type === 'info' ? 'bg-blue-500 text-white' : ''}
  `;
  toast.innerHTML = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(20px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Offline Mode Banner Component
export function OfflineBanner({ isOffline }: { isOffline: boolean }) {
  if (!isOffline) return null;

  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-3 flex items-center justify-center gap-2"
    >
      <WifiOff className="w-5 h-5" />
      <span className="text-sm font-medium">Çevrimdışı Mod Aktif</span>
      <span className="text-xs opacity-80">| Kaydedilmiş haberleri okuyabilirsiniz</span>
    </motion.div>
  );
}

// Bookmark Button Component
export function BookmarkButton({ 
  newsId, 
  onToggle 
}: { 
  newsId: string;
  onToggle?: (saved: boolean) => void;
}) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const bookmarks = JSON.parse(localStorage.getItem('nabiz_bookmarks') || '[]');
    setIsSaved(bookmarks.includes(newsId));
  }, [newsId]);

  const toggle = () => {
    const bookmarks = JSON.parse(localStorage.getItem('nabiz_bookmarks') || '[]');
    
    if (isSaved) {
      const updated = bookmarks.filter((id: string) => id !== newsId);
      localStorage.setItem('nabiz_bookmarks', JSON.stringify(updated));
    } else {
      bookmarks.push(newsId);
      localStorage.setItem('nabiz_bookmarks', JSON.stringify(bookmarks));
    }

    setIsSaved(!isSaved);
    
    // Haptic feedback
    if (navigator.vibrate) {
      navigator.vibrate(isSaved ? 15 : 25);
    }

    showToast(isSaved ? 'Yer işaretleri kaldırıldı' : 'Yer işaretlendi', 'info');
    onToggle?.(!isSaved);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={toggle}
      className={`p-3 rounded-full transition-all ${
        isSaved 
          ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' 
          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
      }`}
      aria-label={isSaved ? 'Yer işaretini kaldır' : 'Yer işaretle'}
    >
      <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
    </motion.button>
  );
}

// Saved News List Component
export function SavedNewsList({ 
  news, 
  onRemove 
}: { 
  news: OfflineNews[];
  onRemove: (id: string) => void;
}) {
  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <Bookmark className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Kaydedilmiş haber yok
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Okumak istediğin haberleri kaydetmek için simgeye dokun
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {news.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          className="flex gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
        >
          {/* Thumbnail */}
          <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100">
            {item.image && (
              <Image 
                src={item.image} 
                alt={item.title}
                fill
                className="object-cover"
                unoptimized={true}
              />
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400">
                {item.category}
              </span>
              <span className="text-xs text-gray-400">•</span>
              <span className="text-xs text-gray-500">{item.readTime} dk okuma</span>
            </div>
            <h4 className="font-semibold text-gray-900 dark:text-white line-clamp-2 mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">
              {item.excerpt.replace(/<[^>]*>/g, '')}
            </p>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(item.id)}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </motion.div>
      ))}
    </div>
  );
}
