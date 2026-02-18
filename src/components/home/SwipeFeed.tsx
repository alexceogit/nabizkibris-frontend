'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
import { Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from '@/lib/utils';
import ShareLoginModal from '@/components/ui/ShareLoginModal';

interface SwipeNews {
  id: string | number;
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
  const [showShareModal, setShowShareModal] = useState(false);

  const currentNews = news[currentIndex];

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
    onSwipedLeft: handleSwipeLeft,
    onSwipedRight: handleSwipeRight,
  });

  return (
    <div 
      {...handlers}
      className="h-[400px] w-full relative overflow-hidden bg-gradient-to-b from-gray-900 to-black rounded-2xl"
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

          <div className="absolute inset-0 flex flex-col justify-end p-4 pb-24">
            <motion.span
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold text-white w-fit mb-2"
              style={{ background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)' }}
            >
              {currentNews.category}
            </motion.span>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight"
            >
              {currentNews.title}
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 text-sm line-clamp-2 mb-2"
            >
              {currentNews.excerpt}
            </motion.p>

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

          {/* Action Buttons - Small & Vertical */}
          <motion.div
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute right-3 bottom-20 flex flex-col gap-3"
          >
            <ActionButton
              icon={<Heart className="w-4 h-4" />}
              count={Math.floor(Math.random() * 500) + 50}
              color="text-pink-500"
              onClick={() => triggerHaptic(false)}
            />
            <ActionButton
              icon={<MessageCircle className="w-4 h-4" />}
              count={Math.floor(Math.random() * 100)}
              color="text-blue-500"
              onClick={() => triggerHaptic(false)}
            />
            <ActionButton
              icon={<Share2 className="w-4 h-4" />}
              color="text-green-500"
              onClick={() => setShowShareModal(true)}
            />
            <button
              onClick={handleBookmark}
              className={`p-1.5 rounded-full transition-all ${
                isSaved 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </motion.div>

          {/* Login Modal */}
          <ShareLoginModal isOpen={showShareModal} onClose={() => setShowShareModal(false)} />
        </motion.div>
      </AnimatePresence>

      {/* Progress Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {news.slice(0, 10).map((_, i) => (
          <div
            key={i}
            className={`w-1.5 h-1.5 rounded-full transition-all ${
              i === currentIndex 
                ? 'w-6 bg-white' 
                : i < currentIndex 
                  ? 'bg-white/50' 
                  : 'bg-white/30'
            }`}
          />
        ))}
      </div>
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
      className="p-1.5 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors relative"
    >
      <span className={color}>{icon}</span>
      {count !== undefined && (
        <span className="absolute -bottom-1 -right-1 text-[10px] text-white bg-black/50 px-1 rounded">
          {count > 1000 ? `${(count/1000).toFixed(1)}K` : count}
        </span>
      )}
    </motion.button>
  );
}
