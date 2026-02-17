'use client';

import { useState, useEffect } from 'react';
import { Share2, X, Link as LinkIcon, Twitter, Facebook, Mail, Copy, Check } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ShareButtonProps {
  url?: string;
  title?: string;
  description?: string;
  position?: 'bottom-right' | 'bottom-left' | 'fixed';
}

export function ShareButton({
  url,
  title = 'NabızKıbrıs',
  description,
  position = 'bottom-right',
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDesc = encodeURIComponent(description || '');

  const shareLinks = {
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    email: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const positionClasses = {
    'bottom-right': 'fixed bottom-6 right-6',
    'bottom-left': 'fixed bottom-6 left-6',
    'fixed': 'fixed bottom-6 right-6',
  };

  const button = (
    <div className={`z-50 ${positionClasses[position]}`}>
      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 w-72 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold text-text-primary dark:text-white">Paylaş</span>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-3 mb-4">
            <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 p-3 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <span className="text-2xl">💬</span>
              <span className="text-xs">WhatsApp</span>
            </a>
            <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 p-3 bg-sky-50 dark:bg-sky-900/20 text-sky-500 dark:text-sky-400 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900/30 transition-colors">
              <span className="text-2xl">𝕏</span>
              <span className="text-xs">X</span>
            </a>
            <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-1 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
              <span className="text-2xl">f</span>
              <span className="text-xs">Facebook</span>
            </a>
            <a href={shareLinks.email} className="flex flex-col items-center gap-1 p-3 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
              <Mail className="w-5 h-5" />
              <span className="text-xs">E-posta</span>
            </a>
          </div>

          <button onClick={handleCopy} className="w-full flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <p className="font-medium text-text-primary dark:text-white text-sm">
                {copied ? 'Kopyalandı!' : 'Link Kopyala'}
              </p>
              <p className="text-xs text-text-muted dark:text-gray-400 truncate">{shareUrl}</p>
            </div>
          </button>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-white shadow-lg hover:bg-primary-dark flex items-center justify-center transition-all hover:scale-105"
        aria-label="Paylaş"
      >
        <Share2 className="w-6 h-6" />
      </button>
    </div>
  );

  if (!mounted) return null;

  return createPortal(button, document.body);
}

// Inline share bar for articles
export function ShareBar({
  url,
  title,
  description,
}: {
  url?: string;
  title?: string;
  description?: string;
}) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title || '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="flex items-center gap-2 py-4 border-t border-b border-gray-100 dark:border-gray-700 my-6">
      <span className="text-sm font-medium text-text-secondary dark:text-gray-400 mr-2">
        Paylaş:
      </span>
      
      <a
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:bg-green-600 transition-colors"
        title="WhatsApp"
      >
        <span className="text-lg">💬</span>
      </a>
      
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-600 transition-colors"
        title="X (Twitter)"
      >
        <span className="text-lg">𝕏</span>
      </a>
      
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-colors"
        title="Facebook"
      >
        <span className="text-lg font-bold">f</span>
      </a>
      
      <button
        onClick={handleCopy}
        className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        title="Link Kopyala"
      >
        {copied ? <Check className="w-5 h-5 text-green-500" /> : <LinkIcon className="w-5 h-5" />}
      </button>
    </div>
  );
}
