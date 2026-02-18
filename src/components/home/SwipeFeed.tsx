'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import { getLangFromUrl } from '@/lib/utils';

interface SwipeNews {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  date: string;
  slug: string;
}

interface SwipeFeedProps {
  news: SwipeNews[];
  lang?: string;
}

export default function SwipeFeed({ news, lang = 'tr' }: SwipeFeedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const currentNews = news[currentIndex];

  // Haptic feedback
  const triggerHaptic = useCallback((light = true) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(light ? 15 : 30);
    }
  }, []);

  const handleSwipeLeft = useCallback(() => {
    triggerHaptic(true);
    setDirection(1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % news.length);
      setDirection(0);
    }, 300);
  }, [news.length, triggerHaptic]);

  const handleSwipeRight = useCallback(() => {
    triggerHaptic(true);
    setDirection(-1);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + news.length) % news.length);
      setDirection(0);
    }, 300);
  }, [news.length, triggerHaptic]);

  const handleBookmark = useCallback(() => {
    triggerHaptic(false);
    setIsSaved(!isSaved);
    
    // Save to localStorage
    const bookmarks = JSON.parse(localStorage.getItem('nabiz_bookmarks') || '[]');
    if (!isSaved) {
      bookmarks.push(currentNews.id);
    } else {
      const index = bookmarks.indexOf(currentNews.id);
      if (index > -1) bookmarks.splice(index, 1);
    }
    localStorage.setItem('nabiz_bookmarks', JSON.stringify(bookmarks));
  }, [currentNews, isSaved, triggerHaptic]);

  const handlers = useSwipeable({
    onSwipeLeft: handleSwipeLeft,
    onSwipeRight: handleSwipeRight,
    preventScrollTouch: true,
    trackTouch: true,
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handleSwipeLeft();
      if (e.key === 'ArrowRight') handleSwipeRight();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSwipeLeft, handleSwipeRight]);

  return (
    <div 
      {...handlers}
      className="h-[calc(100vh-200px)] w-full relative overflow-hidden bg-gradient-to-b from-gray-900 to-black"
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ x: direction > 0 ? 400 : -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -400 : 400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="absolute inset-0"
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <Image
              src={currentNews.image}
              alt={currentNews.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/40" />
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 pb-20">
            {/* Category Badge */}
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white w-fit mb-3"
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)'
              }}
            >
              {currentNews.category}
            </motion.span>

            {/* Title */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight"
            >
              {currentNews.title}
            </motion.h2>

            {/* Excerpt */}
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-sm md:text-base line-clamp-2 mb-4"
            >
              {currentNews.excerpt}
            </motion.p>

            {/* Meta */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 text-gray-400 text-xs"
            >
              <span>{formatDistanceToNow(currentNews.date, lang as any)}</span>
              <span>•</span>
              <span>NabızKıbrıs</span>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute right-4 bottom-32 flex flex-col gap-4"
          >
            <ActionButton
              icon={<Heart className="w-6 h-6" />}
              count={Math.floor(Math.random() * 500) + 50}
              color="text-pink-500"
              onClick={() => triggerHaptic(false)}
            />
            <ActionButton
              icon={<MessageCircle className="w-6 h-6" />}
              count={Math.floor(Math.random() * 100)}
              color="text-blue-500"
              onClick={() => triggerHaptic(false)}
            />
            <ActionButton
              icon={<Share2 className="w-6 h-6" />}
              color="text-green-500"
              onClick={() => triggerHaptic(false)}
            />
            <button
              onClick={handleBookmark}
              className={`p-3 rounded-full transition-all ${
                isSaved 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              <Bookmark className={`w-6 h-6 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </motion.div>

          {/* Navigation Hints */}
          <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start opacity-0 hover:opacity-100 transition-opacity cursor-swipe-left">
            <ArrowLeft className="w-12 h-12 text-white/50 ml-4" />
          </div>
          <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity cursor-swipe-right">
            <ArrowRight className="w-12 h-12 text-white/50 mr-4" />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
        {news.slice(0, 10).map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full transition-all ${
              i === currentIndex 
                ? 'w-6 bg-white' 
                : i < currentIndex 
                  ? 'bg-white/50' 
                  : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Swipe Hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm"
      >
        <ArrowLeft className="w-4 h-4 text-white/70" />
        <span className="text-xs text-white/70">Kaydır</span>
        <ArrowRight className="w-4 h-4 text-white/70" />
      </motion.div>
    </div>
  );
}

function ActionButton({ 
  icon, 
  count, 
  color = 'text-white', 
  onClick 
}: { 
  icon: React.ReactNode; 
  count?: number;
  color?: string;
  onClick?: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors group relative"
    >
      <span className={color}>{icon}</span>
      {count !== undefined && (
        <span className="absolute -bottom-1 -right-1 text-xs text-white bg-black/50 px-1 rounded">
          {count > 1000 ? `${(count/1000).toFixed(1)}K` : count}
        </span>
      )}
    </motion.button>
  );
}
