'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Settings, MapPin, Link as LinkIcon, Calendar, Eye, Heart, Bookmark, Users, MessageCircle, Share2, ArrowLeft, PenLine, MoreHorizontal, Bell, Shield, HelpCircle, LogOut } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import InterestsSelector from './Interests/InterestsSelector';

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
  const { user, isAuthenticated, signIn, updateInterests } = useAuth();
  const router = useRouter();
  
  const handleSignIn = () => {
    window.location.href = '/tr/signin';
  };
  
  const handleInterestsChange = (interests: string[]) => {
    updateInterests(interests);
    toast.success('İlgi alanları güncellendi!');
  };
  const params = useParams();
  const [activeTab, setActiveTab] = useState<'posts' | 'likes' | 'saved'>('posts');
  const [isEditing, setIsEditing] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
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

  // Load user articles from localStorage
  const [userArticles, setUserArticles] = useState<Article[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      const saved = localStorage.getItem('nabiz_user_articles');
      if (saved) {
        setUserArticles(JSON.parse(saved));
      }
    }
  }, [isAuthenticated]);

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

  // Combine demo articles with user's own articles
  const allArticles = [...userArticles, ...articles].slice(0, 10);

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
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-lg mx-auto px-4 py-16">
          <div className="text-center">
            {/* Animated avatar */}
            <div className="relative w-28 h-28 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full animate-pulse"></div>
              <div className="relative w-28 h-28 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-xl">
                <Users className="w-12 h-12 text-white" />
              </div>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Hoş Geldin!
            </h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto leading-relaxed">
              NabızKıbrıs'ın tüm özelliklerini kullanmak için giriş yap.
            </p>
            
            <div className="space-y-3">
              <button
                onClick={handleSignIn}
                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl
                         hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/25"
              >
                Giriş Yap
              </button>
              <button
                onClick={handleSignIn}
                className="w-full py-3.5 px-6 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-semibold rounded-xl
                         border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                Hesap Oluştur
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => router.push('/tr')}
            className="flex items-center gap-2 px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <Link
              href="/tr/haber-yaz"
              className="p-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/25"
            >
              <PenLine className="w-5 h-5" />
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                className="p-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>
              
              {showSettingsMenu && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setShowSettingsMenu(false)} />
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-20">
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Bell className="w-5 h-5" />
                        Bildirimler
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Shield className="w-5 h-5" />
                        Gizlilik
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <HelpCircle className="w-5 h-5" />
                        Yardım
                      </button>
                      <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                      <button 
                        onClick={() => {
                          signIn();
                          setShowSettingsMenu(false);
                        }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-5 h-5" />
                        Çıkış Yap
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 pb-8">
        {/* Cover with pattern */}
        <div className="relative h-40 rounded-3xl overflow-hidden mb-[-60px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800"></div>
          <div className="absolute inset-0 opacity-20" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>

        {/* Profile Card */}
        <div className="relative">
          {/* Avatar */}
          <div className="flex justify-center -mb-16 relative z-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center">
                <img
                  src={user?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`}
                  alt={user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button className="absolute -bottom-1 -right-1 p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-700 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name}</h1>
          <p className="text-gray-500 dark:text-gray-400">@{user?.email?.split('@')[0] || 'kullanici'}</p>
          
          <p className="text-gray-600 dark:text-gray-300 mt-3 max-w-xs mx-auto">
            {editData.bio || 'Kendini tanıt'}
          </p>

          {/* Location & Website */}
          <div className="flex flex-wrap justify-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
            {editData.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {editData.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              Ocak 2024
            </span>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6">
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.posts}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Gönderi</div>
            </div className="text>
            <div-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.followers.toLocaleString()}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Takipçi</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.following}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Takip</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-gray-900 dark:text-white">{stats.likes.toLocaleString()}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Beğeni</div>
            </div>
          </div>

          {/* Interests */}
          <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">İlgi Alanları</h3>
              <InterestsSelector 
                selectedInterests={user?.interests || []} 
                onChange={handleInterestsChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {(user?.interests && user.interests.length > 0) ? (
                user.interests.map((interest: string) => (
                  <span 
                    key={interest}
                    className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-xs font-medium"
                  >
                    {interest}
                  </span>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400 w-full text-center">
                  İlgi alanı seçilmedi
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-white dark:bg-gray-800 rounded-2xl mt-6 p-1 shadow-sm">
          {[
            { key: 'posts', label: 'Gönderiler', icon: Eye },
            { key: 'likes', label: 'Beğeniler', icon: Heart },
            { key: 'saved', label: 'Kaydettiklerim', icon: Bookmark },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-sm transition-all ${
                activeTab === tab.key
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                  : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="mt-4 space-y-3">
          {activeTab === 'posts' && (
            <>
              {allArticles.length > 0 ? (
                allArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/tr/${article.slug}`}
                    className="block bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    {article.image && (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-3">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-400">
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
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <PenLine className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">Henüz gönderi yok</p>
                  <Link
                    href="/tr/haber-yaz"
                    className="inline-block mt-3 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 transition-colors"
                  >
                    İlk Gönderiyi Yaz
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === 'likes' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Heart className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">Henüz beğeni yok</p>
            </div>
          )}

          {activeTab === 'saved' && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Bookmark className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500 dark:text-gray-400">Henüz kaydedilen haber yok</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
