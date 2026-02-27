'use client';

import { Share2, Twitter, Facebook, Linkedin, Mail, Check } from 'lucide-react';
import { useState } from 'react';
import { shareToSocialMedia, copyToClipboard } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface ShareButtonProps {
  title: string;
  url: string;
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

const platforms = [
  { id: 'twitter', icon: Twitter, label: 'X (Twitter)', color: 'hover:bg-black hover:text-white' },
  { id: 'facebook', icon: Facebook, label: 'Facebook', color: 'hover:bg-blue-600 hover:text-white' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: 'hover:bg-blue-700 hover:text-white' },
  { id: 'whatsapp', icon: Share2, label: 'WhatsApp', color: 'hover:bg-green-500 hover:text-white' },
  { id: 'telegram', icon: Share2, label: 'Telegram', color: 'hover:bg-blue-500 hover:text-white' },
  { id: 'email', icon: Mail, label: 'E-posta', color: 'hover:bg-gray-600 hover:text-white' },
];

export function ShareButton({ title, url, text, size = 'md' }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24,
  };

  const handleShare = async (platform: string) => {
    if (platform === 'copy') {
      const success = await copyToClipboard(url);
      if (success) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
      return;
    }

    if (platform === 'native') {
      await shareToSocialMedia('native', { title, text, url });
      return;
    }

    await shareToSocialMedia(platform, { title, text, url });
    setShowMenu(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setShowMenu(!showMenu)}
        className={`
          ${sizeClasses[size]} rounded-full flex items-center justify-center
          bg-gray-100 text-gray-500 hover:bg-gray-200
          dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-400
          transition-colors duration-200
        `}
        aria-label="Paylaş"
      >
        {copied ? (
          <Check size={iconSizes[size]} className="text-green-500" />
        ) : (
          <Share2 size={iconSizes[size]} />
        )}
      </motion.button>

      <AnimatePresence>
        {showMenu && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 z-50 min-w-[180px]"
          >
            <div className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 mb-1">
              Paylaş
            </div>
            
            {/* Native share (mobile) */}
            {typeof navigator !== 'undefined' && !!navigator.share && (
              <button
                onClick={() => handleShare('native')}
                className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
              >
                <Share2 size={16} />
                <span>Paylaş...</span>
              </button>
            )}

            {platforms.map((platform) => (
              <button
                key={platform.id}
                onClick={() => handleShare(platform.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${platform.color}`}
              >
                <platform.icon size={16} />
                <span>{platform.label}</span>
              </button>
            ))}

            <hr className="my-2 border-gray-200 dark:border-gray-700" />

            <button
              onClick={() => handleShare('copy')}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
            >
              {copied ? <Check size={16} className="text-green-500" /> : <Share2 size={16} />}
              <span>{copied ? 'Kopyalandı!' : 'URL Kopyala'}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}
