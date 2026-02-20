'use client';

import { useState, useEffect, useCallback } from 'react';
import { Heart, Bookmark, MessageCircle, Share2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { useAuth } from '@/hooks/useAuth';

interface ActionButtonsProps {
  articleId: string;
  articleTitle: string;
  articleSlug: string;
  initialLikes?: number;
  initialViews?: number;
  showShare?: boolean;
  showComments?: boolean;
  onLike?: (id: string) => void;
  onSave?: (id: string) => void;
  onShare?: (id: string, title: string) => void;
}

export default function ActionButtons({
  articleId,
  articleTitle,
  articleSlug,
  initialLikes = 0,
  initialViews = 0,
  showShare = true,
  showComments = true,
  onLike,
  onSave,
  onShare,
}: ActionButtonsProps) {
  const { isAuthenticated, signIn } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [viewsCount, setViewsCount] = useState(initialViews);

  // Load state from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const liked = localStorage.getItem(`nabiz_liked_${articleId}`);
      const saved = localStorage.getItem(`nabiz_saved_${articleId}`);
      
      if (liked) setIsLiked(true);
      if (saved) setIsSaved(true);

      // Increment view count (simulated)
      const views = localStorage.getItem(`nabiz_views_${articleId}`);
      if (!views) {
        setViewsCount(prev => prev + 1);
        localStorage.setItem(`nabiz_views_${articleId}`, 'true');
      }
    }
  }, [articleId]);

  const handleLike = useCallback(() => {
    if (!isAuthenticated) {
      signIn();
      return;
    }

    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikesCount(prev => newLiked ? prev + 1 : prev - 1);

    if (typeof window !== 'undefined') {
      if (newLiked) {
        localStorage.setItem(`nabiz_liked_${articleId}`, 'true');
        toast.success('Beğenildi!');
      } else {
        localStorage.removeItem(`nabiz_liked_${articleId}`);
        toast.success('Beğeni kaldırıldı');
      }
    }

    onLike?.(articleId);
  }, [isAuthenticated, signIn, isLiked, articleId, onLike]);

  const handleSave = useCallback(() => {
    if (!isAuthenticated) {
      signIn();
      return;
    }

    const newSaved = !isSaved;
    setIsSaved(newSaved);

    if (typeof window !== 'undefined') {
      if (newSaved) {
        localStorage.setItem(`nabiz_saved_${articleId}`, 'true');
        toast.success('Haber kaydedildi!');
      } else {
        localStorage.removeItem(`nabiz_saved_${articleId}`);
        toast.success('Kayıt kaldırıldı');
      }
    }

    onSave?.(articleId);
  }, [isAuthenticated, signIn, isSaved, articleId, onSave]);

  const handleShare = useCallback(() => {
    if (typeof window !== 'undefined' && navigator.share) {
      navigator.share({
        title: articleTitle,
        text: articleTitle,
        url: window.location.origin + `/tr/${articleSlug}`,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.origin + `/tr/${articleSlug}`);
      toast.success('Link kopyalandı!');
    }

    onShare?.(articleId, articleTitle);
  }, [articleTitle, articleSlug, articleId, onShare]);

  return (
    <div className="flex items-center justify-between py-4 border-t border-b border-gray-200 dark:border-gray-700 my-6">
      {/* Left side - Actions */}
      <div className="flex items-center gap-2">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
            isLiked
              ? 'bg-red-50 dark:bg-red-900/20 text-red-500'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
          title={isLiked ? 'Beğenildi' : 'Beğen'}
        >
          <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          {likesCount > 0 && <span className="text-sm font-medium">{likesCount}</span>}
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
            isSaved
              ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'
              : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-400'
          }`}
          title={isSaved ? 'Kaydedildi' : 'Kaydet'}
        >
          <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Comments */}
        {showComments && (
          <button
            className="flex items-center gap-2 px-3 py-2 rounded-full
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-600 dark:text-gray-400 transition-colors"
            title="Yorumlar"
          >
            <MessageCircle className="w-5 h-5" />
          </button>
        )}

        {/* Share */}
        {showShare && (
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-3 py-2 rounded-full
                     hover:bg-gray-100 dark:hover:bg-gray-800
                     text-gray-600 dark:text-gray-400 transition-colors"
            title="Paylaş"
          >
            <Share2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Right side - Views */}
      <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
        <Eye className="w-4 h-4" />
        <span className="text-sm">{viewsCount > 0 ? viewsCount.toLocaleString() : 1}</span>
      </div>
    </div>
  );
}
