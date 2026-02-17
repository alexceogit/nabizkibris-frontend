'use client';

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { X, Link as LinkIcon, Check, Twitter, Facebook, Linkedin, Reddit, Mail, MessageCircle } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ShareModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ShareModalContext = createContext<ShareModalContextType | undefined>(undefined);

export function useShareModal() {
  const context = useContext(ShareModalContext);
  if (!context) {
    throw new Error('useShareModal must be used within a ShareModalProvider');
  }
  return context;
}

interface ShareModalProviderProps {
  children: ReactNode;
}

export function ShareModalProvider({ children }: ShareModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <ShareModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      {mounted && createPortal(
        <ShareModal isOpen={isOpen} onClose={closeModal} />,
        document.body
      )}
    </ShareModalContext.Provider>
  );
}

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url?: string;
  title?: string;
  description?: string;
}

function ShareModal({ isOpen, onClose, url, title, description }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [customUrl, setCustomUrl] = useState(url || '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCustomUrl(url || window.location.href);
    }
  }, [url]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const encodedUrl = encodeURIComponent(customUrl);
  const encodedTitle = encodeURIComponent(title || document.title);
  const encodedDesc = encodeURIComponent(description || '');

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      color: 'bg-green-500 hover:bg-green-600',
      text: 'text-white',
    },
    {
      name: 'X (Twitter)',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'bg-sky-500 hover:bg-sky-600',
      text: 'text-white',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      text: 'text-white',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
      text: 'text-white',
    },
    {
      name: 'Reddit',
      icon: Reddit,
      href: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
      color: 'bg-orange-500 hover:bg-orange-600',
      text: 'text-white',
    },
    {
      name: 'E-posta',
      icon: Mail,
      href: `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`,
      color: 'bg-gray-500 hover:bg-gray-600',
      text: 'text-white',
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md mx-4 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
          <h2 className="text-xl font-bold text-text-primary dark:text-white">
            Paylaş
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Share Links */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {shareLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center gap-2 p-4 rounded-xl ${link.color} ${link.text} transition-transform hover:scale-105`}
              >
                <link.icon className="w-6 h-6" />
                <span className="text-xs font-medium">{link.name}</span>
              </a>
            ))}
          </div>

          {/* URL Input */}
          <div className="relative">
            <input
              type="text"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              className="input pr-24 bg-gray-50 dark:bg-gray-900"
              readOnly
            />
            <button
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-3 py-1.5 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-dark transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Kopyalandı
                </>
              ) : (
                <>
                  <LinkIcon className="w-4 h-4" />
                  Kopyala
                </>
              )}
            </button>
          </div>

          {/* QR Code Placeholder */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl text-center">
            <p className="text-sm text-text-secondary dark:text-gray-400 mb-3">
              QR Kod ile Paylaş
            </p>
            <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center border-2 border-gray-200">
              <span className="text-4xl">📱</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-700 text-center">
          <p className="text-xs text-text-muted dark:text-gray-400">
            NabızKıbrıs ile paylaşın
          </p>
        </div>
      </div>
    </div>
  );
}

// Simple trigger button
export function ShareTrigger({ onClick }: { onClick?: () => void }) {
  const { openModal } = useShareModal();
  
  return (
    <button
      onClick={onClick || openModal}
      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 text-text-secondary dark:text-gray-400 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
      aria-label="Paylaş"
    >
      <ShareTriggerIcon className="w-5 h-5" />
    </button>
  );
}

function ShareTriggerIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  );
}
