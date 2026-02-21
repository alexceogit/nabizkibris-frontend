'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Settings, MapPin, Link as LinkIcon, Calendar, Eye, Heart, Bookmark, Users, MessageCircle, Share2 } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  views: number;
  likes: number;
  slug: string;
}

export default function UserProfile() {
  const { user, isAuthenticated, signIn } = useAuth();
  
  const handleSignIn = () => {
    window.location.href = '/tr/signin';
  };
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    bio: '',
    location: '',
    website: '',
  });

  // Demo data - replace with real data from backend
  const stats = {
    posts: 156,
    followers: 1234,
    following: 89,
    likes: 4521,
  };

  const articles: Article[] = [
    {
      id: '1',
      title: 'KKTC de yeni ekonomik düzenleme açıklandı',
      excerpt: 'Hükümetten kritik adım...',
      image: 'https://picsum.photos/400/300?random=1',
      date: '2024-01-15',
      views: 1250,
      likes: 89,
      slug: 'kkte-de-ekonomiye-yonelik-yeni-duzenlemeler',
    },
    {
      id: '2',
      title: 'Girne Marina sezonu açıldı',
      excerpt: 'Turizm sezonu öncesi hazırlıklar tamamlandı...',
      image: 'https://picsum.photos/400/300?random=2',
      date: '2024-01-14',
      views: 890,
      likes: 56,
      slug: 'girne-marina-sezonu-acildi',
    },
    {
      id: '3',
      title: 'Eğitimde yeni dönem başlıyor',
      excerpt: 'Müfredat güncellendi...',
      image: 'https://picsum.photos/400/300?random=3',
      date: '2024-01-13',
      views: 2100,
      likes: 145,
      slug: 'egitimde-yeni-donem-mufredat-guncellendi',
    },
  ];

  useEffect(() => {
    if (user) {
      setEditData({
        bio: 'Teknoloji ve haber meraklısı | KKTC',
        location: 'Girne, KKTC',
        website: 'nabizkibris.com',
      });
    }
  }, [user]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Profilinizi Görüntüleyin
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xs sm:max-w-md">
            Kişiselleştirilmiş haber akışı, kaydettikleriniz ve takip ettikleriniz için giriş yapın.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={handleSignIn}
              className="px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl
                       hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
            >
              Giriş Yap
            </button>
            <button
              onClick={handleSignIn}
              className="px-6 sm:px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-xl
                       hover:border-blue-500 hover:text-blue-500 transition-all duration-300"
            >
              Kayıt Ol
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-background)]">
      {/* Cover Image - Smaller on mobile */}
      <div className="h-32 sm:h-48 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500"></div>

      {/* Profile Info */}
      <div className="px-3 sm:px-6 lg:px-8 -mt-16 sm:-mt-20 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl p-4 sm:p-8">
            {/* Header - Mobile optimized */}
            <div className="flex flex-col">
              {/* Avatar - Centered on mobile */}
              <div className="flex justify-center sm:justify-start relative mb-4 sm:mb-0">
                <div className="relative">
                  <img
                    src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                    alt={user?.name}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-white dark:border-[#1E293B] shadow-lg"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg
                                   hover:bg-blue-600 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Edit Button - Below avatar on mobile, right side on desktop */}
              <div className="flex justify-center sm:justify-end mt-3 sm:mt-0 sm:absolute sm:right-8">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm"
                >
                  <Settings className="w-4 h-4" />
                  <span className="font-medium">Düzenle</span>
                </button>
              </div>
            </div>

            {/* User Info - Centered on mobile */}
            <div className="text-center sm:text-left mt-4">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
              <p className="text-gray-500 dark:text-gray-400">@{user?.email?.split('@')[0] || 'kullanici'}</p>
            </div>

            {/* Bio - Edit mode */}
            {isEditing ? (
              <div className="space-y-3 mt-4">
                <textarea
                  value={editData.bio}
                  onChange={(e) => setEditData({ ...editData, bio: e.target.value })}
                  className="w-full p-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg
                           bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                  rows={2}
                  placeholder="Kendinizi tanıtın..."
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={editData.location}
                    onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                    className="flex-1 p-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Konum"
                  />
                  <input
                    type="text"
                    value={editData.website}
                    onChange={(e) => setEditData({ ...editData, website: e.target.value })}
                    className="flex-1 p-2.5 text-sm border border-gray-300 dark:border-gray-600 rounded-lg
                             bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white"
                    placeholder="Web sitesi"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsEditing(false);
                      toast.success('Profil güncellendi!');
                    }}
                    className="flex-1 sm:flex-none px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                  >
                    Kaydet
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 sm:flex-none px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
                  >
                    İptal
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm sm:text-base">
                  {editData.bio || 'Kendinizi tanıtın...'}
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mt-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {editData.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
                      {editData.location}
                    </span>
                  )}
                  {editData.website && (
                    <span className="flex items-center gap-1">
                      <LinkIcon className="w-3 sm:w-4 h-3 sm:h-4" />
                      <a href={editData.website} className="text-blue-500 hover:underline">
                        {editData.website}
                      </a>
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 sm:w-4 h-3 sm:h-4" />
                    Ocak 2024
                  </span>
                </div>
              </>
            )}

            {/* Stats - Better mobile layout */}
            <div className="flex justify-around sm:justify-start sm:gap-8 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.posts}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Gönderi</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.followers.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Takipçi</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.following}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Takip</div>
              </div>
              <div className="text-center">
                <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">{stats.likes.toLocaleString()}</div>
                <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Beğeni</div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mt-4 bg-white dark:bg-[#1E293B] rounded-t-2xl">
            {[
              { key: 'posts', label: 'Gönderiler', icon: Eye },
              { key: 'likes', label: 'Beğeniler', icon: Heart },
              { key: 'saved', label: 'Kaydettiklerim', icon: Bookmark },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-6 py-3 sm:py-4 border-b-2 font-medium text-xs sm:text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="hidden xs:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white dark:bg-[#1E293B] rounded-b-2xl p-3 sm:p-4">
            {activeTab === 'posts' && (
              <div className="grid gap-3 sm:gap-4">
                {articles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/tr/${article.slug}`}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          {article.views.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" />
                          {article.likes}
                        </span>
                        <span>{article.date}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {activeTab === 'likes' && (
              <div className="text-center py-8 sm:py-12">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Henüz beğeni yok</p>
              </div>
            )}

            {activeTab === 'saved' && (
              <div className="text-center py-8 sm:py-12">
                <Bookmark className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">Henüz kaydedilen haber yok</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
