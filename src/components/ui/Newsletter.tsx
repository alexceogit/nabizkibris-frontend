'use client';

import { useState } from 'react';
import { Mail, Check, AlertCircle } from 'lucide-react';

interface NewsletterProps {
  variant?: 'default' | 'footer' | 'sidebar';
  title?: string;
  description?: string;
}

export function NewsletterSignup({ 
  variant = 'default',
  title = 'Bültene Abone Olun',
  description = 'En son haberlerden anında haberdar olmak için abone olun.'
}: NewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate API call
    setTimeout(() => {
      // In production, this would be a real API call
      if (email.includes('@')) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    }, 1500);
  };

  const isFooter = variant === 'footer';
  const isSidebar = variant === 'sidebar';

  if (isSidebar) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary dark:text-white">
              {title}
            </h3>
          </div>
        </div>
        
        <p className="text-sm text-text-secondary dark:text-gray-400 mb-4">
          {description}
        </p>

        {status === 'success' ? (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg text-sm flex items-center gap-2">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>Abone oldunuz! Teşekkürler.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="input w-full"
              required
            />
            <button 
              type="submit" 
              className="btn-primary w-full"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Abone Ol'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Geçerli bir e-posta adresi girin.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm ${
      isFooter ? 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700' : ''
    }`}>
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
          <Mail className="w-8 h-8" />
        </div>
        
        <h2 className="text-2xl font-bold text-text-primary dark:text-white mb-3">
          {title}
        </h2>
        
        <p className="text-text-secondary dark:text-gray-400 mb-6 max-w-lg mx-auto">
          {description}
        </p>

        {status === 'success' ? (
          <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 p-4 rounded-lg text-sm flex items-center justify-center gap-2 max-w-md mx-auto">
            <Check className="w-5 h-5 flex-shrink-0" />
            <span>Abone oldunuz! En son haberlerden haberdar olacaksınız.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-posta adresiniz"
              className="input flex-1"
              required
            />
            <button 
              type="submit" 
              className="btn-primary whitespace-nowrap"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Gönderiliyor...' : 'Abone Ol'}
            </button>
          </form>
        )}

        {status === 'error' && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center justify-center gap-1">
            <AlertCircle className="w-4 h-4" />
            Geçerli bir e-posta adresi girin.
          </p>
        )}

        <p className="mt-4 text-xs text-text-muted dark:text-gray-500">
          Spam göndermiyoruz. İstediğiniz zaman abonelikten çıkabilirsiniz.
        </p>
      </div>
    </div>
  );
}
