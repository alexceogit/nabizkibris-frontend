'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ArrowLeft, Image as ImageIcon, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

const CATEGORIES = [
  { id: 'politika', label: 'Politika' },
  { id: 'ekonomi', label: 'Ekonomi' },
  { id: 'spor', label: 'Spor' },
  { id: 'kultur', label: 'Kültür' },
  { id: 'teknoloji', label: 'Teknoloji' },
  { id: 'saglik', label: 'Sağlık' },
  { id: 'egitim', label: 'Eğitim' },
  { id: 'turizm', label: 'Turizm' },
];

export default function CreateNewsPage() {
  const router = useRouter();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [category, setCategory] = useState('politika');
  const [imageUrl, setImageUrl] = useState('');
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSignIn = () => {
    window.location.href = '/tr/signin';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast.error('Başlık ve içerik zorunludur!');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage (demo)
    // Use default placeholder if no image, or provided image
    const articleImage = imageUrl 
      ? imageUrl 
      : `https://picsum.photos/800/400?random=${Date.now()}`;
    
    const newArticle = {
      id: Date.now().toString(),
      title,
      content,
      excerpt: excerpt || content.slice(0, 150) + '...',
      category,
      image: showImageUpload ? articleImage : '',  // Empty if no image selected
      author: user?.name || 'Anonim',
      authorImage: user?.image || '',
      date: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    };

    // Save to localStorage
    const existingArticles = JSON.parse(localStorage.getItem('nabiz_user_articles') || '[]');
    localStorage.setItem('nabiz_user_articles', JSON.stringify([newArticle, ...existingArticles]));

    toast.success('Haber başarıyla paylaşıldı!');
    setIsSubmitting(false);
    
    // Redirect to profile
    router.push('/tr/profile');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Send className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Haber Paylaşmak İçin Giriş Yapın
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs">
            Haber paylaşabilmek için hesabınıza giriş yapmanız gerekiyor.
          </p>
          <button
            onClick={handleSignIn}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl
                     hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
          >
            Giriş Yap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-white dark:bg-[#1E293B] border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-500 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Geri</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">Haber Yaz</h1>
          <div className="w-16"></div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Kategori
            </label>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`px-3 py-2 text-xs font-medium rounded-lg transition-all ${
                    category === cat.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Başlık <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Haber başlığını girin..."
              required
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Özet (Opsiyonel)
            </label>
            <input
              type="text"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kısa özet..."
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İçerik <span className="text-red-500">*</span>
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Haber içeriğini yazın..."
              required
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Görsel (Opsiyonel)
            </label>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => { setImageUrl(''); setShowImageUpload(false); }}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  !showImageUpload 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                Görsel Yok
              </button>
              <button
                type="button"
                onClick={() => setShowImageUpload(true)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  showImageUpload 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300'
                }`}
              >
                URL Gir
              </button>
            </div>
            
            {showImageUpload && (
              <>
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://..."
                  />
                  {imageUrl && (
                    <button
                      type="button"
                      onClick={() => setImageUrl('')}
                      className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {imageUrl && (
                  <div className="mt-3 relative rounded-xl overflow-hidden">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 
                       font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 
                       text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all
                       disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Paylaşılıyor...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Paylaş</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
