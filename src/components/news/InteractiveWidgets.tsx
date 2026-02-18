'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, TrendingUp, Clock } from 'lucide-react';

interface TrendingTag {
  id: string;
  name: string;
  count: number;
  trend: 'up' | 'down' | 'same';
}

const MOCK_TRENDING_TAGS: TrendingTag[] = [
  { id: '1', name: '#KKTC', count: 1250, trend: 'up' },
  { id: '2', name: '#Seçim2026', count: 980, trend: 'up' },
  { id: '3', name: '#Ekonomi', count: 756, trend: 'same' },
  { id: '4', name: '#Eğitim', count: 621, trend: 'up' },
  { id: '5', name: '#Turizm', count: 534, trend: 'down' },
  { id: '6', name: '#Girne', count: 412, trend: 'up' },
  { id: '7', name: '#Mağusa', count: 389, trend: 'same' },
  { id: '8', name: '#Lefkoşa', count: 345, trend: 'up' },
];

interface QuickReactionsProps {
  newsId: string;
}

const REACTIONS = [
  { emoji: '🔥', label: 'Hot', countKey: 'hot', color: 'from-orange-500 to-red-500' },
  { emoji: '💩', label: 'Wow', countKey: 'wow', color: 'from-green-400 to-green-600' },
  { emoji: '🤔', label: 'Hmm', countKey: 'hmm', color: 'from-yellow-400 to-orange-400' },
  { emoji: '😢', label: 'Sad', countKey: 'sad', color: 'from-blue-400 to-blue-600' },
  { emoji: '😂', label: 'LMAO', countKey: 'lmao', color: 'from-purple-400 to-pink-500' },
];

export default function QuickReactions({ newsId }: QuickReactionsProps) {
  const [counts, setCounts] = useState<Record<string, number>>(() => {
    const saved = localStorage.getItem(`reactions_${newsId}`);
    return saved ? JSON.parse(saved) : {};
  });
  const [userReaction, setUserReaction] = useState<string | null>(() => {
    return localStorage.getItem(`userReaction_${newsId}`);
  });

  const triggerHaptic = (pattern = 20) => {
    if (typeof window !== 'undefined' && navigator.vibrate) {
      navigator.vibrate(pattern);
    }
  };

  const handleReaction = (reaction: typeof REACTIONS[0]) => {
    triggerHaptic(30);
    
    setCounts(prev => {
      const newCounts = { ...prev };
      
      // Remove previous reaction if exists
      if (userReaction) {
        newCounts[userReaction] = Math.max(0, (newCounts[userReaction] || 0) - 1);
      }
      
      // Add new reaction
      newCounts[reaction.countKey] = (newCounts[reaction.countKey] || 0) + 1;
      
      localStorage.setItem(`reactions_${newsId}`, JSON.stringify(newCounts));
      return newCounts;
    });
    
    setUserReaction(reaction.countKey);
    localStorage.setItem(`userReaction_${newsId}`, reaction.countKey);
    
    // Show animation
    showReactionAnimation(reaction.emoji);
  };

  const showReactionAnimation = (emoji: string) => {
    const el = document.createElement('div');
    el.textContent = emoji;
    el.style.cssText = `
      position: fixed;
      font-size: 48px;
      pointer-events: none;
      z-index: 9999;
      animation: floatUp 1s ease-out forwards;
    `;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-center gap-6">
        {REACTIONS.map((reaction) => {
          const count = counts[reaction.countKey] || 0;
          const isSelected = userReaction === reaction.countKey;
          
          return (
            <motion.button
              key={reaction.emoji}
              whileTap={{ scale: 1.3 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => handleReaction(reaction)}
              className={`relative flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                isSelected 
                  ? 'bg-white/20 backdrop-blur-sm' 
                  : 'hover:bg-white/10'
              }`}
            >
              <div 
                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                  isSelected 
                    ? `bg-gradient-to-br ${reaction.color}` 
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                {reaction.emoji}
              </div>
              <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                {count > 0 ? (count > 100 ? `${(count/100).toFixed(1)}K` : count) : reaction.label}
              </span>
              
              {/* Animated background ring */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 0.5, repeat: 0 }}
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${reaction.color} blur-md`}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
      
      {/* CSS for floating animation */}
      <style jsx global>{`
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(-100px) scale(1.5); opacity: 0; }
        }
      `}</style>
    </div>
  );
}

export function TrendingTags() {
  const [tags] = useState<TrendingTag[]>(MOCK_TRENDING_TAGS);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 500);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 mb-3">
        <TrendingUp className="w-5 h-5 text-red-500" />
        <h3 className="font-semibold text-gray-900 dark:text-white">Trending</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.a
            key={tag.id}
            href={`/ara?q=${tag.name.replace('#', '')}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 hover:from-red-100 hover:to-orange-100 dark:hover:from-red-900/30 dark:hover:to-orange-900/30 transition-colors"
          >
            <span className="text-blue-600 dark:text-blue-400">{tag.name}</span>
            <span className="text-xs text-gray-500">{tag.count > 1000 ? `${(tag.count/1000).toFixed(1)}K` : tag.count}</span>
            {tag.trend === 'up' && (
              <TrendingUp className="w-3 h-3 text-green-500" />
            )}
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50"
      style={{ width: `${progress}%` }}
      animate={{ opacity: progress > 0 ? 1 : 0 }}
    />
  );
}
