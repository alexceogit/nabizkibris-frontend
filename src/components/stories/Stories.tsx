'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ChevronLeft, ChevronRight, Plus, Send } from 'lucide-react';
import Image from 'next/image';

interface Story {
  id: string;
  image: string;
  title: string;
  newsId: string;
  createdAt: number;
  views: number;
}

interface StoryViewerProps {
  stories: Story[];
  onClose: () => void;
  onStoryClick?: (story: Story) => void;
}

// Mock data for demo
const MOCK_STORIES: Story[] = [
  {
    id: '1',
    image: 'https://picsum.photos/400/800?random=1',
    title: 'Seçim Haberi',
    newsId: '101',
    createdAt: Date.now() - 3600000,
    views: 1250
  },
  {
    id: '2',
    image: 'https://picsum.photos/400/800?random=2',
    title: 'Ekonomi Raporu',
    newsId: '102',
    createdAt: Date.now() - 7200000,
    views: 890
  },
  {
    id: '3',
    image: 'https://picsum.photos/400/800?random=3',
    title: 'Turizm Sezonu',
    newsId: '103',
    createdAt: Date.now() - 10800000,
    views: 654
  },
  {
    id: '4',
    image: 'https://picsum.photos/400/800?random=4',
    title: 'Spor Gündemi',
    newsId: '104',
    createdAt: Date.now() - 14400000,
    views: 432
  },
];

export default function StoryViewer({ 
  stories = MOCK_STORIES, 
  onClose, 
  onStoryClick 
}: StoryViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const currentStory = stories[currentIndex];
  const totalStories = stories.length;

  // Progress timer
  useEffect(() => {
    if (isPaused) return;

    const duration = 5000; // 5 seconds per story
    const interval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      elapsed += interval;
      setProgress((elapsed / duration) * 100);

      if (elapsed >= duration) {
        if (currentIndex < totalStories - 1) {
          setCurrentIndex(prev => prev + 1);
          setProgress(0);
        } else {
          onClose();
        }
      }
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, totalStories, isPaused, onClose]);

  const goToNext = () => {
    if (currentIndex < totalStories - 1) {
      setCurrentIndex(prev => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setProgress(0);
    }
  };

  const handleStoryPress = (e: React.MouseEvent) => {
    const screenWidth = window.innerWidth;
    const clickX = e.clientX;

    if (clickX < screenWidth / 3) {
      goToPrev();
    } else if (clickX > (screenWidth / 3) * 2) {
      goToNext();
    } else {
      setIsPaused(!isPaused);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black"
    >
      {/* Progress bars */}
      <div className="absolute top-4 left-4 right-4 flex gap-2 z-10">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-1 rounded-full bg-white/30 overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: '0%' }}
              animate={{ 
                width: i < currentIndex 
                  ? '100%' 
                  : i === currentIndex 
                    ? `${progress}%` 
                    : '0%'
              }}
              transition={{ duration: 0.1 }}
            />
          </div>
        ))}
      </div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 bg-black/20 rounded-full text-white hover:bg-black/40 transition-colors"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Story content */}
      <div 
        className="relative h-full cursor-pointer"
        onClick={handleStoryPress}
      >
        <Image
          src={currentStory.image}
          alt={currentStory.title}
          fill
          className="object-cover"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

        {/* Story info */}
        <div className="absolute top-16 left-4 right-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 p-0.5">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                <span className="text-xs font-bold">NK</span>
              </div>
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">{currentStory.title}</h3>
              <p className="text-white/70 text-xs">{formatTime(currentStory.createdAt)}</p>
            </div>
          </div>
        </div>

        {/* Bottom actions */}
        <div className="absolute bottom-8 left-4 right-4 z-10">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Yorum yaz..."
              className="flex-1 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white placeholder-white/60 text-sm outline-none border border-white/30"
            />
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <Heart className="w-6 h-6" />
            </button>
            <button className="p-2 text-white/80 hover:text-white transition-colors">
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation hints */}
        <div className="absolute inset-y-0 left-0 w-1/3 flex items-center justify-start opacity-0 hover:opacity-100 transition-opacity">
          <div className="p-4">
            <ChevronLeft className="w-8 h-8 text-white/50" />
          </div>
        </div>
        <div className="absolute inset-y-0 right-0 w-1/3 flex items-center justify-end opacity-0 hover:opacity-100 transition-opacity">
          <div className="p-4">
            <ChevronRight className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  
  if (minutes < 60) return `${minutes} dk önce`;
  if (minutes < 1440) return `${Math.floor(minutes / 60)} saat önce`;
  return `${Math.floor(minutes / 1440)} gün önce`;
}

// Stories List Component (for homepage)
export function StoriesList() {
  const [showViewer, setShowViewer] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  const handleStoryClick = (index: number) => {
    setCurrentStoryIndex(index);
    setShowViewer(true);
  };

  return (
    <>
      <div className="flex gap-3 overflow-x-auto py-3 px-4 scrollbar-hide -mx-4">
        {/* "Send Story" button */}
        <div className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer">
          <div className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 p-1">
            <div className="w-full h-full rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
          </div>
          <span className="text-xs text-gray-600 dark:text-gray-400">Paylaş</span>
        </div>

        {/* Stories */}
        {MOCK_STORIES.map((story, index) => (
          <div
            key={story.id}
            onClick={() => handleStoryClick(index)}
            className="flex-shrink-0 flex flex-col items-center gap-1 cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-orange-500 to-red-500">
              <div className="w-full h-full rounded-full border-2 border-white dark:border-gray-900 overflow-hidden">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400 truncate w-16 text-center">
              {story.title.length > 10 ? story.title.slice(0, 10) + '...' : story.title}
            </span>
          </div>
        ))}
      </div>

      {/* Story Viewer Modal */}
      <AnimatePresence>
        {showViewer && (
          <StoryViewer
            stories={MOCK_STORIES}
            onClose={() => setShowViewer(false)}
            onStoryClick={(story) => {
              // Navigate to article
              window.location.href = `/${story.newsId}`;
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}
